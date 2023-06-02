import React from 'react'

const DisplayRequests = (props) => {
  return (
    <div className="adminform pt-3 pb-3">
      <h1 className="text-center pb-3">REQUEST FOR BUY</h1>
        <div className='explore-result card'>
          <div className='pl-3 pt-3 pb-3'>
            <h4><b>Property ID: {props.propertyId}</b></h4>
            <p><b>Requested by:</b> {props.requester}</p>
            <p><b>Survey Number:</b> {props.surveyNo}</p>
            <p><b>State:</b> {props.state}</p>
            <p><b>District:</b> {props.district}</p>
            <p><b>City:</b> {props.city}</p>

          <div className='text-center'>
            <button className='accept-req btn btn-primary' onClick={() => {props.acceptReq(props.index, props.reqNo)}}><b>Accept Request</b></button>
          </div>  
          </div>  
        </div>
      </div>  
  )
}

export default DisplayRequests