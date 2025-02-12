import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const tempUser = await prisma.tempUser.findUnique({ where: { id } });
    if (!tempUser) {
      return NextResponse.json(
        { error: "Invalid registration request" },
        { status: 400 },
      );
    }

    await prisma.tempUser.delete({ where: { id } });

    await sendEmail({
      to: tempUser.email,
      subject: "Your Registration Request Has Been Declined",
      html: `
        <h1>Registration Request Declined</h1>
        <p>We're sorry, but your registration request has been declined. If you believe this is an error, please contact our support team.</p>
      `,
    });

    return NextResponse.json(
      { message: "Registration request deleted" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Deletion error:", error);
    
    return NextResponse.json(
      { error: "An error occurred during deletion" },
      { status: 500 },
    );
  }
}
