import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {register, isAuthenticated} from './apiUser';

const Login = (props) => {
	const [values, setValues] = useState({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		teacher: false,
		redirect: false
	});

	const handleChange = name => e => {
		setValues({...values, [name]: e.target.value});
	}

	const handleTeacherChange = name => e => {
		setValues({...values, [name]: !values.teacher})
	}

	const handleSubmit = e => {
		e.preventDefault();
		const {email, password, firstName, lastName, teacher} = values;
		register(email, firstName, lastName, teacher, password).then(res => {
			console.log(res.data);
			// <Redirect to='/login' />
		})
	}

	if(isAuthenticated()){
		return <Redirect to='/' />
	}

	return(
		<div className='container'>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
			  <div className="form-group">
			    <label htmlFor="email">Email address</label>
			    <input onChange={handleChange('email')} value={values.email} type="email" className="form-control" id="email" />
			  </div>
			  <div className="form-group">
			    <label htmlFor="firstName">First Name</label>
			    <input onChange={handleChange('firstName')} value={values.firstName} type="text" className="form-control" id="firstName" />
			  </div>
			  <div className="form-group">
			    <label htmlFor="lastName">Last Name</label>
			    <input onChange={handleChange('lastName')} value={values.lastName} type="text" className="form-control" id="lastName" />
			  </div>
			  <div className="form-group">
			    <label htmlFor="password">Password</label>
			    <input onChange={handleChange('password')} value={values.password} type="password" className="form-control" id="password"/>
			  </div>
			  <div className="custom-control custom-switch">
				  <input type="checkbox" onChange={handleTeacherChange('teacher')} value={values.teacher} className="custom-control-input" id="customSwitch1"/>
				  <label className="custom-control-label" htmlFor="customSwitch1">Sign up as instructor</label>
				</div>
			  <button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Login;