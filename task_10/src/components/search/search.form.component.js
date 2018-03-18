/**
 * Search Form Component
 * version 1.0
 * props
 *	onSubmit
 *	onChangePeriod
 *	onChangeUnit
 *	city
 *	period
 *	isCelsius
 */
import Component from '../../Component';

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			header: 'Weather forecast for the city up to 2 weeks',
			placeholder: 'e.g. New York',
		};
		this.inner     = document.createElement('div');
		this.inner.id  = 'header-inner';
		this.container = document.createElement('header');
		this.container.addEventListener('submit', this.handlerSubmit.bind(this));
		this.container.addEventListener('change', this.handlerChange.bind(this));
	}

	handlerSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(e.target.elements.city.value);
	}

	handlerChange(e) {
		if (e.target.type === 'radio') 
		{
			if (e.target.name === 'period') this.props.onChangePeriod(e.target.value);
			if (e.target.name === 'unit') this.props.onChangeUnit(e.target.value);
		}
	}

	render() {
		const { city }      = this.props;
		const { period }    = this.props;
		const { isCelsius } = this.props;

		return `
		<h1>${this.state.header}</h1>
		<form id="form">
			<div class="left">
				<div id="search-box">
					<label for="city" class="visuallyhidden" tabindex="0">Choose the city of your interest</label>
					<input type="text" name="city" id="city"${(city ? `value="${city}"` : `placeholder="${this.state.placeholder}"`)}required>
				</div>
				<div id="options">
					<div id="options-period">
						<label class="common-radio" tabindex="0">
							<input type="radio" name="period" value="1"${(period == 1 ? ` checked` : ``)} required>
							<span>day</span>
        				</label>
        				<label class="common-radio" tabindex="0">
            				<input type="radio" name="period" value="3"${(period == 3 ? ` checked` : ``)} required>
            				<span>3 days</span>
        				</label>
        				<label class="common-radio" tabindex="0">
            				<input type="radio" name="period" value="7"${(period == 7 ? ` checked` : ``)} required>
            				<span>week</span>
        				</label>
        				<label class="common-radio" tabindex="0">
            				<input type="radio" name="period" value="14"${(period == 14 ? ` checked` : ``)} required>
            				<span>2 weeks</span>
        				</label>
        			</div>
        			<div id="options-unit">
        				<label class="common-radio" tabindex="0">
            				<input type="radio" name="unit" value="celsius"${(isCelsius ? ` checked` : ``)} required>
            				<span>Celsius</span>
        				</label>
        				<label class="common-radio" tabindex="0">
            				<input type="radio" name="unit" value="fahrenheit"${(!isCelsius ? ` checked` : ``)} required>
            				<span>Fahrenheit</span>
        				</label>
        			</div>
        		</div>
			</div>
			<div class="right">
				<input type="submit" value="Submit" id="submit" tabindex="0">
			</div>
		</form>`;
	}
}

export default SearchForm;
