import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, ContactFormData } from "@/lib/email";

// Rate limiter for contact form submissions: max 5 per 5 minutes per IP
const contactSubmissionLog = new Map<string, number[]>();
const SUBMISSION_WINDOW_MS = 5 * 60 * 1000;
const MAX_SUBMISSIONS = 5;

function isSubmissionRateLimited(ip: string): boolean {
  const now = Date.now();
  const logs = contactSubmissionLog.get(ip) || [];
  const valid = logs.filter((t) => now - t < SUBMISSION_WINDOW_MS);

  if (valid.length >= MAX_SUBMISSIONS) {
    return true;
  }

  valid.push(now);
  contactSubmissionLog.set(ip, valid);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (isSubmissionRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "You have sent several messages recently. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as ContactFormData;
    const result = await sendContactEmail(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: result.message });
  } catch (error: any) {
    console.error("[API Contact Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error handling contact request. Please contact directly via email.",
      },
      { status: 500 }
    );
  }
}
