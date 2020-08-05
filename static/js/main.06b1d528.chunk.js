(this["webpackJsonptic-tac-toe-react"]=this["webpackJsonptic-tac-toe-react"]||[]).push([[0],{14:function(e,t,r){},8:function(e,t,r){e.exports=r(9)},9:function(e,t,r){"use strict";r.r(t);var a=r(7),n=r(1),s=r(2),i=r(4),u=r(3),o=r(0),c=r.n(o),l=r(6),h=r.n(l);r(14);function m(e){return c.a.createElement("button",{className:"square",onClick:e.onClick},e.value)}var d=function(e){Object(i.a)(r,e);var t=Object(u.a)(r);function r(){return Object(n.a)(this,r),t.apply(this,arguments)}return Object(s.a)(r,[{key:"renderSquare",value:function(e){var t=this;return c.a.createElement(m,{value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"board-row"},this.renderSquare(0),this.renderSquare(1),this.renderSquare(2)),c.a.createElement("div",{className:"board-row"},this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)),c.a.createElement("div",{className:"board-row"},this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)))}}]),r}(c.a.Component),v=function(e){Object(i.a)(r,e);var t=Object(u.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e)).state={started:!1,history:[{squares:Array(9).fill(null),location:null}],stepNumber:0,xIsNext:!0},a}return Object(s.a)(r,[{key:"handleClick",value:function(e){this.state.started||this.startGame();var t=this.state.history.slice(0,this.state.stepNumber+1),r=t[t.length-1].squares.slice();f(r)||r[e]||(r[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:r,location:e}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"startGame",value:function(){this.setState({started:!0})}},{key:"getHistory",value:function(){return this.state.history}},{key:"getBoard",value:function(e){return this.state.history[e]}},{key:"getCurrentBoard",value:function(){return this.state.history[this.state.stepNumber]}},{key:"getCoordinate",value:function(e){return function(e){for(var t=[[0,1,2],[3,4,5],[6,7,8]],r=e%3,a=0,n=0;n<t.length;n++)t[n].includes(e)&&(a=n);return"(".concat(r,", ").concat(a,")")}(this.getBoard(e).location)}},{key:"render",value:function(){var e,t=this,r=this.getHistory(),a=this.getCurrentBoard(),n=f(a.squares);e=n?"Winner: "+n:"Next player: "+(this.state.xIsNext?"X":"O");var s=r.map((function(e,r){var a=t.getCoordinate(r),n=r?"Go to move #"+r+": at "+a:"Go to game start";return c.a.createElement("li",{key:r},c.a.createElement("button",{onClick:function(){return t.jumpTo(r)}},n))}));return c.a.createElement("div",{className:"game"},c.a.createElement("div",{className:"game-board"},c.a.createElement(d,{squares:a.squares,onClick:function(e){return t.handleClick(e)}})),c.a.createElement("div",{className:"game-info"},c.a.createElement("div",null,e),c.a.createElement("ol",null,s)))}}]),r}(c.a.Component);function f(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],r=0;r<t.length;r++){var n=Object(a.a)(t[r],3),s=n[0],i=n[1],u=n[2];if(e[s]&&e[s]===e[i]&&e[s]===e[u])return e[s]}return null}h.a.render(c.a.createElement(v,null),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.06b1d528.chunk.js.map