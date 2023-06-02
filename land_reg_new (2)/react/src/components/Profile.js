import React, { useEffect, useState } from 'react'
import '../css/Admin.css'

const Profile = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [userInfo, setUserInfo] = useState({
    address:"", fullName:"", gender:"", email:"", contact:"", residential_addr:""
  })

  const [update, setUpdate] = useState(false);


  const handleUpdate = async () =>{

    await contract.userRegistration(userInfo.fullName, userInfo.gender, userInfo.email, userInfo.contact, userInfo.residential_addr, {
      from: account});

    console.log(userInfo);
    setUpdate(false);
  }

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setUserInfo({...userInfo, [name]:value})
  }


  useEffect(() => {

    const getUserInfo = async() =>{
      const response = await contract.extractUser({from: account});

      setUserInfo({
        address: account, 
        fullName: (response[0]) ? response[0] : "NA", 
        gender: (response[1]) ? response[1] : "NA", 
        email: (response[2]) ? response[2] : "NA", 
        contact: (response[3].words[0]) ? response[3].words[0] : "NA", 
        residential_addr: (response[4]) ? response[4] : "NA"
      });
    }

    getUserInfo();
  }, [])

  


  return (
    <div className='container profile-main-div explore-maindiv'>

      {(update) ? 
      
        <>
        <h1 className='text-center pt-4 pb-4'>UPDATE PROFILE</h1>
          <div className=''>
            <div className=''>
              <form method='POST' className='admin-form adminform'>
                <div className='form-group'>
                    <label className='font-weight-bold'>Full Name</label>
                    <input type="text" className="form-control" name="fullName" placeholder="Enter full name" 
                    autoComplete="off" value={userInfo.fullName} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label className='font-weight-bold'>Gender</label>
                    <br/>
                    <select className='select-gender ' name='gender' defaultValue={userInfo.gender} onChange={onChangeFunc}>
                      <option selected value="NA" >NA</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="I prefer not to say">I prefer not to say</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label className='font-weight-bold'>Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Enter email" 
                    autoComplete="off" value={userInfo.email} onChange={onChangeFunc}/>
                </div>
              </form>
            </div>
            <div className=''>
              <form method='POST' className='admin-form adminform'>
                <div className='form-group'>
                    <label className='font-weight-bold'>Contact number</label>
                    <input type="number" className="form-control" name="contact" placeholder="Enter contact" 
                    autoComplete="off" value={userInfo.contact} onChange={onChangeFunc}/>
                </div>
                <div className='form-group'>
                    <label className='font-weight-bold'>Residential Address</label>
                    <input type="text" className="form-control" name="residential_addr" placeholder="Enter residential address" 
                    autoComplete="off" value={userInfo.residential_addr} onChange={onChangeFunc}/>
                </div>
              </form>
            </div>
          </div>
          <div className='text-center pt-2'>
            <button className='update-btn btn btn-success' onClick={handleUpdate}>Confirm Update</button>
          </div>
        </>
      
        :

        <>

        <h1 className='text-center pt-4'>USER DETAILS</h1>
        <div className='user-details pt-5 pb-2'>
          <div className=''>
              <p><b>Owner Address</b> : {userInfo.address}</p>
              <p></p>

              <p><b>Full Name</b> : {userInfo.fullName}</p>
              <p></p>

              <p><b>Gender</b> : {userInfo.gender}</p>
              <p></p>
          </div>

          <div className=''>
              <p><b>Email</b> : {userInfo.email}</p>
              <p></p>

              <p><b>Contact Number</b> : {userInfo.contact}</p>
              <p></p>

              <p><b>Resindential Address</b> : {userInfo.residential_addr}</p>
              <p></p>
          </div>
        </div>
        <div className='text-center'>
          <button className='update-btn btn btn-success' onClick={() => {setUpdate(true)}}>Update Profile</button>
        </div>
        </>
      }
    </div>
  )
}

export default Profile