export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Hidden spam field
}

export interface EmailSendResult {
  success: boolean;
  message: string;
  messageId?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<EmailSendResult> {
  // 1. Spam protection check: if honeypot is populated, silently reject bot
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return {
      success: true, // Do not alert bots
      message: "Message processed successfully.",
    };
  }

  // 2. Server-side validation
  if (!data.name || data.name.trim().length < 2) {
    return { success: false, message: "Please provide a valid name (at least 2 characters)." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return { success: false, message: "Please provide a valid email address." };
  }
  if (!data.subject || data.subject.trim().length < 2) {
    return { success: false, message: "Please provide a subject." };
  }
  if (!data.message || data.message.trim().length < 10) {
    return { success: false, message: "Message must be at least 10 characters." };
  }
  if (data.message.length > 3000) {
    return { success: false, message: "Message exceeds the maximum limit of 3000 characters." };
  }

  const provider = (process.env.EMAIL_PROVIDER || "console").toLowerCase();
  const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "ilambarithi2006@gmail.com";

  // Provider: Resend
  if (provider === "resend") {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.warn("[Email Service] Resend selected but RESEND_API_KEY is not set. Falling back to secure log.");
      return logMessageFallback(data, recipient);
    }

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [recipient],
          reply_to: data.email,
          subject: `[Portfolio Inquiry] ${data.subject} - from ${data.name}`,
          text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #111;">
              <h2 style="color: #8B5CF6;">New Portfolio Contact Message</h2>
              <p><strong>From:</strong> ${escapeHtml(data.name)} (&lt;${escapeHtml(data.email)}&gt;)</p>
              <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
              <hr style="border: 1px solid #eee; margin: 16px 0;" />
              <div style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</div>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Resend API failed (${res.status}): ${errorData}`);
      }

      const resData = await res.json();
      return {
        success: true,
        message: "Thank you! Your message has been delivered to Ilambarithi.",
        messageId: resData.id,
      };
    } catch (err: any) {
      console.error("[Email Send Error]", err);
      return {
        success: false,
        message: "Unable to dispatch email at this moment. Please email directly at ilambarithi2006@gmail.com.",
      };
    }
  }

  // Provider: Console / Local fallback mode
  return logMessageFallback(data, recipient);
}

function logMessageFallback(data: ContactFormData, recipient: string): EmailSendResult {
  console.log("==========================================");
  console.log(`[CONTACT FORM MESSAGE RECEIVED FOR ${recipient}]`);
  console.log(`From: ${data.name} <${data.email}>`);
  console.log(`Subject: ${data.subject}`);
  console.log(`Message: ${data.message}`);
  console.log("==========================================");

  return {
    success: true,
    message: "Thank you! Your message has been received. Ilambarithi will respond shortly.",
    messageId: `local-${Date.now()}`,
  };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
