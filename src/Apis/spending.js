import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const AddSpending = async(formData) => {
    try{
        const responce = await axios.post(`${baseUrl}/spending/add` , {
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



// export const DeleteSpending = async() => {
//     const axios
// }