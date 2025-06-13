import jsPDF from "jspdf";
import {autoTable} from "jspdf-autotable";
import { useSelector } from "react-redux";

const TransactionPDF = ({ transactions }) => {
  console.log("transactions", transactions);

  const user = useSelector((state) => state.user);
  const handlePrintPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let y = 20; // Initial vertical position

    // Title
    doc.setFontSize(18);
    doc.text("Transactions", 10, y);
    y += 10;

    // Check if transactions exist
    //   const { email, name } = transactions[0]; // Extract user details from first transaction
    doc.setFontSize(12);
    doc.text(`Name: ${user?.name}`, 10, y);
    y += 8;
    doc.text(`Email: ${user?.email}`, 10, y);
    y += 8;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, y);
    y += 8;

    y += 4; // Space before the table

    // Table Headers
    const tableColumn = ["Date", "Note", "Tag", "Name", "Amount(INR)"];

    // Table Rows (Extracting required fields)
    const tableRows = transactions.map((txn) => [
      new Date(txn.createdAt).toLocaleDateString(), // Format date
      txn.note || "N/A", // Note
      txn.Tag || "N/A", // Tag
      txn.name || "N/A", // Name
      `${txn.amount.toLocaleString()}`, // Format amount
    ]);
    // Add table with autoTable
    autoTable(doc,{
      didParseCell: function (data) {
        console.log(
          "didParseCell called for cell:",
          data.cell.text,
          "at row:",
          data.row.index,
          "col:",
          data.column.index
        );
      },
      startY: y,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [22, 160, 133], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 10 },
    });

    // Save the PDF
    doc.save("transaction_statement.pdf");
  };

  return (
    <button
      onClick={handlePrintPDF}
      style={{ padding: "10px 15px", fontSize: "16px", cursor: "pointer" }}
    >
      Download Statement
    </button>
  );
};

export default TransactionPDF;
