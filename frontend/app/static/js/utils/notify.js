import Vue from 'vue';

export const warn = msg => {
	Vue.notify({
		title: 'Warning',
		type: 'warn',
		text: msg
	});
};

export const error = msg => {
	Vue.notify({
		title: 'Error',
		type: 'error',
		text: msg
	});
};

export const success = msg => {
	Vue.notify({
		title: 'Success',
		type: 'success',
		text: msg
	});
};
