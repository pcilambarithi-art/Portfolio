import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const resumePath = path.join(process.cwd(), "public", "resume", "resume.pdf");
    const exists = fs.existsSync(resumePath);

    return NextResponse.json({
      exists,
      url: exists ? "/resume/resume.pdf" : null,
      fileName: "Ilambarithi_N_Resume.pdf",
    });
  } catch (error) {
    return NextResponse.json({ exists: false, url: null });
  }
}
