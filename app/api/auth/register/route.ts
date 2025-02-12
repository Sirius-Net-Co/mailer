import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

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

    const tempUser = await prisma.tempUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const adminEmail = process.env.SMTP_USER!;
    const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/register/confirm/${tempUser.id}`;
    const deleteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/register/delete/${tempUser.id}`;

    await sendEmail({
      to: adminEmail,
      subject: "New User Registration Request",
      html: `
        <h1>New User Registration Request</h1>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>
          <a href="${confirmUrl}">Confirm Registration</a>
          <a href="${deleteUrl}">Delete Request</a>
        </p>
      `,
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
