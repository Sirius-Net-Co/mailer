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
        { message: "Invalid registration request" },
        { status: 400 },
      );
    }

    await prisma.user.create({
      data: {
        name: tempUser.name,
        email: tempUser.email,
        password: tempUser.password,
      },
    });

    await prisma.tempUser.delete({ where: { id } });

    await sendEmail({
      to: tempUser.email,
      subject: "Your Registration Has Been Approved",
      html: `
        <h1>Welcome to Our Platform</h1>
        <p>Your registration has been approved. You can now log in to your account.</p>
      `,
    });

    return NextResponse.json(
      { message: "Registration approved" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Confirmation error:", error);

    return NextResponse.json(
      { error: "An error occurred during confirmation" },
      { status: 500 },
    );
  }
}
