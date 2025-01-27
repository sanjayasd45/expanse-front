import Recent from '../../components/recent/Recent';
import './DeleteTxn.css'
import { deleteTxn } from '../../Apis/delete.apis';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemById } from '../../Store/slices/getRecentData.slice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Loader } from '../../components/Sudo components/Loader';

export default function DeleteTxn({txnToDelete, setDelMdl, delMdl}) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.getRecentData)
  const [loading, setLoading] = useState(false)
  console.log(data);
  
  const handleConfirm = async()=> {
    setLoading(true)
    try {
      setTimeout(() => {
        deleteTxn({ _id: txnToDelete._id });
        dispatch(deleteItemById(txnToDelete._id))
        setDelMdl(false);
        toast.success("Deleted succesfully!",{
          theme: "colored",
        })
        setLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Error in handleConfirm:", error);
      toast.error("Error While Deleting!",{
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