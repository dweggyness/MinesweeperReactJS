(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var i=a(0),r=a.n(i),o=a(8),n=a.n(o),l=(a(15),a(2)),s=a(3),c=a(5),h=a(4),d=a(1),b=a(6),u=(a(16),a(17),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e)))._eventClick=a._eventClick.bind(Object(d.a)(a)),a._eventRightClick=a._eventRightClick.bind(Object(d.a)(a)),a}return Object(b.a)(t,e),Object(s.a)(t,[{key:"_eventClick",value:function(e){e.preventDefault(),this.props.eventClick(this.props.x,this.props.y)}},{key:"_eventRightClick",value:function(e){e.preventDefault(),this.props.eventRightClick(this.props.x,this.props.y)}},{key:"render",value:function(){var e=this.props.flagged?r.a.createElement("i",{className:"fa fa-flag-o","aria-hidden":"true"}):"",t=f;if(this.props.bombCount>0)switch(e=this.props.bombCount){case 1:t=Object.assign({},t,{color:"pink"});break;case 2:t=Object.assign({},t,{color:"blue"})}return this.props.flagged&&(t=g,e=r.a.createElement("i",{class:"fa fa-flag","aria-hidden":"true"})),this.props.open&&(t=m,this.props.bomb&&(t=Object.assign({},t,{width:40,height:40,border:"dashed 1px #a11515"}),e=r.a.createElement("i",{className:"fa fa-bomb","aria-hidden":"true"})),this.props.flagged&&!this.props.bomb&&(t=p,e=r.a.createElement("i",{className:"fa fa-flag-o","aria-hidden":"true"}))),r.a.createElement("div",{style:t,className:"cell",onClick:this._eventClick,onContextMenu:this._eventRightClick},e," ")}}]),t}(r.a.Component)),f={border:"outset 3px #6ee093",width:36,height:36},m={border:"outset 1px #6ee093",width:40,height:40},g={color:"#a11515",border:"outset 3px #6ee093",width:36,height:36},p={color:"#1F1F1F",border:"dashed 1px #a11515",width:40,height:40},v=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(s.a)(t,[{key:"renderCells",value:function(){for(var e=[],t=0;t<this.props.boardHeight;t++){for(var a=[],i=0;i<this.props.boardWidth;i++)a.push(r.a.createElement(u,{key:i+1e3*t,bomb:this.props.board[i][t].bomb,bombCount:this.props.board[i][t].bombCount,open:this.props.board[i][t].open,flagged:this.props.board[i][t].flagged,x:i,y:t,eventClick:this.props.eventClick,eventRightClick:this.props.eventRightClick}));e.push(a)}return e}},{key:"render",value:function(){return r.a.createElement("div",{className:"row"},this.renderCells())}}]),t}(r.a.Component),y={easy:{boardWidth:8,boardHeight:8,bombNum:10},hard:{boardWidth:30,boardHeight:16,bombNum:99}},C=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(h.a)(t).call(this,e))).difficulty=a.props.difficulty,a.state={board:a._initBoard(a.difficulty),gameOver:!1,victory:!1,flagCount:0,timerTime:0,timerOn:!1},a.cellClicked=a.cellClicked.bind(Object(d.a)(a)),a.cellRightClicked=a.cellRightClicked.bind(Object(d.a)(a)),a.gameTimer=setInterval(function(){if(!a.state.gameOver&&a.state.timerOn){var e=a.state.timerTime;a.setState({timerTime:e+1})}},1e3),a}return Object(b.a)(t,e),Object(s.a)(t,[{key:"_initBoard",value:function(e){var t=this._initBombs(e),a=y[e],i=a.boardWidth,r=a.boardHeight,o=Array.from(Array(i),function(){return Array(r).fill({bomb:!1,bombCount:0,open:!1,flagged:!1})});console.log(t);var n=!0,l=!1,s=void 0;try{for(var c,h=t[Symbol.iterator]();!(n=(c=h.next()).done);n=!0){var d=c.value;o[d[0]][d[1]]=Object.assign({},o[d[0]][d[1]],{bomb:!0})}}catch(b){l=!0,s=b}finally{try{n||null==h.return||h.return()}finally{if(l)throw s}}return o}},{key:"_initBombs",value:function(e){for(var t=[],a=y[e],i=a.boardWidth,r=a.boardHeight,o=a.bombNum;t.length<o;){var n=Math.floor(Math.random()*i),l=Math.floor(Math.random()*r),s=!1;if(0===t.length)t.push([n,l]);else{for(var c=0,h=t;c<h.length;c++){var d=h[c];if(d[0]===n&&d[1]===l){s=!0;break}}s||t.push([n,l])}}return t}},{key:"chgDifficulty",value:function(e){this.difficulty=e.target.textContent.toLowerCase(),this.setState({board:this._initBoard(this.difficulty),gameOver:!1,victory:!1,timerTime:0,timerOn:!1,flagCount:0})}},{key:"revealBombs",value:function(e,t,a){for(var i=0;i<t;i++)for(var r=0;r<e;r++)a[r][i].bomb&&!a[r][i].flagged&&(a[r][i]=Object.assign({},a[r][i],{open:!0})),a[r][i].flagged&&!a[r][i].bomb&&(a[r][i]=Object.assign({},a[r][i],{open:!0}));return a}},{key:"cellClicked",value:function(e,t){this.setState({timerOn:!0}),this.state.gameOver||this.openCell(e,t)}},{key:"cellRightClicked",value:function(e,t){this.state.gameOver||this.toggleFlag(e,t)}},{key:"openCell",value:function(e,t){var a=[].concat(this.state.board),i=y[this.difficulty],r=i.boardWidth,o=i.boardHeight;if(!a[e][t].open&&!a[e][t].flagged){a[e][t].bomb&&(this.setState({gameOver:!0}),a=this.revealBombs(r,o,a));for(var n=0,l=e-1;l<=e+1;l++)for(var s=t-1;s<=t+1;s++)l<0||l>=r||s<0||s>=o||l===e&&s===t||a[l][s].bomb&&n++;if(a[e][t]=Object.assign({},a[e][t],{open:!0,bombCount:n}),this.setState({board:a}),this._isClear(a)&&this.setState({gameOver:!0,victory:!0}),0===n&&!a[e][t].bomb)for(l=e-1;l<=e+1;l++)for(s=t-1;s<=t+1;s++)l<0||l>=r||s<0||s>=o||l===e&&s===t||this.openCell(l,s)}}},{key:"toggleFlag",value:function(e,t){var a=[].concat(this.state.board);if(!a[e][t].open){var i=a[e][t].flagged;a[e][t]=Object.assign({},a[e][t],{flagged:!i});var r=this.state.flagCount;a[e][t].flagged?r++:r--,this.setState({flagCount:r})}}},{key:"_isClear",value:function(e){for(var t=0,a=y[this.difficulty],i=a.boardWidth,r=a.boardHeight,o=a.bombNum,n=0;n<r;n++)for(var l=0;l<i;l++)e[l][n].open&&(t+=1);return t===i*r-o}},{key:"render",value:function(){var e=this,t=y[this.difficulty],a=t.boardWidth,i=t.boardHeight,o=42*a,n=t.bombNum-this.state.flagCount,l=("0"+Math.floor(this.state.timerTime)%60).slice(-2),s=("0"+Math.floor(this.state.timerTime/60)%60).slice(-2),c="";return!0===this.state.victory?c=r.a.createElement("p",null,"Victory!"):!0===this.state.gameOver&&(c=r.a.createElement("p",null,"You lost :(")),r.a.createElement("div",{id:"main",style:{width:o}},r.a.createElement("section",{id:"header"},r.a.createElement("h1",null," Minesweeper "),r.a.createElement("p",null,"New / Reset Game"),r.a.createElement("button",{className:"easyButton",onClick:function(t){return e.chgDifficulty(t)}},"Easy"),r.a.createElement("button",{className:"hardButton",onClick:function(t){return e.chgDifficulty(t)}},"Hard")),r.a.createElement("section",{id:"board"},r.a.createElement(v,{board:this.state.board,boardWidth:a,boardHeight:i,eventClick:this.cellClicked,eventRightClick:this.cellRightClicked})),r.a.createElement("section",{id:"footer"},r.a.createElement("div",null," ",n,"  ",r.a.createElement("i",{className:"fa fa-bomb","aria-hidden":"true"})),r.a.createElement("div",null,c),r.a.createElement("div",null,s,":",l)))}}]),t}(r.a.Component);n.a.render(r.a.createElement(C,{difficulty:"easy"}),document.getElementById("root"))},9:function(e,t,a){e.exports=a(18)}},[[9,1,2]]]);
//# sourceMappingURL=main.06bd60cc.chunk.js.map