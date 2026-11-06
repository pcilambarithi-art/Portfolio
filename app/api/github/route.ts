import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/lib/github";

export async function GET() {
  try {
    const data = await fetchGitHubData(process.env.GITHUB_USERNAME || "pcilambarithi-art");
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[API GitHub Error]", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub statistics", isLive: false },
      { status: 500 }
    );
  }
}
