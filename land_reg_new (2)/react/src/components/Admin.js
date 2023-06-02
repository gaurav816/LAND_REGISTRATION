import React, { useEffect, useState } from 'react'
import '../css/Admin.css'
import { NavLink } from 'react-router-dom';

// document.querySelector(document).ready(function(){
//   document.querySelector('button').click(function(){
//       document.querySelector('.alert').show()
//   }) 
// });

const Admin = (props) => {

  const button = () => {
  
}

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  
  const [adminData, setAdminData] = useState({
    address:"", state:"", district:"", city:""
  });

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setAdminData({...adminData, [name]:value});
  }

  const handleSubmit = async () =>{
    await contract.addLandInspector(adminData.address, adminData.state, adminData.district, adminData.city, {
      from: account
    })
    console.log('admin details submitted');
    setAdminData({address:"", state:"", district:"", city:""});
  }

  
  return (
    <div className='superAdmin-mainDiv'>
      <div className='superAdmin-heading-div'>
      <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a href="/"><span class="navbar-brand mb-0 h1">Home</span></a>
        </div>
      </nav>
          
      </div>

      <h1 className='text-center pt-3 pb-3'>ADD LANDINSPECTOR</h1>

      <div className="admin-form pt-2 text-center">
        <div class="alert alert-success alert-dismissable admin-form">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            Success! message sent successfully.
        </div>
        </div>

      <div className='adminform pt-4'>
      <form method='POST' className='admin-form adminform'>
        <div className='form-group'>
            <label className='font-weight-bold'>Address</label>
            <input type="text" className="form-control" name="address" placeholder="Enter address" 
            autoComplete="off" value={adminData.address} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
            <label className='font-weight-bold'>State</label>
            <input type="text" className="form-control" name="state" placeholder="Enter state" 
            autoComplete="off" value={adminData.state} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
            <label className='font-weight-bold'>District</label>
            <input type="text" className="form-control" name="district" placeholder="Enter district" 
            autoComplete="off" value={adminData.district} onChange={onChangeFunc}/>
        </div>
        <div className='form-group'>
            <label className='font-weight-bold'>City</label>
            <input type="text" className="form-control" name="city" placeholder="Enter city" 
            autoComplete="off" value={adminData.city} onChange={onChangeFunc}/>
        </div>
      </form>
      <div className='text-center pt-4'>
        <button className='admin-form-btn btn btn-success btn-lg' onClick={handleSubmit} >Submit</button>
      </div>
    </div>
    </div>
  )
}

export default Admin