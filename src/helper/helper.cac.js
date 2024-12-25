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


export const spendingList = [
    "Select",
    "Education",
    "Room Rent",
    "Credit Card Bill",
    "Vegetables",
    "Petrol",
    "Wearables",
    "Beauty",
    "Fare",
    "Grocery",
    "Medical",
    "Repairing",
    "Udhari Lena",
    "Udhari Dena",
    "Other"
];
