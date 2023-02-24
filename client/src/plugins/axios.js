import axios from 'axios';

const api = axios.create(
	{ baseURL: "http://localhost:3001/api/" }
);

export default {
	install: (app) => {
		app.config.globalProperties.$axios = api;
	}
};