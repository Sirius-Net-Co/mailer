import { prisma } from "@/lib/prisma";
import { convert } from "html-to-text";
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
        { error: "Invalid registration request" },
        { status: 400 },
      );
    }

    await prisma.pendingRegistration.delete({ where: { id } });

    const body = `
      <h2 style="font-size: 1.25rem; font-weight: bold;">Registration Request Declined</h2>
      <p>Dear ${pendingRegistration.name},</p>
      <p>
        We're sorry, but your registration request has been declined. If you believe this is an error, please contact our support team.
      </p>
      <p>
        <a 
          href="mailto:${process.env.SMTP_USER}" 
          style="
            background-color: #38a169; 
            color: white; 
            padding: 0.5rem 1rem; 
            text-decoration: none; 
            display: inline-block; 
            border-radius: 5px; 
            font-weight: bold;
            "
          >
          Contact Support
        </a>
      </p>
    `;

    const text = convert(body);
    const html = await render(EmailTemplate({ body }));

    await sendEmail({
      to: pendingRegistration.email,
      subject: "Your Registration Request Has Been Declined",
      text,
      html,
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
