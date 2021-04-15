import React, {Component} from 'react';
import {
	Button
} from '@material-ui/core';
import {Redirect} from 'react-router-dom';

import {isAuthenticated} from '../users/apiUser';
import {createEnrol} from './apiCourse';

class Enroll extends Component{
	constructor(props){
		super(props);
		this.state = {
			enrollmentId: '',
			redirect: false
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e){
		e.preventDefault();
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const {courseId} = this.props;
		createEnrol(courseId, _id, token).then(res => {
			console.log(res.data);
			this.setState({enrollmentId: res.data._id, redirect: true});
		})
	}

	render(){
		if(this.state.redirect){
			return <Redirect to={`/learn/${this.state.enrollmentId}`} />
		}
		return(
			<div className='mr-2'>
				<Button onClick={this.handleClick} variant='contained' color='secondary'>
					{this.props.enrolled ? 'Show' : 'Enroll'}
				</Button>
			</div>
		)
	}
}

export default Enroll