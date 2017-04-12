var http = require("http");
var cheerio = require("cheerio");
var url = "http://www.imooc.com/learn/348";

function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $(".chapter");
	// [{
	// 	chapterTitle:'',
	// 	vedios:[
	// 	{id:'',title:''}
	// 	]
	// },
	// {}
	// ]
	var chapterArr = [];
	chapters.each(function(item) {
		var chapterItem = {};
		chapterItem.vedios = [];
		chapterItem.chapterTitle = $(this).find("strong").text();
		chapterItem.chapterTitle = chapterItem.chapterTitle.match(/(\S.*\S)/g)[0];
		var vedios = $(this).find("li");
		vedios.each(function(item) {
			var vedioObj = {};
			var aObj = $(this).find("a");
			vedioObj.id = aObj.attr("href").split("/video/")[1];
			vedioObj.title = aObj.text();
			vedioObj.title = vedioObj.title.match(/(\S.*\S)/g);
			vedioObj.title = vedioObj.title[0] + vedioObj.title[1] + "";
			chapterItem.vedios.push(vedioObj);
		})
		chapterArr.push(chapterItem);
	})
	return chapterArr;
}

function renderHtml(obj) {
	obj.forEach(function(item) {
		var resultTit = item.chapterTitle + '\n';
		console.log(resultTit);
		var resultVedio = item.vedios;
		resultVedio.forEach(function(item) {
			console.log('	【' + item.id + '】' + item.title + '\n');
		})
	})
}

http.get(url,function(res) {
	var html = '';
	res.on('data',function(data) {
		html += data
	});
	res.on('end',function() {
		var chapters = filterChapters(html);
		renderHtml(chapters);
	})
}).on('error',function() {
	console.log('error');
})