import axios from 'axios';
import qs from 'qs';

export const consumers = {
	list() {
		return axios.get('/api/consumers');
	},
	listByType(type) {
		if (!type) return this.list();

		return axios.get(`/api/consumers/${type}`);
	},
	get(id) {
		return axios.get(`/api/consumer/${id}`);
	},
	add(consumer) {
		return axios.post('/api/consumer/', qs.stringify(consumer));
	},
	delete(id) {
		return axios.delete(`/api/consumer/${id}`);
	},
	getStats(id, year = undefined) {
		return axios.get(`/api/monthly_statistics/${id}`, { params: { year }});
	}
};
