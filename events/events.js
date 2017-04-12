var EventEmitter = require("events").EventEmitter;
var life = new EventEmitter();

//事件监听
life.on("点击",function(something) {
	console.log('点击' + something);
})
var hasConfortListener = life.emit("点击",'屏幕');
console.log(hasConfortListener);