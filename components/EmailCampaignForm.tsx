import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, Paperclip, Trash2 } from "lucide-react";
import { parseExcelFile } from "@/utils/excelParser";
import { sendEmailSchema, SendEmailSchemaType } from "@/lib/schema";
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

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="flex h-40 items-center justify-center">
      <Loader2 className="size-6 animate-spin text-[#9669A4]" />
      <span className="ml-2 text-[#9669A4]">Loading...</span>
    </div>
  ),
});

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

export function EmailCampaignForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<SendEmailSchemaType>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      body: "",
      subject: "",
      attachments: [],
      emails: [],
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        const parsedEmails = await parseExcelFile(selectedFile);
        form.setValue("emails", parsedEmails);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing file. Please try again.");
    }
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const currentAttachments = form.getValues("attachments");
    form.setValue("attachments", [...currentAttachments, ...selectedFiles]);
  };

  const removeAttachment = (index: number) => {
    const currentAttachments = form.getValues("attachments");
    form.setValue(
      "attachments",
      currentAttachments.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (values: SendEmailSchemaType) => {
    try {
      const formData = new FormData();
      formData.append("body", values.body);
      formData.append("subject", values.subject);
      values.emails.forEach((email) => formData.append("emails", email));
      values.attachments.forEach((attachment) => formData.append("attachments", attachment));

      const response = await fetch("/api/send-emails", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      form.reset();
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error(
        error instanceof Error ? error.message : "Error sending emails",
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-3xl rounded-none bg-[#ECE190]/10">
      <CardHeader className="bg-[#9669A4] text-white">
        <CardTitle className="text-2xl font-semibold">
          Sirius.Net.Co Email Campaign Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[#22264B]">
                    Email Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter email subject"
                      className="border-0 bg-white/50 placeholder:text-[#22264B]/50 focus:ring-2 focus:ring-[#9669A4]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[#22264B]">
                    Email Body
                  </FormLabel>
                  <FormControl>
                    <div className="bg-white/50">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Enter email body"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[#22264B]">
                    Upload Excel File
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex w-full cursor-pointer items-center justify-center space-x-2 border-2 border-dashed border-[#9669A4]/30 bg-white/50 p-4 transition-colors hover:border-[#9669A4]/50 hover:bg-white/60"
                      >
                        <Upload className="size-5 text-[#9669A4]" />
                        <span className="text-[#22264B]">
                          Click to upload Excel file
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  {field.value.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-[#9669A4]">
                      <div className="size-2 rounded-full bg-[#9669A4]" />
                      <p>
                        {field.value.length} email
                        {field.value.length === 1 ? "" : "s"} found in file
                      </p>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[#22264B]">
                    Attachments (Optional)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        onChange={handleAttachmentChange}
                        className="hidden"
                        ref={attachmentInputRef}
                      />
                      <div
                        onClick={() => attachmentInputRef.current?.click()}
                        className="flex w-full cursor-pointer items-center justify-center space-x-2 border-2 border-dashed border-[#9669A4]/30 bg-white/50 p-4 transition-colors hover:border-[#9669A4]/50 hover:bg-white/60"
                      >
                        <Paperclip className="size-5 text-[#9669A4]" />
                        <span className="text-[#22264B]">
                          Click to add attachments
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  {field.value.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {field.value.map((attachment, index) => (
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
                            <Trash2 className="mr-1 size-4" />
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full cursor-pointer bg-[#9669A4] text-white transition-colors hover:bg-[#9669A4]/80"
            >
              {form.formState.isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Emails"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
