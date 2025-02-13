import nodemailer from "nodemailer";
import { z } from "zod";
import { convert } from "html-to-text";
import { render } from "@react-email/components";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { sendEmailSchema } from "@/lib/schema";
import { EmailTemplate } from "@/components/EmailTemplate";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const formData = await request.formData();

    const {
      body,
      subject,
      emails,
      attachments: parsedAttachments,
    } = sendEmailSchema.parse(Object.fromEntries(formData));

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const text = convert(body);
    const html = await render(EmailTemplate({ body }));
    const attachments = await Promise.all(
      (parsedAttachments || []).map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      })),
    );

    const results = await Promise.all(
      emails.map(async (email) => {
        try {
          await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: email,
            subject,
            text,
            html,
            attachments,
          });
          return { email, status: "success" };
        } catch (error) {
          console.error(`Error sending email to ${email}:`, error);
          return { email, status: "error" };
        }
      }),
    );

    const { successful, failed } = results.reduce(
      (acc, { status }) => {
        if (status === "success") {
          acc.successful++;
        } else if (status === "error") {
          acc.failed++;
        }
        return acc;
      },
      { successful: 0, failed: 0 },
    );

    return NextResponse.json({
      message: `Emails sent successfully: ${successful}, Failed: ${failed}`,
    });
  } catch (error) {
    console.error("Error sending emails:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Error sending emails. Please try again." },
      { status: 500 },
    );
  }
}
