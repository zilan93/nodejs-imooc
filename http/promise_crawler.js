var http = require("http");
var cheerio = require("cheerio");
var Promise = require("bluebird");
var url = "http://www.imooc.com/learn/348";
var baseUrl = "http://www.imooc.com/learn/";
var videoIds = [728,637,348,259,197,134,75];

function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $(".chapter");
	var title = $(".course-infos h2").text().trim();
	var number = parseInt($(".course-infos .js-learn-num").text().trim(),10);
	//{
	//title:'',
	//number:'',
	// vedios: [{
	// 	chapterTitle:'',
	// 	cVideos:[
	// 	{id:'',title:''}
	// 	]
	// }
	// ]
	// }
	var chapterObj = {
		title:title,
		number:number,
		videos:[]
	};
	chapterObj.title = title;
	chapterObj.number = number;
	chapters.each(function(item) {
		var chapterItem = {};
		chapterItem.cVideos = [];
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
			chapterItem.cVideos.push(vedioObj);
		})
		chapterObj.videos.push(chapterItem);
	})
	return chapterObj;
}

function renderHtml(datas) {
	//datas是数组，数组里面保存的是对象；
	datas.forEach(function(courseData) {
		console.log(courseData);
		console.log(courseData.number + "人学过" + courseData.title + "\n");

		datas.forEach(function(courseData) {
			//打印总标题
			console.log('###' + courseData.title + '\n');
			courseData.videos.forEach(function(item) {
				var resultTit = item.chapterTitle + '\n';
				console.log(resultTit);
				var resultVedio = item.cVideos;
				resultVedio.forEach(function(item) {
					console.log('	【' + item.id + '】' + item.title + '\n');
				})
			})
		})
	})
}

//通过get()方法请求html页面;
function getPageAsync(url) {
	return new Promise(function(resolve,reject) {
		console.log("正在爬取" + url);
		setTimeout(function() {
			http.get(url,function(res) {
				var html = '';
				res.on('data',function(data) {
					html += data
				});
				res.on('end',function() {
					resolve(html);
				//var chapters = filterChapters(html);
				//renderHtml(chapters);
			})
			}).on('error',function(e) {
				reject(e);
				console.log('error');
			})
		},1000);
	})
}

//fetchCourseArray里保存的是抓取的所有的html代码
var fetchCouseArray = [];
videoIds.forEach(function(id) {
	fetchCouseArray.push(getPageAsync(baseUrl + id));
})

Promise.all(fetchCouseArray).then(function(pages) {
	var coursesData = [];
	pages.forEach(function(html) {
		//courses里保存的是单个url里的处理过的内容对象
		var courses = filterChapters(html);
		coursesData.push(courses);
	})

	coursesData.sort(function(a,b) {
		return a.number < b.number;
	})

	renderHtml(coursesData);
})