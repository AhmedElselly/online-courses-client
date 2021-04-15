import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {login, authenticate, isAuthenticated} from './apiUser';

const Login = (props) => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		redirect: false
	});

	const handleChange = name => e => {
		setValues({...values, [name]: e.target.value});
	}

	const handleSubmit = e => {
		e.preventDefault();
		const {email, password} = values;
		login(email, password).then(res => {
			authenticate(res.data, () => {
				console.log('logged in')
				props.history.push('/');
			});
		})
	}

	if(isAuthenticated()){
		return <Redirect to='/' />
	}

	return(
		<div className='container'>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
			  <div className="form-group">
			    <label htmlFor="exampleInputEmail1">Email address</label>
			    <input onChange={handleChange('email')} value={values.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
			  </div>
			  <div className="form-group">
			    <label htmlFor="password">Password</label>
			    <input onChange={handleChange('password')} value={values.password} type="password" className="form-control" id="password"/>
			  </div>
			  
			  <button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}

export default Login;