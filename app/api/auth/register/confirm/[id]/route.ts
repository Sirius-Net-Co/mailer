import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/EmailTemplate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const pendingRegistration = await prisma.pendingRegistration.findUnique({
      where: { id },
    });

    if (!pendingRegistration) {
      return NextResponse.json(
        { message: "Invalid registration request" },
        { status: 400 },
      );
    }

    await prisma.user.create({
      data: {
        name: pendingRegistration.name,
        email: pendingRegistration.email,
        password: pendingRegistration.password,
      },
    });

    await prisma.pendingRegistration.delete({ where: { id } });

    const body = `
      <h2 className="text-2xl font-bold">Welcome to Our Platform!</h2>
      <p>Dear ${pendingRegistration.name},</p>
      <p>
        Your registration has been approved. You can now log in to your account using your email and password.
      </p>
      <p>
        <a 
          href="${process.env.NEXT_PUBLIC_APP_URL}/login" 
          className="bg-green-500 text-white py-2 px-4 no-underline inline-block"
        >
          Login Now
        </a>
      </p>
    `;

    const html = await render(EmailTemplate({ body }));

    await sendEmail({
      to: pendingRegistration.email,
      subject: "Your Registration Has Been Approved",
      html,
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
