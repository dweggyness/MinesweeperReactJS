import React from 'react';
import '../styles/Game.css';
import Board from './Board';
import difficultyConfig from '../difficultyConfig';

// game logic component, using 'Board' to render

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.difficulty = this.props.difficulty; // bad practice
		this.state = { 
			board: this._initBoard(this.difficulty),
			gameOver: false,
			victory: false,
			flagCount: 0,
			timerTime: 0,
			timerOn: false,
		}

		this.cellClicked = this.cellClicked.bind(this)
		this.cellRightClicked = this.cellRightClicked.bind(this)
		this.gameTimer = setInterval(() => {
			if (!this.state.gameOver && this.state.timerOn) {
				const {timerTime} = this.state;
				this.setState({ timerTime: timerTime + 1});
			}
		}, 1000);
	}

	_initBoard(difficulty) {
		const bombPlaces = this._initBombs(difficulty)
		const {boardWidth, boardHeight} = difficultyConfig[difficulty]
		const board = Array.from( Array(boardWidth), () => Array(boardHeight).fill(
			{ bomb: false, bombCount: 0, open: false, flagged: false }))

		console.log(bombPlaces)
		for (let bomb of bombPlaces) {
			board[bomb[0]][bomb[1]] = Object.assign({}, board[bomb[0]][bomb[1]], { bomb: true })
		}
		return board
	}

	_initBombs(difficulty) {
		const bombPlaces = []
		const {boardWidth, boardHeight, bombNum} = difficultyConfig[difficulty]
		while(bombPlaces.length < bombNum) {
			const x = Math.floor(Math.random() * boardWidth)
			const y = Math.floor(Math.random() * boardHeight)

			let duplicate = false;
			if (bombPlaces.length === 0) {
				bombPlaces.push([x,y])
			} else {
		        for (let bomb of bombPlaces) {
		        	if (bomb[0] === x && bomb[1] === y) {
		        		duplicate = true;
		        		break;
		        	}
		        }
		        if (!duplicate) {
		        	bombPlaces.push([x,y])
		        }
			}
		}
		return bombPlaces
	}

	chgDifficulty(e) {
		this.difficulty = e.target.textContent.toLowerCase() // pretty sure this is bad practice -- mutation
		this.setState({ board: this._initBoard(this.difficulty), 
						gameOver: false,
						victory: false,
						timerTime: 0,
						timerOn: false,
						flagCount: 0 })
	}

	revealBombs(boardWidth,boardHeight, board) {
		for (var y=0; y<boardHeight;y++) {
			for (var x=0; x<boardWidth;x++) {
				if (board[x][y].bomb && !board[x][y].flagged) { // open unflagged bombs
					board[x][y] = Object.assign({}, board[x][y], { open: true })
				}
				if (board[x][y].flagged && !board[x][y].bomb) { // empty cells that were flagged
					board[x][y] = Object.assign({}, board[x][y], { open: true })
				}
			}
		}
		return board
	}

	cellClicked(x, y) {
		this.setState({ timerOn: true })
		if (this.state.gameOver) { // check if game is already over
			return
		}
		this.openCell(x, y)
	}

	cellRightClicked(x, y) {
		if (this.state.gameOver) { // check if game is already over
			return
		}
		this.toggleFlag(x, y)
	}

	openCell(x, y) {

		let board = [].concat(this.state.board)
		const { boardWidth, boardHeight } = difficultyConfig[this.difficulty]

		if (!board[x][y].open && !board[x][y].flagged) { // not opened and unflagged

			if (board[x][y].bomb) { // bomb pressed
				this.setState({ gameOver: true }); // not the best way of doing things but idk how to do otherwise
				board = this.revealBombs(boardWidth,boardHeight,board)
			}

			let bombCount = 0 // check neighbours for number of bombs
			for(var i= x-1;i <= x+1; i++) {
				for(var j= y-1;j <= y+1; j++) {
					if ((i < 0 || i >= boardWidth) || 
						(j < 0 || j >= boardHeight) || 
						(i === x && j === y)) { // make sure the neighbour is not out of bounds
						continue
					}
					if (board[i][j].bomb) {
						bombCount++;
					}
				}
			}
			board[x][y] = Object.assign({}, board[x][y], {open: true, bombCount: bombCount})
			this.setState({board}) // update board

			if (this._isClear(board)) { // victory!
				this.setState({ gameOver: true, victory: true});
			}

			if (bombCount === 0 && !board[x][y].bomb) { // floodfill function if it is a '0' cell
				for (i= x-1; i <= x+1; i++) {
					for(j= y-1;j <= y+1; j++) {
						if ((i < 0 || i >= boardWidth) || 
							(j < 0 || j >= boardHeight) || 
							(i === x && j === y)) { 
							continue
						}
						this.openCell(i, j) //recursive call for floodfill function
					}
				}
			}
		}
	}

	toggleFlag(x, y) {
		const board = [].concat(this.state.board)
		if (board[x][y].open) { // don't flag if its an open tile
			return
		}
		const {flagged} = board[x][y]
		board[x][y] = Object.assign({}, board[x][y], {flagged: !flagged})

		let flagCount = this.state.flagCount
		board[x][y].flagged ? flagCount++ : flagCount--

		this.setState({flagCount: flagCount})
	}

	_isClear(board){
		let count = 0
		const {boardWidth, boardHeight, bombNum} = difficultyConfig[this.difficulty]
		for (var y=0; y<boardHeight;y++) {
			for (var x=0; x<boardWidth;x++) {
				if (board[x][y].open) {
					count += 1
				}
			}
		}

		return (count === boardWidth * boardHeight - bombNum);
	}

	render(){
		const {boardWidth, boardHeight, bombNum} = difficultyConfig[this.difficulty]
		const _boardWidth = 42 * boardWidth // the width of the entire thing

		const bombsRemaining = bombNum - this.state.flagCount

		let seconds = ("0" + (Math.floor(this.state.timerTime) % 60)).slice(-2);
		let minutes = ("0" + (Math.floor(this.state.timerTime / 60) % 60)).slice(-2);

		let gameEndText = ""
		if (this.state.victory === true){
			gameEndText = <p>Victory!</p>
		} else if (this.state.gameOver === true){
			gameEndText = <p>You lost :(</p>
		}



		return (
			<div id="main" style={{ width: _boardWidth}}>
				<section id="header">
					<h1> Minesweeper </h1>
					<p>New / Reset Game</p>
					<button className="easyButton" onClick={(e) => this.chgDifficulty(e)}>Easy</button>
					<button className="hardButton" onClick={(e) => this.chgDifficulty(e)}>Hard</button>
				</section>
				<section id="board">
					<Board
						board={this.state.board}
						boardWidth={boardWidth}
						boardHeight={boardHeight}
						eventClick={this.cellClicked}
						eventRightClick= {this.cellRightClicked}
					/>
				</section>
				<section id="footer">
					<div> {bombsRemaining}  <i className="fa fa-bomb" aria-hidden="true"></i>
					</div>
					<div>
						{gameEndText}
					</div>
					<div>
						{minutes}:{seconds}
					</div>
				</section>
			</div>
		)
	}
}




export default Game

/* bad practices count : 2x
*/