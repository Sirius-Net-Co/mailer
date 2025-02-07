"use server";

import nodemailer from "nodemailer";
import { convert } from "html-to-text";
import { render } from "@react-email/components";
import { EmailTemplate } from "@/components/EmailTemplate";

export async function sendEmails(formData: FormData) {
  try {
    const body = formData.get("body") as string;
    const subject = formData.get("subject") as string;
    const emails = formData.getAll("emails") as string[];
    const attachmentFiles = formData.getAll("attachments") as File[];

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const html = await render(EmailTemplate({ body }));
    const text = convert(body, { wordwrap: 130 });
    const attachments = await Promise.all(
      attachmentFiles.map(async (file) => ({
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
            html,
            text,
            attachments,
          });
          return { email, status: "success" };
        } catch (error) {
          console.error(`Error sending email to ${email}:`, error);
          return { email, status: "error" };
        }
      }),
    );

    const successful = results.filter((r) => r.status === "success").length;
    const failed = results.filter((r) => r.status === "error").length;

    return `Emails sent successfully: ${successful}, Failed: ${failed}`;
  } catch (error) {
    console.error("Error sending emails:", error);
    return "Error sending emails. Please try again.";
  }
}
