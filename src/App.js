import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './components/style.css';

import Home from './components/Main/Home';
import Navbar from './components/Main/Navbar';
import Login from './components/users/Login';
import Register from './components/users/Register';

import PrivateRoute from './components/Main/PrivateRoute';

import CourseForm from './components/courses/CourseForm';
import CourseEdit from './components/courses/CourseEdit';
import CoursesList from './components/courses/CoursesList';
import CourseShow from './components/courses/CourseShow';
import PublishedCourses from './components/courses/PublishedCourses';
import LearnPage from './components/courses/LearnPage';
import EnrolledList from './components/courses/EnrolledList';

function App() {
  return (
    <div className="App">
    	<Navbar/>
      <Switch>
      	<Route exact path='/' component={Home} />
        <Route exact path='/courses' component={CoursesList} />
      	<Route exact path='/login' component={Login} />
      	<Route exact path='/register' component={Register} />

        {/*Courses Routes*/}
        {/*<PrivateRoute exact path='/courses/published' component={PublishedCourses} />*/}
        <PrivateRoute exact path='/course/new/:userId' component={CourseForm} />
        <PrivateRoute exact path='/course/edit/:courseId' component={CourseEdit} />
        <PrivateRoute exact path='/teach/course/:courseId' component={CourseShow} />
        <PrivateRoute exact path='/learn/list/:userId' component={EnrolledList} />
        <PrivateRoute exact path='/learn/:enrolId' component={LearnPage} />

      </Switch>
    </div>
  );
}

export default App;
