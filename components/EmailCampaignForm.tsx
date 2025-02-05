"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { Loader2, Upload } from "lucide-react";
import { parseExcelFile } from "@/utils/excelParser";
import { sendEmails } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-40">
      <Loader2 className="animate-spin w-6 h-6 text-[#9669A4]" />
      <span className="text-[#9669A4] ml-2">Loading...</span>
    </div>
  ),
});

export function EmailCampaignForm() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const parsedEmails = await parseExcelFile(selectedFile);
      setEmails(parsedEmails);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const result = await sendEmails({ subject, body, emails });
      setResult(result);
    } catch (error) {
      console.error("Error sending emails:", error);
      setResult("Error sending emails. Please try again.");
    }
    setSending(false);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#ECE190]/10">
      <CardHeader className="bg-[#9669A4] text-white">
        <CardTitle className="text-2xl font-semibold">
          Email Campaign Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-[#22264B] font-medium">
              Email Subject
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter email subject"
              className="bg-white/50 border-0 focus:ring-2 focus:ring-[#9669A4] placeholder:text-[#22264B]/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body" className="text-[#22264B] font-medium">
              Email Body
            </Label>
            <div className="bg-white/50">
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                modules={modules}
                formats={formats}
                placeholder="Enter email body"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file" className="text-[#22264B] font-medium">
              Upload Excel File
            </Label>
            <div className="relative">
              <input
                type="file"
                id="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                required
                className="hidden"
                ref={fileInputRef}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-white/50 hover:bg-white/60 transition-colors cursor-pointer p-4 flex items-center justify-center space-x-2 border-2 border-dashed border-[#9669A4]/30 hover:border-[#9669A4]/50"
              >
                <Upload className="w-5 h-5 text-[#9669A4]" />
                <span className="text-[#22264B]">
                  {file ? file.name : "Click to upload Excel file"}
                </span>
              </div>
            </div>
            {emails.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-[#9669A4]">
                <div className="w-2 h-2 bg-[#9669A4] rounded-full" />
                <p>
                  {emails.length} email{emails.length === 1 ? "" : "s"} found in
                  file
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 p-4 bg-[#D7C5AE]/30 text-[#22264B]">
              {result}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="bg-[#D7C5AE]/20 p-6">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={sending || !file || emails.length === 0}
          className="w-full bg-[#9669A4] hover:bg-[#9669A4]/80 text-white transition-colors"
        >
          {sending ? (
            <span className="flex items-center">
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Sending...
            </span>
          ) : (
            "Send Emails"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default EmailCampaignForm;
