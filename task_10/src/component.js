/**
 * component.js
 * version 1.4
 */
class Component {
	constructor(props) {
		this.state = {};
		this.props = props || {};
		this.container = null;
		this.inner = null;
	}

	updateState(nextState) {
		this.onBeforeUpdate(nextState);
		this.state = Object.assign({}, this.state, nextState);
		this.onAfterUpdate(nextState);
		return this.display();
	}

	update(nextProps) {
		this.props = Object.assign({}, this.props, nextProps);
		return this.display();
	}

	display() {
		const html = this.render();

		this.container.innerHTML = '';

		let box = this.inner || this.container;

		if (typeof html === 'string') {
      		box.innerHTML = html;
    	} else if (Array.isArray(html)) {
    		for (let elem of html) elem && box.appendChild(elem);
    	} else {
      		box.appendChild(html);
    	}

		this.inner && this.container.appendChild(box);
		
		return this.container;
	}

	//
	render() {}

	onAfterUpdate(nextState) {}

	onBeforeUpdate(nextState) {}
}

export default Component;
