import React, {useState, useEffect } from 'react'
import DisplayRequested from './DisplayRequested';

const Requested = (props) => {

  const { provider, web3, contract } = props.myWeb3Api;
  const account = props.account;
  const reqArr = [];

  const [requestedList, setRequestedList] = useState([]);
  const [length, setLength] = useState(0);

  useEffect(() =>{

    const getRequested = async () =>{

      const _indices = await contract.extractIndices({from: account});
      const _reqIndices = _indices[1].words[0];

      for(let i=0; i<_reqIndices; i++){

        const reqLand = await contract.extractRequestedProperty(i, {from: account});

        // if surveyNo. != 0
        if(reqLand[3].words[0] != 0){
          const landDetails = await contract.extractPropertyDetails(reqLand[0], reqLand[1], reqLand[2], reqLand[3].words[0], {
            from: account
          })

          const landDetails2 = {state: reqLand[0], district: reqLand[1], city: reqLand[2], surveyNo: reqLand[3].words[0]}
          let allDetails = {...landDetails, ...landDetails2}
          reqArr.push(allDetails);
        }
      }
      setRequestedList(reqArr);
      setLength(reqArr.length);
      console.log(reqArr);
    }

    getRequested();

  }, [])


  return (
    <div className='container'>
        {  
        (length === 0) ? 
        <div className="no-result-div">
          <h1 className='no-result text-center pt-5 font-weight-bold'>NO PENDING REQUESTS</h1>
        </div>
        :
          requestedList.map((details, index) =>{
            return(
              <DisplayRequested
                 
                key = {index}
                owner = {details[0]}
                propertyId = {details[1].words[0]}
                index = {details[2].words[0]}
                marketValue = {details[3].words[0]}
                sqft = {details[4].words[0]}
                state = {details.state}
                district = {details.district}
                city = {details.city}
                surveyNo = {details.surveyNo}

              />
            )
          })
        } 
    </div>
  )
}

export default Requested