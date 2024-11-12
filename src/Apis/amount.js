import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const addAmount = async(formData) => {
    try{
        const responce = await axios.post(`${baseUrl}/amount/add` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body : formData
        })
        const data = await responce
        console.log(data.data.addition);
        return data.data.addition
    }catch(err){
        console.log(err);
    }
}