"use client";

import Link from "next/link";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2, Mail, Home } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/lib/schema";
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

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully");
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-[#9669A4] p-12 text-white lg:flex">
        <div className="flex items-center space-x-3">
          <Mail className="h-10 w-10" />
          <span className="text-2xl font-bold">Sirius.Net.Co</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Email Campaign Manager</h1>
          <p className="text-xl text-white/80">
            Streamline your email campaigns with our powerful management tool.
            Create, manage, and track your email campaigns all in one place.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-white" />
              <p>Bulk email campaigns</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-white" />
              <p>Excel file integration</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-1 w-1 rounded-full bg-white" />
              <p>Rich text editor support</p>
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
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                          placeholder="Enter your password"
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
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
                <div className="text-center text-sm text-[#22264B]/70">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="font-medium text-[#9669A4] hover:underline"
                  >
                    Register here
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
