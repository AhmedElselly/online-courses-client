import React, {useState, forwardRef} from 'react';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	TextField
} from '@material-ui/core';

import {Add} from '@material-ui/icons';
import {isAuthenticated} from '../users/apiUser';
import {addLesson} from './apiCourse';

const NewLesson = forwardRef((props, ref) => {
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState({
		title: '',
		content: '',
		resource_url: ''
	});

	const handleClickOpen = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

	const handleChange = name => e => {
		setValues({...values, [name]: e.target.value});
	}

	const clickSubmit = (e) => {
		e.preventDefault();
		const {courseId} = props;
		const {_id} = isAuthenticated().user;
		const {token} = isAuthenticated();
		const {title, content, resource_url} = values;
		addLesson(courseId, _id, token, title, content, resource_url).then(res => {
			// setValues({...values, title: '', content: '', resource_url: ''});
			setOpen(false);
			props.addNewLesson(res.data);

		})
	}


	return(
		<div>
			<Button aria-label="Add Lesson" color="primary" variant="contained"
				onClick={handleClickOpen}>
				<Add/> New Lesson
			</Button>
			<Dialog open={open} onClose={handleClose} fullWidth aria-labelledby="formdialog- title">
				<div className='col'>
					<DialogTitle id="form-dialog-title">Add New Lesson</DialogTitle>
					<DialogActions>
					<DialogContent>
						<TextField label="Title" type="text" fullWidth
						value={values.title} onChange={handleChange('title')}
						/>
						<br/>
						<TextField label="Content" type="text" multiline rows="5"
						fullWidth
						value={values.content}
						onChange={handleChange('content')}/>
						<br/>
						<TextField label="Resource link" type="text" fullWidth
						value={values.resource_url}
						onChange={handleChange('resource_url')} />
						<br/>
						<div className='mt-4'>
							<Button onClick={handleClose}
							color="primary" className='mr-3' variant="contained">
							Cancel
							</Button>
							<Button onClick={clickSubmit}
							color="secondary" variant="contained">
							Add
							</Button>
						</div>
					</DialogContent>
						
					</DialogActions>
				</div>
			</Dialog>
		</div>
	)
})

export default NewLesson;