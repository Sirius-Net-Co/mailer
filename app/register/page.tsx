"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2, Mail, Home } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success(data.message || "Account created successfully!");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-[#9669A4] p-12 text-white lg:flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="h-10 w-10" />
            <span className="text-2xl font-bold">Sirius.Net.Co</span>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Join Our Community</h1>
          <p className="text-xl text-white/80">
            Get started with the most powerful email campaign management tool.
            Create engaging campaigns and reach your audience effectively.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-white" />
              <p>Free trial for 14 days</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-white" />
              <p>No credit card required</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-white" />
              <p>Cancel anytime</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/60">
          © 2025 Sirius.Net.Co. All rights reserved.
        </div>
      </div>

      <div className="flex w-full flex-col justify-center bg-gradient-to-br from-[#ECE190]/20 via-[#D7C5AE]/20 to-[#9669A4]/20 px-4 lg:w-1/2">
        <div className="lg:hidden">
          <Link
            href="/"
            className="absolute right-4 top-4 flex items-center space-x-2 rounded-lg bg-white/80 px-4 py-2 text-sm text-[#9669A4] transition-colors hover:bg-white"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </div>

        <Card className="mx-auto w-full max-w-md border-0 bg-white/80 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-[#22264B]">
              Create Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#22264B]">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="border-0 bg-white placeholder:text-[#22264B]/50 focus:ring-2 focus:ring-[#9669A4]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#22264B]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="border-0 bg-white placeholder:text-[#22264B]/50 focus:ring-2 focus:ring-[#9669A4]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#22264B]">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Create a password"
                          className="border-0 bg-white placeholder:text-[#22264B]/50 focus:ring-2 focus:ring-[#9669A4]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[#22264B]">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm your password"
                          className="border-0 bg-white placeholder:text-[#22264B]/50 focus:ring-2 focus:ring-[#9669A4]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#9669A4] text-white transition-colors hover:bg-[#9669A4]/80"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center text-sm text-[#22264B]/70">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-[#9669A4] hover:underline"
                  >
                    Login here
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
