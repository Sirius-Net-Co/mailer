"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, ArrowRight, Mail } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function RegisterPage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword = values.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      setShowDialog(true);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    router.push("/login");
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-md border-0 bg-white/80 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-[#22264B]">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

      <AlertDialog open={showDialog} onOpenChange={handleDialogClose}>
        <AlertDialogContent className="bg-white p-6 shadow-xl">
          <AlertDialogHeader className="gap-4">
            <div className="mx-auto rounded-full bg-green-100 p-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center text-xl font-semibold text-[#22264B]">
              Registration Successful
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center gap-4 text-base text-[#22264B]/70">
              <span className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#9669A4]" />
                <span>Request sent to admin for approval</span>
              </span>
              Your request to join Sirius.Net.Co Email Campaign Manager is
              pending. You will receive an email notification once your account
              is activated.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <AlertDialogAction
              className="w-full bg-[#9669A4] px-8 py-3 text-white transition-all hover:bg-[#9669A4]/90 hover:shadow-md"
              onClick={handleDialogClose}
            >
              <span className="flex items-center justify-center gap-2">
                Continue to Login
                <ArrowRight className="h-4 w-4" />
              </span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
