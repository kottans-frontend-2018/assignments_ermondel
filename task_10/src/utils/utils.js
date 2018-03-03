/**
 * The file corresponds to other files
 * search in other files and return the corresponding file.
 *  pack (Object) { file name to return: file names to search (separator ;) }
 *  e.g. const mypack = {'main': 'foo;bar;baz', etc.. }
 */
export function filesManyToOne(file_name, pack) {
	for (let k in pack) {
		const list = pack[k].split(';');
		if (list.indexOf(file_name) >= 0) return k;
	}
	return '';
}

/**
 * Timestamp to D Month Y
 * return e.g. '1 March 2018'
 */
export function D_Month_Y(timestamp) {
	const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	const date   = new Date(timestamp*1000);
	return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

/**
 * Convert celsius to fahrenheit
 */
export function temperatureCtoF(val) {
	return (val * 9/5 + 32).toFixed(2);
}