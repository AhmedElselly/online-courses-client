import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {isAuthenticated, logout} from '../users/apiUser';

import './style.css';

const Navbar = (props) => {
	return(
		<nav className="navbar navbar-expand-lg navbar-custom navbar-dark">
		  <Link className="navbar-brand" to="/">Courses</Link>
		  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span className="navbar-toggler-icon"></span>
		  </button>

		  <div className="collapse navbar-collapse" id="navbarSupportedContent">
		    <ul className="navbar-nav mr-auto">
		      <li className="nav-item active">
		        <Link className="nav-link" to="/">Home</Link>
		      </li>
		      <li className="nav-item active">
		        <Link className="nav-link" to="/courses">Courses</Link>
		      </li>
		      {!isAuthenticated() && (
		      	<Fragment>
		      	<li className="nav-item">
			        <Link className="nav-link" to="/login">Login</Link>
			      </li>
			      <li className="nav-item">
			        <Link className="nav-link" to="/register">Register</Link>
			      </li>
		      </Fragment>
		      )}
		      {isAuthenticated() && isAuthenticated().user.teacher && (
		      	<Fragment>
			      	<li className="nav-item">
				        <Link className="nav-link" to={`/course/new/${isAuthenticated().user._id}`}>New Course</Link>
			      	</li>
			      	<li className="nav-item">
				        <Link className="nav-link" to={`/learn/list/${isAuthenticated().user._id}`}>Enrolled Courses</Link>
			      	</li>
			    </Fragment>	
		      )}

		      {isAuthenticated() && (
		      	<li className="nav-item">
			        <span className="nav-link" style = {{cursor: 'pointer'}} onClick={() => logout(() => {
			        	props.history.push('/');
			        })}>Logout</span>
		      	</li>
	      		)}
		    </ul>
		  </div>
		</nav>
	)
}

export default withRouter(Navbar);