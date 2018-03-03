/**
 * ForecastHeader.js
 * version 1.0
 */
class ForecastHeader {
	constructor(props) {
		this.state = {
			valid: true,
			data: {},
			favorite: false,
		};
		this.props = props;
		this.container = document.createElement('div');
		this.container.id = 'forecast-header';
		this.container.addEventListener('change', this.handleChange.bind(this));
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		return this.render();
	}

	render() {
		if (this.state.valid && this.state.data.city_name) {
			this.container.innerHTML = `
				<label><input type="checkbox" name="favorite" id="favorite"${(this.state.favorite ? ' checked' : '')}>
				<span><span>favorite city</span></span></label>
				<h1>${this.state.data.city_name}</h1>`;
			return this.container;
		}
		return '';
	}

	handleChange(e) {
		if (this.state.valid && this.state.data.city_name) {
			if (e.target.checked) {
				this.props.onAddFavorite(this.state.data.city_name);
			} else {
				this.props.onDelFavorite(this.state.data.city_name);
			}
		}
	}
}

export default ForecastHeader;
