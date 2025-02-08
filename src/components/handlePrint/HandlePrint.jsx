import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function HandlePrint() {
    const onPrint = () => {
        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        let y = 20; // Initial vertical position
      
        // Title
        doc.setFontSize(18);
        doc.text('Transactions', 10, y);
        y += 10; // Move down
      
        // User details
        doc.setFontSize(12);
        doc.text(`Name: Sanjay Kumar`, 10, y);
        y += 8;
        doc.text(`Email: sanjayasd45@gmail.com`, 10, y);
        y += 8;
        doc.text(`Date: 04/02/2025`, 10, y);
        y += 8;
        doc.text(`Search For: 04/01/2025 - 04/02/2025`, 10, y);
        y += 12; // Add some space
      
        // Table Data
        const tableColumn = ["Date", "Note", "Tag", "Name", "Amount(INR)"];
        const tableRows = [
          ["04/02/2025", "Lunch", "Food", "Sanjay", "200"],
          ["03/02/2025", "Transport", "Travel", "Rahul", "150"],
          ["03/02/2025", "Transport", "Travel", "Rahul", "150"],
          ["03/02/2025", "Transport", "Travel", "Rahul", "150"],
          ["03/02/2025", "Transport", "Travel", "Rahul", "150"],
          ["03/02/2025", "Transport", "Travel", "Rahul", "150"],
        ];
      
        // Add table with autoTable plugin
        doc.autoTable({
          startY: y,
          head: [tableColumn],
          body: tableRows,
          theme: 'striped',
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [22, 160, 133], textColor: 255 },
          alternateRowStyles: { fillColor: [240, 240, 240] },
          margin: { top: 10 },
        });
      
        // Save the PDF
        doc.save('transaction_statement.pdf');
    }
  return (
    <div>
        <button onClick={onPrint}>Print Statement</button>
    </div>
  )
}
