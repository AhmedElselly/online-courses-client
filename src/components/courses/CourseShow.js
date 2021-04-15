import React, {Component, createRef} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {courseShow, publish, getStats} from './apiCourse';
import {isAuthenticated} from '../users/apiUser';
import {
	Card,
	CardHeader,
	CardMedia,
	Typography,
	IconButton,
	ListItemAvatar,
	ListItemText,
	ListItem,
	List,
	Avatar,
	Divider,
	Button
} from '@material-ui/core';

import {Edit} from '@material-ui/icons';
import NewLesson from './NewLesson';


class CourseShow extends Component{
	constructor(props){
		super(props);
		this.state = {
			_id: '',
			name: '',
			description: '',
			category: '',
			instructor: {},
			published: null,
			lessons: [],
			enrolled: 0,
			completed: 0
		}
		this.addNewLesson = this.addNewLesson.bind(this);
		this.handlePublish = this.handlePublish.bind(this);
		this.courseStats = this.courseStats.bind(this);
	}

	componentDidMount(){
		const {token} = isAuthenticated();
		const {courseId} = this.props.match.params;
		courseShow(token, courseId).then(res => {
			console.log(res.data)
			this.setState({
				_id: res.data._id,
				name: res.data.name,
				description: res.data.description,
				category: res.data.category,
				instructor: res.data.instructor,
				published: res.data.published,
				lessons: res.data.lessons
			})
		})

		this.courseStats();
	}

	addNewLesson(lesson){
		this.setState({lessons: [...this.state.lessons, lesson]});
	}

	handlePublish(e){
		e.preventDefault();
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		const {courseId} = this.props.match.params;
		let published = true;
		publish(courseId, _id, token, published).then(res => {
			this.setState({published: res.data.published});
		})
	}

	courseStats() {
		const {courseId} = this.props.match.params;
		const {token} = isAuthenticated();
		getStats(courseId, token).then(res => {
			this.setState({
				enrolled: res.data.totalEnrolled,
				completed: res.data.totalCompleted
			})
		})
	}

	render(){

		const {
			_id,
			name, 
			description,
			category,
			instructor,
			published,
			lessons,
			enrolled,
			completed
		} = this.state;
		console.log(instructor)
		
		const imageUrl = `https://online-courses-backend.herokuapp.com/courses/${_id}/image`;
		const ref = createRef();
		return (
			<div className='container mt-5'>
				<Card>
					<CardHeader
						title={name}
						subheader={
							<div className='row'>
								<div className='col-md-8'>
									<h5>{`By ${instructor.fullName}`}</h5>
									<span>{category}</span>
								</div>
								{isAuthenticated() && isAuthenticated().user._id === instructor._id && <div className='row'>
									<Link to={`/course/edit/${_id}`}>
										<IconButton aria-label="Edit" color="secondary">
											<Edit/>
										</IconButton>
									</Link>
									<NewLesson courseId={_id} ref={ref} addNewLesson={this.addNewLesson} />
									{!published ? (
										<Button className='ml-3' aria-label="Publish" color="secondary" variant="outlined"
											onClick={this.handlePublish}>
											Publish
										</Button>
									) : (
										<Button className='ml-3' aria-label="Publish" color="secondary" variant="outlined"
											onClick={this.handlePublish} disabled>
											Publish
										</Button>
									)}

									<br/>
									
								</div>}

									
							</div>
						}
					/>
					<div className=''>
						<span className='badge bg-info text-dark'>{enrolled} enrolled {completed} completed</span>
					</div>
					<CardMedia 
						style={{height: 0, paddingTop: '56%'}} 
						image={`https://online-courses-backend.herokuapp.com/courses/${_id}/image`} 
						title={name} 
					/>
					<div className='ml-3'>
						<Typography variant='body1'>{description}</Typography>
					</div>
				</Card>
				<div className='mt-5'>
				<h4>{lessons.length} {lessons && lessons.length === 1 ? 'Lesson':'Lessons'}</h4>
				<List>
					{lessons && lessons.map((lesson, index) => {
						return(<span key={index}>
						<ListItem>
						<ListItemAvatar>
						<Avatar> {index+1} </Avatar>
						</ListItemAvatar>
						<ListItemText primary={lesson.title} />
						</ListItem>
						<Divider variant="inset" component="li" />
						</span>)
					})}
				</List>
				</div>
			</div>
		)
	}
}

export default CourseShow;