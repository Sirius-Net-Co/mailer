"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailCampaignForm } from "@/components/EmailCampaignForm";

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);

  // if (status === "loading" || !data) {
  //   return (
  //     <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ECE190]/20 via-[#D7C5AE]/20 to-[#9669A4]/20">
  //       <Loader2 className="h-12 w-12 animate-spin text-[#9669A4]" />
  //     </main>
  //   );
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#ECE190]/20 via-[#D7C5AE]/20 to-[#9669A4]/20">
      <div className="container mx-auto p-4">
        <div className="fixed right-4 top-4 mb-4 flex justify-end">
          <Button onClick={() => signOut()} variant="outline">
            Logout
          </Button>
        </div>
        <EmailCampaignForm />
      </div>
    </main>
  );
}
