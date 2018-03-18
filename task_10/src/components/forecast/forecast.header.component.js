/**
 * Forecast Header Component
 * version 1.0
 * props
 *	valid
 *	city
 *	favorite
 *	waiting
 *	onAddFavorite
 *	onDelFavorite
 */
import Component    from '../../Component';

class ForecastHeader extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
		this.container.id = 'forecast-header';
		this.container.addEventListener('change', this.handleChange.bind(this));
	}

	handleChange(e) {
		const city = this.props.city || '';

		if (city) 
		{
			if (e.target.checked) 
			{
				this.props.onAddFavorite(city);
			} else 
			{
				this.props.onDelFavorite(city);
			}
		}
	}

	render() {
		const { valid }   = this.props;
		const { waiting } = this.props;
		const city        = this.props.city || '';
		const favorite    = this.props.favorite || false;

		if (valid && city && !waiting) {
			return `
			<label><input type="checkbox" name="favorite" id="favorite"${(favorite ? ' checked' : '')}>
			<span><span>favorite city</span></span></label>
			<h1>${city}</h1>`;
		}
		return '';
	}
}

export default ForecastHeader;
