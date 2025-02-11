"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
    <Card className="mx-auto w-full max-w-md border-0 bg-white/80 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold text-[#22264B]">
          Welcome Back
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
  );
}
