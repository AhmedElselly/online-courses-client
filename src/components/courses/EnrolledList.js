import React, {Component, Fragment} from 'react';
import {listByStudent} from './apiCourse';
import {isAuthenticated} from '../users/apiUser';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	Button
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';

import {Link} from 'react-router-dom';
import Enroll from './Enroll';


class EnrolledList extends Component{
	constructor(props){
		super(props);
		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		listByStudent(token, _id).then(res => {
			console.log(res.data);
			this.setState({posts: res.data});
		})
 	} 


	render(){
		const allCourses = this.state.posts.map(post => {
			return(
				<GridListTile key={post.course._id} style={{padding:0}}>
					<Link to={`/teach/course/${post.course._id}`}>
						<img style={{objectFit: 'cover', width: '100%', height: '100%'}} src={`https://online-courses-backend.herokuapp.com/courses/${post.course._id}/image`} alt={post.course.name} />
					</Link>
					<GridListTileBar
						title={<Link style={{color: 'white'}} to={"/teach/course/"+post.course._id}>
						{post.course.name}</Link>}
						subtitle={<span>{post.course.category}</span>}
						actionIcon={isAuthenticated() && (
						<Fragment>
						<Link className='mr-3 link-item' to={`/learn/${post._id}`}>
							<Button variant='contained' color='secondary'>
								Show
							</Button>
						</Link>
						{post.completed ? (
								<CheckCircleIcon color="secondary"/>
							):(
								<DonutLargeIcon className='mr-2' color='secondary'/>
							)}
						</Fragment>
						)}
					/>
				</GridListTile>
			)
		})
		return(
			<div className='container'>
				<GridList className='mt-5' cellHeight={220} cols={2}>
					{allCourses}
				</GridList>
			</div>
		)
	}
}

export default EnrolledList;