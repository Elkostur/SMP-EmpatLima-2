export const exportToCsv = (filename: string, data: any[], headers: string[]) => {
  if (!data || data.length === 0) {
    alert('Tidak ada data untuk diekspor.');
    return;
  }

  const csvRows = [];
  csvRows.push(headers.join(',')); // Add headers

  for (const row of data) {
    const values = headers.map(header => {
      let value;
      // Special handling for 'Tanggal Pendaftaran' and 'Tanggal Lahir'
      if (header === 'Tanggal Pendaftaran' && row.createdAt instanceof Date) {
        value = row.createdAt.toLocaleDateString('id-ID');
      } else if (header === 'Tanggal Lahir' && row.birthDate) {
        value = new Date(row.birthDate).toLocaleDateString('id-ID');
      } else {
        // Generic mapping for other headers
        const key = Object.keys(row).find(k => k.toLowerCase().includes(header.toLowerCase().replace(/ /g, '')));
        value = key ? row[key] : '';
      }
      // Escape commas and double quotes for CSV format
      const stringValue = String(value).replace(/"/g, '""');
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