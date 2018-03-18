/**
 * Storage History Component
 * version 1.0
 * props
 *	history
 *	onClickStorage
 *	onDelHistory
 */
import Component from '../../Component';

class StorageHistory extends Component {
	constructor(props) {
		super(props);

		this.container = document.createElement('div');
		this.container.id = 'history';
		this.container.addEventListener('click', this.handleClick.bind(this));
	}

	handleClick(e) {
		if (e.target.nodeName === 'LI') this.props.onClickStorage(e.target.textContent);
		if (e.target.nodeName === 'BUTTON' && e.target.name === 'historyclear') this.props.onDelHistory();
	}

	render() {
		const history = this.props.history.length ? this.props.history : null;

		const list = history ? '<ul>' + history.map(value => `<li>${value}</li>`).join('') + '</ul>' : '';

		return `
		<div class="topbox">
			<h3>&#10226; History</h3>
			<button name="historyclear"${(!list ? ' disabled' : '')}>Clear all</button>
		</div>
		${list}`;
	}
}

export default StorageHistory;
