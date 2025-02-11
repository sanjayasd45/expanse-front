import "jspdf-autotable";
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import jsPDF from 'jspdf';

export const useTodaysTS = () => {
    const recentData = useSelector(state => state?.getRecentData?.list?.response);

    const data = useMemo(() => {
        let totalAmount = 0;
        let topCategory = null;

        recentData?.forEach(element => {
            totalAmount += element.amount;
            if (!topCategory || topCategory.amount < element.amount) {
                topCategory = element;
            }
        });

        return { totalAmount, topCategory };
    }, [recentData]);

    return data;
};    

export const evaluateExpression = (expression) => {
    let multiplicationResult = expression.split('+').map(part => {
      return part.split('*').reduce((acc, num) => acc * Number(num), 1);
    }).join('+');

    return multiplicationResult.split('+').reduce((acc, num) => acc + Number(num), 0);
  };


export const spendingList = [
    "Select",
    "Education",
    "Room Rent",
    "Credit Card Bill",
    "Vegetables",
    "Petrol",
    "Wearables",
    "Beauty",
    "Fast food",
    "Fare",
    "Grocery",
    "Medical",
    "Repairing",
    "Lend",
    "Repay Loan",
    "Gratitude Pay",
    "Other"
];

export const  formatName = (name) => {
    return name
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .split(' ') // Split into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(' '); // Join back with a single space
}
export const  getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0'); // Ensures 2 digits
    const localDate = `${year}-${month}-${day}`;
    return localDate
}


export const generatePDF = ((transactions, name, email,selectedDate) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let y = 20; // Initial vertical position
    // Title
    doc.setFontSize(18);
    doc.text("Transactions", 10, y);
    y += 10;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB"); // "en-GB" uses dd/mm/yyyy format
    };

    // User details
    doc.setFontSize(12);
    doc.text(`Name: ${name || "N/A"}`, 10, y);
    y += 8;
    doc.text(`Email: ${email || "N/A"}`, 10, y);
    y += 8;
    doc.text(`Date: ${formatDate(new Date())}`, 10, y);
    y += 8;
    doc.text(`Range: ${formatDate(selectedDate?.startDate)} to ${formatDate(selectedDate?.endDate)}`, 10, y);
    y += 8;

    y += 4; // Space before the table

    // Table Headers
    const tableColumn = ["Date", "Note", "Tag", "Name", "Amount (INR)"];

    // Table Rows
    const tableRows = transactions.map((txn) => [
      formatDate(txn.createdAt), // Format date
      txn.note || "N/A", // Note
      txn.Tag || "N/A", // Tag
      txn.name || "N/A", // Name
      `${txn.amount}`, // Format amount
    ]);

    // Add table with autoTable
    doc.autoTable({
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
});

