import './Profile.css'
import pic from "../../assets/img/p-pic.jpg"

export default function Profile() {
  return (
    <div className="profile">
        <div className='profileHeader'>
          <img src={pic} alt="" className="profileImg" />
          <div className="profileInfo">
            <h1 className="profileName">Sanjay Kumar</h1>
            <p>Sanjayasd45@gmail.com</p>
            <p>Joined On 02 2025</p>
          </div>
        </div>
    </div>
  )
}
