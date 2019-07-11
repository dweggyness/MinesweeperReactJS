let timerOn= false;
let timerTime = 0;

export const resetTimer = function() {
	timerTime= 0;
}

export const startTimer = function() {
	timerOn= true;
	if (timerOn === true) {
		setTimeout(function onTick(){
			timerTime += 1;
			startTimer();
		}, 1000);
	};
};

export const stopTimer = function() {
	timerOn= false;
};

export const curTime = function() {
	return timerTime;
};

// const gameTimer = 
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			timerOn: false,
// 			timerStart: 0,
// 			timerTime: 0
// 		}
// 	}

// 	startTimer() {
// 	  this.setState({
// 		  timerOn: true,
// 		  timerTime: this.state.timerTime,
// 		  timerStart: Date.now() - this.state.timerTime
// 	  });
// 	  this.timer = setInterval(() => {
// 		  this.setState({
// 	      timerTime: Date.now() - this.state.timerStart
// 		  });
// 	  }, 1000);
// 	}

// 	stopTimer() {
// 	  this.setState({ timerOn: false });
// 	  clearInterval(this.timer);
// 	};

// 	resetTimer() {
// 	  this.setState({
// 	    timerStart: 0,
// 	    timerTime: 0
// 	  });
// 	};

// 	testing() {
// 		console.log("HI")
// 	}

// 	render() {
// 		let seconds = ("0" + (Math.floor(this.state.timerTime / 1000) % 60)).slice(-2);
// 		let minutes = ("0" + (Math.floor(this.state.timerTime / 60000) % 60)).slice(-2);
// 		return (
// 	      <div id="timer">
// 	        {minutes}:{seconds}
// 	      </div>
// 	    );
// 	}
// }

