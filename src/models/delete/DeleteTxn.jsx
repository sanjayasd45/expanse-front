import Recent from '../../components/recent/Recent';
import './DeleteTxn.css'
import { deleteTxn } from '../../Apis/delete.apis';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemById } from '../../Store/slices/getRecentData.slice';

export default function DeleteTxn({txnToDelete, setDelMdl, delMdl}) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.getRecentData)
  console.log(data);
  
  const handleConfirm = async()=> {
    try {
      deleteTxn({ _id: txnToDelete._id });
      dispatch(deleteItemById(txnToDelete._id))
      setDelMdl(false);
    } catch (error) {
      console.error("Error in handleConfirm:", error);
    }
  }
  
  return (
    <div className="model-0">
        <div className='model-content'>
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