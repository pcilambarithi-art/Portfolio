import { NextRequest, NextResponse } from "next/server";
import { processAIChatRequest, ChatMessage, AIChatMode } from "@/lib/ai/provider";

// Basic in-memory rate limiter per IP
const ipRequestTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  ipRequestTimestamps.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before sending another message." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages, mode = "portfolio" } = body as {
      messages: ChatMessage[];
      mode: AIChatMode;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages payload. An array of messages is required." },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== "string") {
      return NextResponse.json(
        { error: "Invalid message format." },
        { status: 400 }
      );
    }

    if (lastMessage.content.trim().length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty." },
        { status: 400 }
      );
    }

    if (lastMessage.content.length > 1000) {
      return NextResponse.json(
        { error: "Message length exceeds the 1,000 character limit." },
        { status: 400 }
      );
    }

    const validMode: AIChatMode = mode === "career" ? "career" : "portfolio";
    const response = await processAIChatRequest(messages, validMode);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error("[API Chat Handler Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while communicating with the AI service." },
      { status: 500 }
    );
  }
}
