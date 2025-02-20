import Link from "next/link";
import { Home, Mail } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-[#9669A4] p-12 text-white lg:flex">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="size-10" />
            <span className="text-2xl font-bold">Sirius.Net.Co</span>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
          >
            <Home className="size-4" />
            <span>Home</span>
          </Link>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Email Campaign Manager</h1>
          <p className="text-xl text-white/80">
            Manage and track company email campaigns with ease. Designed for
            Sirius.Net.Co, this tool helps streamline internal and external
            email communications efficiently.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="size-1 rounded-full bg-white" />
              <p>Bulk email campaigns</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="size-1 rounded-full bg-white" />
              <p>Excel file integration</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="size-1 rounded-full bg-white" />
              <p>Rich text editor support</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} Sirius.Net.Co. All rights reserved.
        </div>
      </div>

      <div className="flex w-full flex-col justify-center bg-gradient-to-br from-[#ECE190]/20 via-[#D7C5AE]/20 to-[#9669A4]/20 px-4 lg:w-1/2">
        <div className="lg:hidden">
          <Link
            href="/"
            className="absolute top-4 right-4 flex items-center space-x-2 rounded-lg bg-white/80 px-4 py-2 text-sm text-[#9669A4] transition-colors hover:bg-white"
          >
            <Home className="size-4" />
            <span>Home</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
