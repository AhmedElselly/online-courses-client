import React from 'react';
import {isAuthenticated} from '../users/apiUser';
import PublishedCourses from '../courses/PublishedCourses';
import LandingPage from './LandingPage';
import Search from './Search';


const Home = () => {
	return(
		<div>
			<LandingPage/>
			<div className='container'>
				<Search/>
			</div>
			<div>
				<PublishedCourses/>
			</div>
		</div>
	)
}

export default Home;