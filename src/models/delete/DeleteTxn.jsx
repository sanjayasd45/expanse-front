import Recent from '../../components/recent/Recent';
import './DeleteTxn.css'
import { deleteTxn } from '../../Apis/delete.apis';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteItemById } from '../../Store/slices/getRecentData.slice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Loader } from '../../components/Sudo components/Loader';

export default function DeleteTxn({txnToDelete, setDelMdl, delMdl}) {
  const dispatch = useDispatch()
  // const data = useSelector(state => state.getRecentData)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async()=> {
    try {
        setLoading(true)
        const result = await deleteTxn({ _id: txnToDelete._id });
        console.log(result);
        if(result.status !== 200) {
          toast.error("Error While Deleting!" ,{
            theme: "colored",
          })
          setLoading(false)
          setDelMdl(false);
          return;
        }else{
          dispatch(deleteItemById(txnToDelete._id))
          toast.success("Deleted succesfully!",{
            theme: "colored",
          })
          setLoading(false)
          setDelMdl(false);
        }
    } catch (error) {
      console.error("Error in handleConfirm:", error);
      toast.error(`Error while deleting! ${error?.message}`,{
        theme: "colored",
      })
      setLoading(false)
    }
  }
  
  return (
    <div className="model-0">
        <div className='model-content'>
        {
          loading ? <Loader/> : ""
        }
          <h3>You Are Deleteing This Transaction</h3>
          <div className='txn-content'>
            <Recent item={txnToDelete} delMdl={delMdl}/>
          </div>
          <div className='model-btns'>
            <button onClick={() => setDelMdl(false)}>Cancel</button>
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
    </div>
  )
}

DeleteTxn.propTypes = {
  txnToDelete: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email : PropTypes.string.isRequired
  }).isRequired,
  setDelMdl: PropTypes.func.isRequired,
  delMdl: PropTypes.bool.isRequired,
};