import { useSelector } from 'react-redux';
import { useMemo } from 'react';

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