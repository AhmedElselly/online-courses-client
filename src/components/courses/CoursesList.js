import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CourseToList from './CourseToList';
import {coursesList} from './apiCourse';
import {isAuthenticated} from '../users/apiUser';
import AddBoxIcon from '@material-ui/icons/AddBox';
import './style.css';

class CoursesList extends Component{
	constructor(props){
		super(props);
		this.state = {
			courses: []
		}
	}

	componentDidMount(){
		coursesList().then(res => {
			console.log(res.data);
			this.setState({courses: res.data});
		})
	}

	render(){
		const list = this.state.courses.map(course => {
			return(
				<CourseToList {...course} key={course._id} />
			)
		})

		return (
			<div className='container mt-5'>
				<div className='row'>
					<div className='col-md-8'>
						<h1>View all courses</h1>
					</div>
					{isAuthenticated() && isAuthenticated().user.teacher && <div className='col-md-4'>
						<Link to={`/course/new/${isAuthenticated().user._id}`}>
							<button className='btn btn-primary'><AddBoxIcon/> Add New Course</button>
						</Link>
					</div>}
				</div>	
				

				{list}
			</div>
		)
	}
}

export default CoursesList;