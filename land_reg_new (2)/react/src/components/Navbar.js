import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {

  const [isActive, setActive] = useState(true);

  const RenderMenu = () =>{

      return(
        (props.isLandInspector) ? 
          <>
            <li className={(isActive) ? "active nav-item": "nav-item"}>
                <NavLink className="nav-link" exact activeClassName="active" to="/LandInspector/">Register Land<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/LandInspector/explore" onClick={() => setActive(false)}>Explore</NavLink>
            </li>
          </>
          :
          <>
            <li className={(isActive) ? "active nav-item": "nav-item"}>
                <NavLink className="nav-link" exact activeClassName="active" to="/User/">Profile<span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/User/property" onClick={() => setActive(false)}>Property</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/User/requests" onClick={() => setActive(false)}>Requests</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/User/requested" onClick={() => setActive(false)}>Requested</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" exact activeClassName="active" to="/User/explore" onClick={() => setActive(false)}>Explore</NavLink>
            </li>
          </>
      )
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <div className="nav-item">
            <NavLink to='/' className="nav-link">
                Home
            </NavLink>
        </div>
            <h3>{props.isLandInspector ? "" : ""}</h3>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <RenderMenu/>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar