import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), "public", "pdfs", `${params.id}.pdf`);
    const fileBuffer = await fs.readFile(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${params.id}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "PDF not found" },
      { status: 404 }
    );
  }
}