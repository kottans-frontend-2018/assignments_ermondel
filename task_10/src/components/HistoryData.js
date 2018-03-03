/**
 * History
 * local storage
 * version 1.2
 */
class HistoryData {
	constructor(props) {
		this.props = props;
		this.state = {
			data: JSON.parse(localStorage.getItem(this.props.prefix+'-history')) || [],
		};
		this.container = document.createElement('div');
		this.container.id = 'history';
		this.container.addEventListener('click', this.handleClick.bind(this));
	}

	updateState(nextState) {
		this.state = Object.assign({}, this.state, nextState);
		this.onAfterUpdate(nextState);
		return this.render();
	}

	onAfterUpdate(nextState) {
		if (nextState.add && nextState.add.length) 
		{
			if (this.state.data.indexOf(nextState.add) < 0) this.state.data.push(nextState.add);
		}
		if (nextState.del && nextState.del.length) 
		{
			const pos = this.state.data.indexOf(nextState.del);
			if (pos >= 0) this.state.data.splice(pos, 1);
		}
	}

	render() {
		const list = this.state.data.length > 0 ? '<ul>' + 
		this.state.data.slice().reverse().map(value => `<li>${value}</li>`).join('') + '</ul>' : '';

		this.container.innerHTML = `
		<div class="topbox">
			<h3>&#10226; History</h3>
			<button name="historyclear"${(!list ? ' disabled' : '')}>Clear all</button>
		</div>
		${list}`;

		return this.container;
	}

	handleClick(e) {
		if (e.target.nodeName === 'LI') this.props.onClickHistory(e.target.textContent);
		if (e.target.nodeName === 'BUTTON' && e.target.name === 'historyclear') this.props.onClearHistory();
	}

	check(value) {
		return (this.state.data.indexOf(value) < 0) ? false : true;
	}

	unload() {
		localStorage.setItem(this.props.prefix+'-history', JSON.stringify(this.state.data.slice(-this.props.limit)));
	}
}

export default HistoryData;
