import React from 'react';
import './style.css';

const LandingPage = props => {
	return(
		<div className='bg-width'>
			<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
			  <div className="carousel-inner">
			    <div className="carousel-item active">
			      <img style={{height: '400px', objectFit: 'cover'}} src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80" class="d-block w-100" alt="..."/>
			    	<div class="carousel-caption d-none d-md-block">
			        <h5>RAISE YOUR EXPERIENCE</h5>
			        <p>Become an expert in all fields of web development.</p>
			      </div>
			    </div>
			    <div className="carousel-item">
			      <img style={{height: '400px', objectFit: 'cover'}} src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" class="d-block w-100" alt="..."/>
			    	<div class="carousel-caption d-none d-md-block">
			        <h5>CHALLENGE YOUR SELF</h5>
			        <p>Learning keeps you in the lead. Get in-demand skills to impress anyone.</p>
			      </div>
			    </div>
			    <div className="carousel-item">
			      <img style={{height: '400px', objectFit: 'cover'}} src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80' class="d-block w-100" alt="..."/>
			    	<div class="carousel-caption d-none d-md-block">
			        <h5>GROWTH</h5>
			        <p>Strive not to be a success, but rather to be of value.</p>
			      </div>
			    </div>
			  </div>
			  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
			    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span className="sr-only">Previous</span>
			  </a>
			  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			    <span className="carousel-control-next-icon" aria-hidden="true"></span>
			    <span className="sr-only">Next</span>
			  </a>
			</div>
		</div>
	)
}

export default LandingPage;