import * as XLSX from '@sheetjs/xlsx';

export const exportToExcel = (filename: string, data: any[], headers?: { key: string; label: string }[]) => {
  if (!data || data.length === 0) {
    alert('No data to export.');
    return;
  }

  let finalHeaders: { key: string; label: string }[];

  // Determine headers
  if (headers && headers.length > 0) {
    finalHeaders = headers;
  } else {
    // Infer headers from the first object's keys if not provided
    finalHeaders = Object.keys(data[0]).map(key => ({ key, label: key }));
  }

  // Prepare data for SheetJS
  const wsData = [
    finalHeaders.map(h => h.label), // Header row
    ...data.map(row => finalHeaders.map(header => {
      let value = row[header.key];
      if (value === null || value === undefined) {
        value = '';
      } else if (value instanceof Date) {
        value = value.toLocaleString(); // Format Date objects
      } else if (typeof value === 'object') {
        value = JSON.stringify(value); // Stringify objects
      }
      return value;
    }))
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Registrations");

  // Write and download the file
  XLSX.writeFile(wb, `${filename}.xlsx`);
};