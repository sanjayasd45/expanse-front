// for all time 
import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const alltimeData = async({email}) => {
    console.log(email);
    let totalSum = 0
    let balance = 0 

    
    try{
        const responce = await axios.post(`${baseUrl}/filter/alltime` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : email
        })
        const data = await responce.data
        data?.map((e) => {
            totalSum = totalSum + e.sum
            if(e.deduction){
                balance = balance - e.sum
                console.log("from true");
                
            }else{
                console.log(e);
                balance = balance + e.sum
                console.log("from false");
            }
        })
        console.log(data.data);

        
        return {data, totalSum, balance}
    }catch(err){
        console.log(err);
    }
}
export const today = async({email}) => {
    console.log(email);
    let totalSum = 0
    try{
        const responce = await axios.post(`${baseUrl}/filter/today` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : email
        })
        const data = await responce.data
        data?.map((e) => {
            totalSum = totalSum + e.sum
        })
        console.log(data.data);
        return {data, totalSum}
    }catch(err){
        console.log(err);
    }
}
export const fromRange = async(data) => {
    const opt = data
    let totalSum = 0
    try{
        const responce = await axios.post(`${baseUrl}/filter/fromrange` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : opt
        })
        const data = await responce.data
        data?.map((e) => {
            totalSum = totalSum + e.sum
        })
        console.log(data.data);
        return {data, totalSum}
    }catch(err){
        console.log(err);
    }
}
export const dateByRange = async(data) => {  
    try{
        const responce = await axios.post(`${baseUrl}/filter/by-range` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : data
        })
        const data1 = await responce.data
        console.log(data1);
        
        return data1
    }catch(err){
        console.log(err);
    }
}