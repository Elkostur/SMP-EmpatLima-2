export const exportToCsv = (filename: string, data: any[], headers?: { key: string; label: string }[]) => {
  if (!data || data.length === 0) {
    alert('No data to export.');
    return;
  }

  let csvContent = '';
  let finalHeaders: { key: string; label: string }[];

  // Determine headers
  if (headers && headers.length > 0) {
    finalHeaders = headers;
  } else {
    // Infer headers from the first object's keys if not provided
    finalHeaders = Object.keys(data[0]).map(key => ({ key, label: key }));
  }

  // Add header row
  csvContent += finalHeaders.map(h => `"${h.label.replace(/"/g, '""')}"`).join(',') + '\n';

  // Add data rows
  data.forEach(row => {
    const rowValues = finalHeaders.map(header => {
      let value = row[header.key];
      if (value === null || value === undefined) {
        value = '';
      } else if (value instanceof Date) {
        value = value.toLocaleString(); // Format Date objects
      } else if (typeof value === 'object') {
        value = JSON.stringify(value); // Stringify objects
      }
      // Escape double quotes and wrap in quotes
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvContent += rowValues.join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) { // Feature detection
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};