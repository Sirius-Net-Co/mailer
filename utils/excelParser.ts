import * as XLSX from "xlsx";

export async function parseExcelFile(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (!e.target?.result) {
          throw new Error("File reading resulted in an empty buffer");
        }

        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        if (workbook.SheetNames.length === 0) {
          throw new Error("No sheets found in the uploaded file");
        }

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        if (!worksheet) {
          throw new Error(`Worksheet "${sheetName}" is undefined`);
        }

        const jsonData: unknown[][] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emails = jsonData
          .flat()
          .filter((value): value is string => typeof value === "string")
          .map((email) => email.trim())
          .filter((email) => emailRegex.test(email));

        if (emails.length === 0) {
          throw new Error("No valid emails found in the file");
        }

        resolve(emails);
      } catch (error) {
        reject(
          new Error(
            `Error parsing Excel file: ${error instanceof Error ? error.message : String(error)}`,
          ),
        );
      }
    };

    reader.onerror = (error) => reject(new Error(`FileReader error: ${error}`));
    reader.readAsArrayBuffer(file);
  });
}
