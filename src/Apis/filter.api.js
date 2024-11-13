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
            if(e._id === "Sallary"){
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