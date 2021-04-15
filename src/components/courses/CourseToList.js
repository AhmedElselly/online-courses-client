import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider
} from '@material-ui/core';

class CourseToList extends Component{
	render(){
		console.log(this.props)
		const {
			_id,
			name,
			description,
			category
		} = this.props;
		return(
			<Link to={`/teach/course/${_id}`} style={{color: 'black'}}>
				<ListItem button>
					<ListItemAvatar>
						<Avatar src={`https://online-courses-backend.herokuapp.com/courses/${_id}/image`} />
					</ListItemAvatar>
					<ListItemText primary={name} secondary={description} />
				</ListItem>
				<Divider/>
			</Link>
		)
	}
}

export default CourseToList;