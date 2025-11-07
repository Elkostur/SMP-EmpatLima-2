import * as XLSX from '@sheetjs/xlsx';

export const exportToExcel = (filename: string, data: any[], headers: string[]) => {
  if (!data || data.length === 0) {
    alert('Tidak ada data untuk diekspor.');
    return;
  }

  // Map data to include only specified headers and format dates
  const formattedData = data.map(row => {
    const newRow: { [key: string]: any } = {};
    headers.forEach(header => {
      // Special handling for 'Tanggal Pendaftaran'
      if (header === 'Tanggal Pendaftaran' && row.createdAt instanceof Date) {
        newRow[header] = row.createdAt.toLocaleDateString('id-ID');
      } else if (header === 'Tanggal Lahir' && row.birthDate) {
        newRow[header] = new Date(row.birthDate).toLocaleDateString('id-ID');
      }
      else {
        // Generic mapping for other headers
        const key = Object.keys(row).find(k => k.toLowerCase().includes(header.toLowerCase().replace(/ /g, '')));
        if (key) {
          newRow[header] = row[key];
        }
      }
    });
    return newRow;
  });

  const ws = XLSX.utils.json_to_sheet(formattedData, { header: headers });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Registrations");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};