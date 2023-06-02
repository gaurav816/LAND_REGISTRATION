import React from 'react'

const DisplayRequested = (props) => {
  return (
    <>
    <div className="adminform pt-3 pb-3">
    <h1 className="text-center pb-3">REQUESTED PROPERTY</h1>
        <div className='explore-result card'>
          
          <div className='pl-3 pt-3 pb-3'>
          <div className='row'>
            <div className='col-12 col-md-6'>
                <p><b>Owner:</b> {props.owner}</p>
                <p><b>Survey Number:</b> {props.surveyNo}</p>
                <p><b>Property ID:</b> {props.propertyId}</p>
                <p><b>Market Value:</b> {props.marketValue}</p>
              </div>
              <div className='col-12 col-md-6'>
                <p><b>Size:</b> {props.sqft} sq. ft.</p>
                <p><b>State:</b> {props.state}</p>
                <p><b>District:</b> {props.district}</p>
                <p><b>City:</b> {props.city}</p>
            </div>
          </div>
            <div className='text-center'>
              <button className='no-sale btn btn-warning'><b>Request Pending</b></button>
            </div>
            </div>
        </div>
        </div>

    </>
  )
}

export default DisplayRequested