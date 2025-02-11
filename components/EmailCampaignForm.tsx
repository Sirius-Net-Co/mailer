"use client";

import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useState, useRef } from "react";
import { Loader2, Upload, Paperclip, Trash2 } from "lucide-react";
import { parseExcelFile } from "@/utils/excelParser";
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
    <div className="flex h-40 items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-[#9669A4]" />
      <span className="ml-2 text-[#9669A4]">Loading...</span>
    </div>
  ),
});

export function EmailCampaignForm() {
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) {
        throw new Error("No file selected");
      }
      setFile(selectedFile);
      const parsedEmails = await parseExcelFile(selectedFile);
      setEmails(parsedEmails);
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing file. Please try again.");
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setAttachments((prevAttachments) => [...prevAttachments, ...selectedFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const formData = new FormData();
      formData.append("body", body);
      formData.append("subject", subject);
      emails.forEach((email) => formData.append("emails", email));
      attachments.forEach((attachment) => formData.append("attachments", attachment));

      const response = await fetch("/api/send-emails", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Error sending emails. Please try again.");
    } finally {
      setSending(false);
    }
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
    <Card className="mx-auto w-full max-w-3xl rounded-none bg-[#ECE190]/10">
      <CardHeader className="bg-[#9669A4] text-white">
        <CardTitle className="text-2xl font-semibold">
          Sirius.Net.Co Email Campaign Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject" className="font-medium text-[#22264B]">
              Email Subject
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter email subject"
              className="border-0 bg-white/50 placeholder:text-[#22264B]/50 focus:ring-2 focus:ring-[#9669A4]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body" className="font-medium text-[#22264B]">
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
            <Label htmlFor="file" className="font-medium text-[#22264B]">
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
                className="flex w-full cursor-pointer items-center justify-center space-x-2 border-2 border-dashed border-[#9669A4]/30 bg-white/50 p-4 transition-colors hover:border-[#9669A4]/50 hover:bg-white/60"
              >
                <Upload className="h-5 w-5 text-[#9669A4]" />
                <span className="text-[#22264B]">
                  {file ? file.name : "Click to upload Excel file"}
                </span>
              </div>
            </div>

            {emails.length > 0 && (
              <div className="flex items-center space-x-2 text-sm text-[#9669A4]">
                <div className="h-2 w-2 rounded-full bg-[#9669A4]" />
                <p>
                  {emails.length} email{emails.length === 1 ? "" : "s"} found in
                  file
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments" className="font-medium text-[#22264B]">
              Attachments (Optional)
            </Label>
            <div className="relative">
              <input
                type="file"
                id="attachments"
                multiple
                onChange={handleAttachmentChange}
                className="hidden"
                ref={attachmentInputRef}
              />
              <div
                onClick={() => attachmentInputRef.current?.click()}
                className="flex w-full cursor-pointer items-center justify-center space-x-2 border-2 border-dashed border-[#9669A4]/30 bg-white/50 p-4 transition-colors hover:border-[#9669A4]/50 hover:bg-white/60"
              >
                <Paperclip className="h-5 w-5 text-[#9669A4]" />
                <span className="text-[#22264B]">Click to add attachments</span>
              </div>
            </div>

            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/50 p-2"
                  >
                    <span className="text-sm text-[#22264B]">
                      {attachment.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-[#D7C5AE]/20 p-6">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={sending || !file || emails.length === 0}
          className="w-full bg-[#9669A4] text-white transition-colors hover:bg-[#9669A4]/80"
        >
          {sending ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
