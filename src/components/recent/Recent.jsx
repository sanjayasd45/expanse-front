import "./Recent.css";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import ShowImage from "../../models/ShowImage";

export default function Recent({ item, txnToDeleted, delMdl }) {
  let stl = " rgb(55 255 39 / 25%)";
  if (item?.deduction) {
    stl = "rgb(251 55 0 / 25%)";
  }

  return (
    <div className="recents" style={{ border: stl }}>
      <div className="recnts-data" style={{ backgroundColor: stl }}>
        <div className="recents-tags">
          <p className="recents-tag-note">
            <p>{item?.note}{" "}</p>
            <p className="recents-image">
              {item?.fileId ? (
                <ShowImage publicId={item?.fileId} />
              ) : (
                ""
              )}
            </p>
          </p>
          <div>
            <p>₹{item?.amount} </p>
            <p>{item?.Tag}</p>
            {item?.name ? <p>{item?.name}</p> : null}
            <p>{new Date(item?.createdAt).toLocaleString().split(",")[0]}</p>
          </div>
        </div>
        <div className={delMdl ? "hide" : "recents-delete"}>
          <span onClick={() => txnToDeleted(item)}>
            <MdDelete />
          </span>
        </div>
      </div>
    </div>
  );
}

Recent.propTypes = {
  item: PropTypes.shape({
    note: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    Tag: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    deduction: PropTypes.bool,
  }).isRequired,
  txnToDeleted: PropTypes.func.isRequired,
  delMdl: PropTypes.string.isRequired,
};
