import React, {Component} from 'react';
import Enroll from './Enroll';
import {Link} from 'react-router-dom';
import {publishedCourses} from './apiCourse';
import {isAuthenticated} from '../users/apiUser';
import {
	GridList,
	GridListTile,
	GridListTileBar
} from '@material-ui/core';

class PublishedCourses extends Component{
	constructor(props){
		super(props);
		this.state = {
			courses: []
		}
	}

	componentDidMount(){
		publishedCourses().then(res => {
			console.log(res.data);
			this.setState({courses: res.data});
		})
	}

	render(){
		const allCourses = this.state.courses.map(course => {
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
		return(
			<div className='mt-5 container'>
			<h3>Published Courses</h3>
			<GridList className='mt-5' cellHeight={220} cols={2}>
				{allCourses}
			</GridList>
			</div>
		)
	}
}

export default PublishedCourses;