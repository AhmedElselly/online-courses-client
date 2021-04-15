import React, {useEffect, useState} from 'react';
import {isAuthenticated} from '../users/apiUser';
import {getEnrollment} from './apiCourse';
import {
	Avatar,
	Button
} from '@material-ui/core';
import {
	CheckCircle
} from '@material-ui/icons';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import {complete} from './apiCourse';

const LearnPage = (props) => {
	const [enrol, setEnrol] = useState({course: {instructor: []}, lessonsStatus: []});
	const [loading, setLoading] = useState(false);
	const [totalComplete, setTotalComplete] = useState(0);
	const [values, setValues] = useState({
		redirect: false,
		drawer: -1
	})
	useEffect(() => {
		const {token} = isAuthenticated();
		const {enrolId} = props.match.params;
		getEnrollment(enrolId, token).then(res => {
			console.log(res.data);
			setEnrol(res.data);
			setLoading(true);
		})
		// getLessons()
	}, [props.match.params.enrolId]);

	const selectDrawer = (index) => {
		setValues({...values, drawer: index});
	}

	const markComplete = () => {
		console.log('clicked')
		if(!enrol.lessonsStatus[values.drawer].lesson.complete){
			const lessonStatus = enrol.lessonsStatus;
			lessonStatus[values.drawer].complete = true;
			let count = totalCompleted(lessonStatus);
			let updatedData = {};
			updatedData.lessonStatusId = lessonStatus[values.drawer]._id;
			updatedData.complete = true;
			if(count == lessonStatus.length){
				updatedData.courseCompleted = Date.now();
			}
			const {token} = isAuthenticated();
			complete(props.match.params.enrolId, token, updatedData).then(res => {
				console.log(res.data);
				setEnrol({...enrol, lessonsStatus: lessonStatus});
			})

		}
	}

	const totalCompleted = (lessons) => {
		let count = lessons.reduce((total, lessonStatus) => {
			return total + (lessonStatus.complete ? 1 : 0);
		}, 0);
		setTotalComplete(count)
		return count;
}

	const getLessons = () => {
		
		const allLessons = enrol.lessonsStatus.map((lesson, index) => {
			return (
				<div key={index}>
					<li style={{background: 'black'}} onClick={() => selectDrawer(index)} className='list-group-item d-flex justify-content-between align-items-center'>
					<Avatar style={{
					 marginRight: '20px'
					}}>{index+1}</Avatar>{lesson.lesson.title} {lesson.complete ? (<CheckCircle className={'ml-3'}/>):(
							<RadioButtonUncheckedIcon className={'ml-3'}/>
						)}</li>
					<hr style={{color: 'white'}}/>
				</div>
			)
		})

		return allLessons;
	}

	console.log(enrol)

	const getCourseDetails = () => {
		return (
			<div className='row container-fluid'>
				<div className='col-sm-4 course-menu'>
					<h4 style={{color: 'white'}} className='ml-5 mb-5'>Lessons</h4>
					<ul className='list-group'>
						{getLessons()}
					</ul>
				</div>
				<div className='col-md-8 mt-3'>
					<h1>{enrol.course.name}</h1>
					{values.drawer !== -1 && (
						
						<div className="card">
						  <div className="card-header">
						    {enrol.lessonsStatus[values.drawer].lesson.title}
						  </div>
						  <div className="card-body">
						    <p className="card-text">{enrol.lessonsStatus[values.drawer].lesson.content}</p>
						    <a href={`${enrol.lessonsStatus[values.drawer].lesson.resource_link}`} className="btn btn-primary">Resource Link</a>
						    <Button
						    	className='ml-5'
									onClick={markComplete}
									variant={enrol.lessonsStatus[values.drawer].complete ?
									'contained' : 'outlined'}
									color="secondary">
										{enrol.lessonsStatus[values.drawer].complete ? "Completed" : "Mark as complete"}
									</Button>
						  </div>
						</div>
					)}
				</div>
			</div>				
		)
	}

	return(
		<div className='row'>			
			{!loading ? (
				<h3>Loading...</h3>
			):(getCourseDetails())}
		</div>
	)
}

export default LearnPage;