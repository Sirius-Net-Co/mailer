import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[0-9]/, { message: "Password must contain at least 1 number." })
    .regex(/[a-z]/, {
      message: "Password must contain at least 1 lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least 1 uppercase letter.",
    }),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("Please enter a valid email"),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[0-9]/, { message: "Password must contain at least 1 number." })
      .regex(/[a-z]/, {
        message: "Password must contain at least 1 lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least 1 uppercase letter.",
      }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const sendEmailSchema = z.object({
  body: z.string().trim().min(1, "Body is required"),
  subject: z.string().trim().min(1, "Subject is required"),
  emails: z
    .array(z.string().trim().email("Invalid email address"))
    .min(1, "At least one email is required"),
  attachments: z.array(z.instanceof(File)).nullable(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type SendEmailSchemaType = z.infer<typeof sendEmailSchema>;
