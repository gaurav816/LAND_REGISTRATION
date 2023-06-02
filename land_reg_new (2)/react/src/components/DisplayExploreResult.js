import React from 'react'

const DisplayExploreResult = (props) => {
  return (
    <>
    {
        (props.propertyId != 0) ? 
        <div className='pt-5 adminform pb-5'> 
        <h4 className='pb-3'>SEARCH RESULTS : </h4> 
      <div className='explore-result card pt-3 pl-3 pb-3'> 
        <div className=''>
            <p><b>Owner:</b> {props.owner}</p>
            <p><b>Survey Number:</b> {props.surveyNo}</p>
            <p><b>Property ID:</b> {props.propertyId}</p>
            <p><b>Market Value:</b> {props.marketValue}</p>
            <p><b>Size:</b> {props.sqft} sq. ft.</p>
         </div>
            {(props.available) ? 
              ((props.isAdmin || props.isOwner) ?
              <div className='text-center'>
                <button className='marked-sale btn btn-success'><b>Marked for sale</b></button>
               </div> 
                :
                ((props.didIRequested) ? 
                <div className='text-center'>
                  <button className='req-pending btn btn-warning'><b>Request Pending</b></button>
                </div>  
                  :
                <div className='text-center'>  
                  <button className='buy-btn btn btn-primary' onClick={props.requestForBuy}><b>Request for buy</b></button> </div>))
              :
            <div className='text-center'>
              <button className='no-sale btn btn-danger '><b>Not for sale</b></button>
            </div>
            }

        </div>
       </div>  
        :
        (props.noResult) ? 
        <div className="no-result-div">
          <h3 className='no-result text-center pt-4'>No results found :(</h3>
        </div>
        :
        <></>
    }
    </>
  )
}

export default DisplayExploreResult