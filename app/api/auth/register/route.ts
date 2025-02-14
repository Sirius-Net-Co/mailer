import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { convert } from "html-to-text";
import { sendEmail } from "@/lib/email";
import { registerSchema } from "@/lib/schema"
import { render } from "@react-email/components";
import { NextRequest, NextResponse } from "next/server";
import { EmailTemplate } from "@/components/EmailTemplate";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();

    const { name, email, password } = registerSchema.parse(requestData);

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
      <h2 style="font-size: 1.5rem; font-weight: bold;">New User Registration Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>Please review this registration request and take appropriate action:</p>
      <p>
        <a 
          href="${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register/confirm/${pendingRegistration.id}" 
          style="
            background-color: #38a169; 
            color: white; 
            padding: 0.5rem 1rem; 
            text-decoration: none; 
            display: inline-block; 
            margin-right: 0.5rem; 
            border-radius: 5px; 
            font-weight: bold;
          "
        >
          Confirm Registration
        </a>
        <a 
          href="${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register/delete/${pendingRegistration.id}" 
          style="
            background-color: #e53e3e; 
            color: white; 
            padding: 0.5rem 1rem; 
            text-decoration: none; 
            display: inline-block; 
            margin-left: 0.5rem; 
            border-radius: 5px; 
            font-weight: bold;
          "
        >
          Delete Request
        </a>
      </p>
    `;

    const text = convert(body);
    const html = await render(EmailTemplate({ body }));

    await sendEmail({
      to: process.env.SMTP_USER!,
      subject: "New User Registration Request",
      text,
      html,
    });

    return NextResponse.json(
      { message: "Registration request sent for approval" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 },
    );
  }
}
