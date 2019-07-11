import React from 'react'
import Cell from './Cell'

// step one, render a 10x10 board

// component to render all the cells
// state stored in a 2D array [[],[],[]] [x][y]

export default class Board extends React.Component {
	renderCells() {
		const rows = []
		for (var y=0; y<this.props.boardHeight;y++) {
			const columns = []
			for (var x=0; x<this.props.boardWidth;x++) {
				columns.push(
					<Cell
						key={x + y*1000}
						bomb= {this.props.board[x][y].bomb}
						bombCount= {this.props.board[x][y].bombCount}
						open= {this.props.board[x][y].open}
						flagged= {this.props.board[x][y].flagged}
						x={x}
						y={y}
						eventClick={this.props.eventClick}
						eventRightClick={this.props.eventRightClick}
					/>
				)
			}
			rows.push(columns);
		}
		return rows
	}
	render() {
		return (
			<div className="row">
				{this.renderCells()}
			</div>
		)
	}
}

		// const rows = [];
		// for (var y=0; y<this.props.boardHeight;y++){
		// 	const column = [];
		// 	for(var x=0; x<this.props.boardWidth;x++){
		// 		column.push(
		// 			<Cell 
		// 				key={x + y*100}
		// 				x={x}
		// 				y={y}
		// 				eventClick={this.props.eventClick}
		// 				eventRightClick={this.props.eventRightClick}
		// 			/>
		// 		)
		// 	}
		// 	rows.push(column)
		// }
		// return rows	{ bomb: false, bombCount: 0, open: false, flagged: false }))