import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/EmailTemplate";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pendingRegistration = await prisma.pendingRegistration.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const body = `
      <h2 className="text-2xl font-bold">New User Registration Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>Please review this registration request and take appropriate action:</p>
      <p>
        <a 
          href="${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register/confirm/${pendingRegistration.id}" 
          className="bg-green-500 text-white px-4 py-2 no-underline inline-block mr-2"
        >
          Confirm Registration
        </a>
        <a 
          href="${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register/delete/${pendingRegistration.id}" 
          className="bg-red-500 text-white px-4 py-2 no-underline inline-block"
        >
          Delete Request
        </a>
      </p>
    `;

    const html = await render(EmailTemplate({ body }));

    await sendEmail({
      to: process.env.SMTP_USER!,
      subject: "New User Registration Request",
      html,
    });

    return NextResponse.json(
      { message: "Registration request sent for approval" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 },
    );
  }
}
