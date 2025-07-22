import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;


export const deleteTxn = async ({ _id }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/delete/txn`, 
        { _id }, 
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );
      // console.log(response.status);
      return response; 
      
    } catch (err) {
      console.error("Error in deleteTxn:", err);
      throw err; 
    }
  };
  