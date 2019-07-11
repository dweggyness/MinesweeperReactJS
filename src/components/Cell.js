import React from 'react'
import '../styles/Cell.css'

// component to render a singular cell

export default class Cell extends React.Component {
	constructor(props) {
		super(props)
		this._eventClick = this._eventClick.bind(this)
		this._eventRightClick = this._eventRightClick.bind(this)
	}

	_eventClick(e) {
		e.preventDefault()
		this.props.eventClick(this.props.x, this.props.y);
	}

	_eventRightClick(e) {
		e.preventDefault()
		this.props.eventRightClick(this.props.x, this.props.y)
	}

	render() {
		let content = this.props.flagged ? <i className="fa fa-flag-o" aria-hidden="true"></i> : ''
		let style = baseStyle;
		if (this.props.bombCount > 0) {
			content = this.props.bombCount
			switch (content) {
				case 1:
					style = Object.assign({}, style, {color: 'pink' })
					break
				case 2:
					style = Object.assign({}, style, {color: 'blue' })
					break
			}
		}

		if (this.props.flagged) {
			style = baseFlagStyle
			content = <i class="fa fa-flag" aria-hidden="true"></i>
		}

		if (this.props.open) {
			style = openStyle;
			if (this.props.bomb) { 
				style = Object.assign({}, style, {width:40, height:40, border: 'dashed 1px #a11515'})
				content = <i className="fa fa-bomb" aria-hidden="true"></i>
			}
			if (this.props.flagged && !this.props.bomb) { // flagged a clear cell
				style = falseFlagStyle
				content = <i className="fa fa-flag-o" aria-hidden="true"></i>
			}
		}


		return (
			<div 
				style={style}
				className="cell"
				onClick={this._eventClick}
				onContextMenu={this._eventRightClick}
			> 
				{content} {/*content of the cell*/}
			</div>
		)
	}
}

const baseStyle = {
	border: 'outset 3px #6ee093',
	width: 36,
	height: 36
}

const openStyle = {
	border: 'outset 1px #6ee093',
	width: 40,
	height: 40
}

const baseFlagStyle = {
	color: '#a11515',
	border: 'outset 3px #6ee093',
	width: 36,
	height: 36
}

const falseFlagStyle = {
	color: '#1F1F1F',
	border: 'dashed 1px #a11515',
	width: 40,
	height: 40
}