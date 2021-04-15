import React, {Component, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {
	CardHeader,
	CardMedia,
	TextField,
	IconButton,
	Button
} from '@material-ui/core';
import {PhotoCamera} from '@material-ui/icons';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import {isAuthenticated} from '../users/apiUser';
import {courseShow, updateCourse, updateLesson} from './apiCourse';

class CourseEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: '',
			name: '',
			description: '',
			category: '',
			image: '',
			instructor: {},
			lessons: [],
			loaded: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount(){
		const {token} = isAuthenticated();
		const {courseId} = this.props.match.params;
		courseShow(token, courseId).then(res => {
			console.log(res.data);
			this.setState({
				id: res.data._id,
				name: res.data.name,
				description: res.data.description,
				category: res.data.category,
				instructor: res.data.instructor,
				lessons: res.data.lessons
			})
		})
	}

	handleChange(e){
		const value = e.target.name === 'image' ? e.target.files[0] : e.target.value;
		this.setState({[e.target.name]: value});
	}

	handleSubmit(e){
		e.preventDefault();
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		const {courseId} = this.props.match.params;
		const formData = new FormData();
		const {name, description, image, category, lessons} = this.state;
		formData.append('name', name);
		formData.append('image', image);
		formData.append('category', category);
		formData.append('description', description);
		updateCourse(formData, courseId, _id, token).then(res => {
			console.log(res.data);
			this.setState({loaded: true});
		})

	}

	handleLessonChange = (name, index) => e => {
		const {lessons} = this.state;
		lessons[index][name] = e.target.value;
		this.setState({...lessons, lessons});
	}

	handleLessonSubmit = (lesson, index) => e => {
		// console.log(lesson)
		e.preventDefault();
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		const {courseId} = this.props.match.params;
		updateLesson(courseId, _id, token, lesson.title, lesson.content, lesson.resource_url, index).then(res => {
			console.log(res.data);
		})
	}

	moveUp = index => e => {
		const {lessons} = this.state;
		let up = lessons[index];
		lessons[index] = lessons[index - 1];
		lessons[index - 1] = up;
		this.setState({...lessons, lessons});
	}

	render(){
		const {id, name, description, image, category, instructor, lessons, loaded} = this.state;
		if(loaded){
			return <Redirect to={`/teach/course/${id}`} />
		}
		return(
			<div className='container'>
				<CardHeader
					title={<TextField label='Title' type='text' name='name' fullWidth value={name} onChange={this.handleChange} />}
					subheader={
						<div>
							<Link to={`/`}>
								By {instructor.fullName}
							</Link>
							{<TextField label='Category' type='text' name='category' fullWidth value={category} onChange={this.handleChange} />}
						</div>
					}
					action={
						<Button variant='contained' color='secondary' onClick={this.handleSubmit}>Save</Button>
					}
				/>
				<div className={''}>
					<CardMedia style={{height: 0, paddingTop: '56%'}} image={`http://localhost:8000/courses/${id}/image`} title={name}/>
					<div className={''}>
					<div>
					<TextField multiline rows="5" label="Description" fullWidth type="text"
					value={description}
					name='description'
					onChange={this.handleChange} />
					</div>
					<br/>
					<div>

			     	<input accept="image/*" name='image' onChange={this.handleChange} style={{display: 'none'}} id="icon-button-file" type="file" />
			      <label htmlFor="icon-button-file">
			        <IconButton color="primary" aria-label="upload picture" component="span">
			          <PhotoCamera />
			        </IconButton>
			      </label>
		      	<span>{image ? image.name : ''}</span>
		    	</div>
				<br/>
				</div>
				</div>
				<div>
				<h3>Edit Lessons</h3>
					{lessons.length && lessons.map((lesson, index) => {
						return(
							<Fragment key={lesson._id}>
							<h5>lesson {index + 1}</h5>
							<TextField label="Title" type="text" fullWidth
							value={lesson.title} onChange={this.handleLessonChange('title', index)}
							/>
							<br/>
							<TextField label="Content" type="text" multiline rows="5"
							fullWidth
							value={lesson.content}
							onChange={this.handleLessonChange('content', index)}/>
							<br/>
							<TextField label="Resource link" type="text" fullWidth
							value={lesson.resource_url}
							onChange={this.handleLessonChange('resource_url', index)} />
							{index !== 0 && (
								<IconButton color="primary" onClick={this.moveUp(index)}>
									<ArrowUpwardIcon/>
								</IconButton>
							)}
							<br/>
							<hr/>
							<div className='mt-4'>
								<Button variant='contained' color='secondary' onClick={this.handleLessonSubmit(lesson, index)}>Save</Button>
							</div>
						</Fragment>
					)}
						
					)}
				</div>
			</div>
		)
	}
}

export default CourseEdit;