export const exportToCsv = (filename: string, data: any[], headers: string[], keyMap: Record<string, string>) => {
  if (!data || data.length === 0) {
    alert('Tidak ada data untuk diekspor.');
    return;
  }

  const csvRows = [];
  csvRows.push(headers.join(',')); // Add headers

  for (const row of data) {
    const values = headers.map(header => {
      const key = keyMap[header]; // Use the explicit key from keyMap
      let value = row[key];

      // Special handling for 'Tanggal Pendaftaran' and 'Tanggal Lahir'
      if (header === 'Tanggal Pendaftaran' && value instanceof Date) {
        value = value.toLocaleDateString('id-ID');
      } else if (header === 'Tanggal Lahir' && value) {
        value = new Date(value).toLocaleDateString('id-ID');
      }
      
      // Ensure value is not undefined/null and escape commas and double quotes for CSV format
      const stringValue = String(value || '').replace(/"/g, '""');
      return `"${stringValue}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) { // Feature detection for download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};