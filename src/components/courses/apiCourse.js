import axios from 'axios';
import queryString from 'query-string';

const url = 'https://online-courses-backend.herokuapp.com';

export const create = async (formData, userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.post(`${url}/courses/new/${userId}`, formData);
	return res;
} 

export const coursesList = async () => {
	const res = await axios.get(`${url}/courses`);
	return res;
}

export const courseShow = async (token, courseId) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.get(`${url}/courses/${courseId}`);
	return res;
}

export const updateCourse = async (formData, courseId, userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.put(`${url}/courses/update/${courseId}/${userId}`, formData);
	return res;
}

export const addLesson = async (courseId, userId, token, title, content, resource_url) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/courses/new/lesson/${courseId}/${userId}`, {
		title,
		content,
		resource_url
	});
	return res;
}

export const updateLesson = async (courseId, userId, token, title, content, resource_url, index) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/courses/update/${courseId}/${userId}/lesson`, {
		title,
		content,
		resource_url,
		index
	});
	return res;
}

export const publish = async (courseId, userId, token, published) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/courses/publish/${courseId}/${userId}`, {published});
	return res;
}

export const publishedCourses = async () => {
	const res = await axios.get(`${url}/courses/published`);
	return res;
}


export const createEnrol = async (courseId, userId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.post(`${url}/enrollments/new/${courseId}/${userId}`);
	return res;
}

export const getEnrollment = async (enrolId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

	const res = await axios.get(`${url}/enrollments/${enrolId}`);
	return res;
}

export const listByStudent = async (token, userId) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.get(`${url}/enrollments/learn-list/${userId}`);
	return res;
}

export const complete = async (lessonsStatusId, token, updatedData) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	console.log('updatedData', updatedData)
	const res = await axios.put(`${url}/enrollments/update-lesson-status`, {
		lessonsStatusId,
		updatedData
	})
	return res;
}

export const getStats = async (courseId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.get(`${url}/enrollments/stats/${courseId}`);
	return res;	
}

export const search = async (name) => {
	console.log(typeof name)
	const res = await axios.get(`${url}/courses/search`, {
		params: {
			name
		},
		paramsSerializer: params => {
			console.log(queryString.stringify(params));
			return queryString.stringify(params, {arrayFormat: 'repeat'});
		}
	});
	return res;
}