import React, {useState} from 'react';
import {search} from '../courses/apiCourse';
import Enroll from '../courses/Enroll';
import {isAuthenticated} from '../users/apiUser';
import {
	GridList,
	GridListTile,
	GridListTileBar
} from '@material-ui/core';
import {Link} from 'react-router-dom';


const Search = (props) => {
	const [name, setName] = useState('');
	const [courses, setCourses] = useState({});

	const handleChange = e => {
		setName(e.target.value);
	}

	const handleSubmit = e => {
		e.preventDefault();
		search(name).then(res => {
			console.log(res.data)
			setCourses(res.data);
		})
	}

	const displayResult = () => {
		if(courses.length) return courses.map(course => {
			return(
				<GridListTile key={course._id} style={{padding:0}}>
					<Link to={`/teach/course/${course._id}`}>
						<img style={{objectFit: 'cover', width: '100%', height: '100%'}} src={`https://online-courses-backend.herokuapp.com/courses/${course._id}/image`} alt={course.name} />
					</Link>
					<GridListTileBar
						title={<Link style={{color: 'white'}} to={"/teach/course/"+course._id}>
						{course.name}</Link>}
						subtitle={<span>{course.category}</span>}
						actionIcon={isAuthenticated() ?
						<Enroll courseId={course._id}/> :
						<Link to="/login">
						Sign in to Enroll</Link>
						}
					/>
				</GridListTile>
			)
		})
		
	}


	return (
		<div>
			<h3>Search a Course</h3>
			<form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0">
	      <input onChange={handleChange} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
	      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
	    </form>
	    {courses.length ? ( 
	    	<GridList className='mt-5' cellHeight={220} cols={2}>
  				{displayResult()}
  			</GridList>
  		):(null)}
		</div>
	)
}

export default Search;