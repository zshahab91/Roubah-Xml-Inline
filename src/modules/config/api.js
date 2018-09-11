import axios from "axios";
import env from "./env";


let instance = null;
class Api {
	constructor(options) {
		if (instance == null) {
			instance = this;
		}
		return instance;
	}

	static createApi(options = {}) {
		let data   = typeof (options.data) !== "undefined" ? options.data : {};
		let config = typeof (options.config) !== "undefined" ? options.config : {};


		let AxiosInc = axios.create({
			baseURL: env.url,
			timeout: 1000,
			headers: {},
		});

		AxiosInc.headers = {...AxiosInc.headers, config};

		let s = AxiosInc[options.method](options.url, data)
			.then(function (response) {
				return response;
			})
			.catch(function (error) {
				throw error;
			});

		return new Promise((resolve, reject) => {
			setTimeout(function () {
				resolve(s);
			}, 0);
		});
	};

	static get(options) {
		return Api.createApi({...options, method: "get"});
	};

	static post(options) {
		return Api.createApi({...options, method: "post"});
	};

	static put(options) {
		return Api.createApi({...options, method: "put"});
	};

	static delete(options) {
		return Api.createApi({...options, method: "delete"});
	};

	static patch(options) {
		return Api.createApi({...options, method: "patch"});
	};
}
export default  Api;