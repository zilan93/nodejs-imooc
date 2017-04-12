var http = require("http");
var querystring = require("querystring");

var postData = querystring.stringify({
	'content':'nodejs测试',
	'mid':8837
});

var options = {
	hostname:'www.imooc.com',
	port:80,
	path:'/course/docomment',
	method:'POST',
	headers: {
	'Accept':'application/json, text/javascript, */*; q=0.01',
	'Accept-Encoding':'gzip, deflate',
	'Accept-Language':'zh-CN,zh;q=0.8',
	'Connection':'keep-alive',
	'Content-Length':postData.length,
	'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	'Cookie':'imooc_uuid=d9c3b53d-32fb-43d6-bf06-75ce12782c8f; imooc_isnew_ct=1491458959; PHPSESSID=um7etp3j6qeu0kh14kl9k4of60; loginstate=1; apsid=M1NGQ1YjdjZDMxMzJlMzQ1YjYxNWMxNjJiMzM2NzcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTE4MTExNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxOTU3ODY5Njg0QHFxLmNvbQAAAAAAAAAAAAAAAAAAADQ0NGI5ZmJkODdjMmZlMjQ3NTg4YzI4MjAxNzBmY2U33vLtWN7y7Vg%3DNG; last_login_username=1957869684%40qq.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1491958535,1491962788,1491967574,1491988913; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1491989225; imooc_isnew=2; cvde=58ed7c4117efd-138',
	'DNT':'1',
	'Host':'www.imooc.com',
	'Origin':'http://www.imooc.com',
	'RA-Sid':'B75E7373-20150710-144303-916bfa-3829eb',
	'RA-Ver':'3.0.8',
	'Referer':'http://www.imooc.com/video/8837',
	'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
	'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options,function(res) {
	console.log('Status: ' + res.statusCode);
	console.log('headers: ' + JSON.stringify(res.headers));

	res.on('data',function(chunk) {
		console.log('评论完毕！');
	});
	req.on('error',function(e) {
		console.log('Error: ' + e.message);
	});
});
req.write(postData);
req.end();