import { EmailCampaignForm } from "@/components/EmailCampaignForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#ECE190]/20 via-[#D7C5AE]/20 to-[#9669A4]/20">
      <div className="container mx-auto p-4">
        <EmailCampaignForm />
      </div>
    </main>
  );
}
