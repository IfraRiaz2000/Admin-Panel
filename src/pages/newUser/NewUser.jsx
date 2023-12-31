import React from 'react'
import "./NewUser.css"

export default function NewUser() {
  return (
    <div className='newUser'>
      <h1 className="newUserTitle">New User</h1>
      <form  className="newUserForm">
        <div className="newUserItem">
          <label >Username</label>
          <input type="text" placeholder='hammad' />
        </div>
        <div className="newUserItem">
          <label >Full Name</label>
          <input type="text" placeholder='Hammad Naveed' />
        </div>
        <div className="newUserItem">
          <label >Email</label>
          <input type="email" placeholder='HammadNaveed@gmail.com' />
        </div>
        <div className="newUserItem">
          <label >Password</label>
          <input type="password" placeholder='password' />
        </div>
        <div className="newUserItem">
          <label >Phone</label>
          <input type="password" placeholder='0323-68678678' />
        </div>
        <div className="newUserItem">
          <label >Address</label>
          <input type="text" placeholder='COmsats Lahore' />
        </div>
        <div className="newUserItem">
          <label >Gender</label>
          <div className="newUserGender">
            <input type="radio" name='gender' id='male' value='male' />
            <label for="male">Male</label>
            <input type="radio" name='gender' id='female' value='female' />
            <label for="female">Female</label>
            <input type="radio" name='gender' id='others' value='Others' />
            <label for="others">Others</label>
          </div>
        </div>
        <div className="newUserItem">
          <label >Active</label>
          <select className='newUserSelect' id='active' name='active'>
            <option value="yes">Yes</option>
            <option value="no">No</option>

          </select>
        </div>
        <button className='newUserButton'>Create</button>
      </form>
    </div>
  )
}
