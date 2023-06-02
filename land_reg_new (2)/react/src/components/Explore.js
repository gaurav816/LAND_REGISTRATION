import React, { useEffect, useState } from 'react'
import '../css/Admin.css';
import DisplayExploreResult from './DisplayExploreResult';

const Explore = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;

  const [explore, setExplore] = useState({
    state:"", district:"", city:"", surveyNo:""
  })

  const [landDetail, setLandDetail] = useState({
    owner:"", propertyId:"", index:"", marketValue:"", sqft:""
  })

  const [didIRequested, setDidIRequested] = useState(false);
  const [available, setAvailable] = useState(false);
  const [noResult, setNoResult] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  const onChangeFunc = (event) =>{
    const {name, value} = event.target;
    setExplore({...explore, [name]:value})
  }

  const handleOnClick = async () =>{
    const landDetails = await contract.extractPropertyDetails(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    })

    const isAvaliable = await contract.isAvailable(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    })

    const owner = landDetails[0];
    const propertyId = landDetails[1].words[0]
    const index = landDetails[2].words[0]
    const marketValue = landDetails[3].words[0]
    const sqft = landDetails[4].words[0]
    const surveyNo = explore.surveyNo

    if(account === owner){
      setIsOwner(true)
    }
    else{
      setIsOwner(false);
      if(isAvaliable){
        const _didIRequested = await contract.haveRequested(explore.state, explore.district, explore.city, explore.surveyNo,{
          from: account
        })
        
        setDidIRequested(_didIRequested);
      }
    }

    setLandDetail({owner, propertyId, index, marketValue, sqft, surveyNo})
    setAvailable(isAvaliable);
    setNoResult(1);


  }

  const requestForBuy = async () =>{
    await contract.RequestProperty(explore.state, explore.district, explore.city, explore.surveyNo, {
      from: account
    })

    setDidIRequested(true);
  }


  useEffect(()=>{
    console.log(landDetail)
  }, [landDetail])

  
  return (
    
    <div className='container explore-maindiv adminform'>
      <h1 className='text-center pt-4 pb-3'>EXPLORE NEW PROPERTY</h1>
        <div className=''>
          <div className=''>
            <form method='POST' className='admin-form adminform'>
              <div className='form-group'>
                  <label className='font-weight-bold'>State</label>
                  <input type="text" className="form-control" name="state" placeholder="Enter State" 
                  autoComplete="off" value={explore.state} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label className='font-weight-bold'>District</label>
                  <input type="text" className="form-control" name="district" placeholder="Enter district" 
                  autoComplete="off" value={explore.district} onChange={onChangeFunc}/>
              </div>
            </form>
          </div>
          <div className=''>
            <form method='POST' className='admin-form adminform'>
              <div className='form-group'>
                  <label className='font-weight-bold'>City</label>
                  <input type="text" className="form-control" name="city" placeholder="Enter city" 
                  autoComplete="off" value={explore.city} onChange={onChangeFunc}/>
              </div>
              <div className='form-group'>
                  <label className='font-weight-bold'>Survey number</label>
                  <input type="text" className="form-control" name="surveyNo" placeholder="Enter survey number" 
                  autoComplete="off" value={explore.surveyNo} onChange={onChangeFunc}/>
              </div>
            </form>
          </div>
        </div>
        <div className='text-center'>
          <button className='admin-form-btn btn btn-success btn-lg text-center' onClick={handleOnClick}>Explore</button>
        </div>

  
        <DisplayExploreResult
            
            owner = {landDetail.owner}
            propertyId = {landDetail.propertyId}
            surveyNo = {landDetail.surveyNo}
            marketValue = {landDetail.marketValue}
            sqft = {landDetail.sqft}
            available = {available}
            isAdmin = {props.isAdmin}
            didIRequested = {didIRequested}
            requestForBuy = {requestForBuy}
            noResult = {noResult}
            isOwner = {isOwner}

        />
    </div> 
     )
}

export default Explore