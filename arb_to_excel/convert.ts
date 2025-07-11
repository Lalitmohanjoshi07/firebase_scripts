import * as fs from 'fs';
import * as path from 'path';
import ExcelJS from 'exceljs';

const arbFilePath = path.resolve('./arb_to_excel/arb/', 'app_en.arb'); // Update if needed
const outputExcelPath = path.resolve('./arb_to_excel/result/', 'translation_strings.xlsx');

interface ArbEntry {
  key: string;
  value: string;
  description?: string;
}

function parseArbFile(filePath: string): ArbEntry[] {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(raw);
  const entries: ArbEntry[] = [];

  for (const key in json) {
    if (!key.startsWith('@')) {
      const value = json[key];
      const description = json[`@${key}`]?.description || '';
      entries.push({ key, value, description });
    }
  }

  return entries;
}

async function exportToExcel(entries: ArbEntry[], outputPath: string) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Translations');

  // Add headers
  sheet.columns = [
    { header: 'Key', key: 'key', width: 40 },
    { header: 'Value', key: 'value', width: 50 },
    { header: 'Description', key: 'description', width: 60 }
  ];

  // Add rows
  entries.forEach(entry => {
    sheet.addRow(entry);
  });

  await workbook.xlsx.writeFile(outputPath);
  console.log(`Excel file written to ${outputPath}`);
}

const entries = parseArbFile(arbFilePath);
exportToExcel(entries, outputExcelPath);
