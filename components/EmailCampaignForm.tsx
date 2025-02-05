"use client";

import { useState } from "react";
import { parseExcelFile } from "@/utils/excelParser";
import { sendEmails } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EmailCampaignForm() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);

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
      setResult("Error sending emails. Please try again.");
    }
    setSending(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Email Campaign Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter email subject"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Email Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={6}
              placeholder="Enter email body"
              className="whitespace-pre-wrap"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Upload Excel File</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              required
            />
            {emails.length > 0 && (
              <p className="text-sm text-gray-500">
                {emails.length} email(s) found in the file
              </p>
            )}
          </div>

          {result && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
              {result}
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={sending || !file || emails.length === 0}
        >
          {sending ? "Sending..." : "Send Emails"}
        </Button>
      </CardFooter>
    </Card>
  );
}
