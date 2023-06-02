import React from 'react'
import '../css/Admin.css'

const DisplayLandDetails = (props) => {
  return (
    <>
    {   <div className="adminform">
       <h1 className='text-center pt-3 pb-3'>PROPERTY DETAILS</h1>
        <div className="card explore-result pt-2 pb-4">
          <div className='pl-3 pt-3 pb-3'>
            <div className='row'>
              <div className='col-12 col-md-8'>
                <p><b>Owner:</b> {props.owner}</p>
                <p><b>Survey Number:</b> {props.surveyNo}</p>
                <p><b>Property ID:</b> {props.propertyId}</p>
                <p><b>Market Value:</b> {props.marketValue}</p>
              </div>

              <div className='col-12 col-md-4'>
                <p><b>State:</b> {props.state}</p>
                <p><b>District:</b> {props.district}</p>
                <p><b>City:</b> {props.city}</p>
                <p><b>Size:</b> {props.sqft} sq. ft.</p>
              </div>
            </div>
            {
            (props.available) ?
            <div className='text-center'> 
              <button className='marked-available btn btn-success'><b>Marked Available</b></button>
            </div>
              :
            <div className='text-center'>  
              <button className='mark-available-btn btn btn-warning' onClick={() => {props.markAvailable(props.index)}} ><b>Mark Available</b></button>
            </div>  
            }
          </div> 
          </div>
          </div>
    }
    </>
  )
}

export default DisplayLandDetails