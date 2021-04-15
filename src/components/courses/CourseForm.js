import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {isAuthenticated} from '../users/apiUser';
import {create} from './apiCourse';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',

    },
  },
  input: {
  	display: 'none'
  }
}));

const CourseForm = (props) => {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: '',
		description: '',
		image: '',
		category: ''
	});

	const handleChange = name => e => {
		const value = name === 'image' ? e.target.files[0] : e.target.value;
		setValues({...values, [name]: value});
	}

	const handleClick = e => {
		e.preventDefault();
		const {token} = isAuthenticated();
		const {_id} = isAuthenticated().user;
		const formData = new FormData();
		const {name, description, category, image} = values;
		formData.append('name', name);
		formData.append('image', image);
		formData.append('category', category);
		formData.append('description', description);

		create(formData, _id, token).then(res => {
			console.log(res.data);

		})
	}

	return(
		<div className='container'>
			<h1>Add New Course</h1>
			<form className={classes.root} style={{marginLeft: '30%'}} noValidate autoComplete="off">
	      <div>
	        <TextField
	          id="standard-multiline-flexible"
	          label="Title"
	          multiline
	          rowsMax={4}
	          value={values.name}
	          onChange={handleChange('name')}
	        />
	     	</div>
	     	<div>
		     	<input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
		      <label htmlFor="icon-button-file">
		        <IconButton color="primary" aria-label="upload picture" component="span">
		          <PhotoCamera />
		        </IconButton>
		      </label>
		      <span>{values.image ? values.image.name : 'Upload course photo'}</span>
		    </div>
	     	<div>
	        <textarea style={{width: '230px'}} name="description" value={values.description} placeholder='description' onChange={handleChange('description')} id=""></textarea>
	     	</div>
	     	<div>
	        <TextField
	          id="standard-multiline-flexible"
	          label="Category"
	          multiline
	          rowsMax={4}
	          value={values.category}
	          onChange={handleChange('category')}
	        />
	     	</div>
	     	<Button variant="contained" onClick={handleClick} color="secondary">
			  Post Course
			</Button>
		  </form>
		</div>
	)
}

export default CourseForm;