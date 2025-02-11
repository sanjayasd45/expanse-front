import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const updateRoomRentInfo = async(data) => {  
    // const {email, tag} = data
    
    try{
        const responce = await axios.post(`${baseUrl}/user/update-roomrent-info` , {
            headers: {
                'Content-Type': 'application/json',
            },
            body : data
        })
        const data1 = await responce.data
        // console.log(data1);
        return data1
    }catch(err){
        console.log(err);
    }
}
