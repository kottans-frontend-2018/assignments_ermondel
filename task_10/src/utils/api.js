/**
 * API weatherbit
 * version 1.4
 */
const API_KEY  = '351954d3a30a4b60ad716f1c73cc43ee';
const BASE_URL = 'api.weatherbit.io/v2.0/forecast/daily';
const CACHE_EXPIRY = 21600;
var api_cache  = [];

const get = query => {
	const protocol = window.location.protocol === 'https:' ? 'https://' : 'http://';
	const url = `${protocol}${BASE_URL}?key=${API_KEY}&lang=en&units=M&days=16${query}`;
	
	return fetch(url).then(response => {
		if (response.status == 200) {
			return response.json();
		}

		throw new Error('No forecast available.');
	}).then(data => {
		data.timestamp = Math.floor(Date.now() / 1000);
		api_cache.unshift(data);
		return data;
	});
};

export const getForecast = city => {
	const valid = city.search(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/) >= 0 ? true : false;
	const ctime = Math.floor(Date.now() / 1000);
	if (valid) {
		// search city in cache
		for (let data of api_cache) {
			if (city.toLowerCase() === data.city_name.toLowerCase()) {
				if (ctime - data.timestamp < CACHE_EXPIRY) {
					return new Promise((resolve) => resolve(data));
				}
			}
		}
		// city not found in cache
		return get(`&city=${city}`);
	}
	// invalid city name
	return new Promise(() => {
  		throw new Error('No forecast available.');
	});
};
