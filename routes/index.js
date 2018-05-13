var express = require('express');
var router = express.Router();
var baseDAO = require('../dao/BaseDAO');
var multiparty = require('multiparty');

/* GET home page. */
router.all('/*', function(req, res, next) {
    console.log(req.baseUrl,req.baseUrl.split("/"));
    var param;
    if(req.method.toUpperCase() == "GET"){
        param = req.query;
    }else{
        param = req.body;
    }
    for(k in param){
        var v = param[k];
        if(typeof(v) == "string" && v.length >= 2 && (/^\[.*\]$/.test(v) || /^\{.*\}$/.test(v))){
            try{
                param[k] = JSON.parse(param[k]);
            }catch(e){}
        }
    }
    var pathes = req.baseUrl.split(/\/+/);

    if(pathes.length > 0){

        if(pathes[0] == ''){

            pathes.shift();
        }
        console.log("路径：" + pathes);
        if(pathes[0].toLowerCase() == "upload"){
            upload(req,res);
        }else if(pathes[0] == "getSession"){
            getSession(req,res);
        }else if(pathes[0] == "logout"){
            logout(req,res);
        }else if(pathes.length == 2){
            var addSession = param.addSession;
            delete param.addSession;
            baseDAO.reduce(pathes[0],pathes[1],param,function(data){
                if(addSession){
                    req.session.data = data.length > 0 ? data[0]:data;
                }
				
				console.log("返回的消息");
				console.log(data);
                res.send(data);
            });
        }else{
            console.error("error:请求的路径不正确");
            res.send("error:请求的路径不正确");
        }
    }else{
        console.error("error:请求的路径不正确");
        res.send("error:请求的路径不正确");
    }


});

var upload = function(req,res){
    var form=new multiparty.Form({uploadDir:'./public/img'});
	console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
	console.log(req.body);
    form.parse(req,function(err,fields,files){
        if(err){
            res.send(err);
        }else{

            var path=files.file[0].path.substring(files.file[0].path.indexOf("images"));
            res.send(path);
        }
    });
}

var getSession = function(req,res){
    var data = req.session.data;
    if(data){
        res.send(data);
    }else{
        res.send({});
    }
}

var logout = function(req,res){
    req.session.data  = null;
    res.send("suc");
}

module.exports = router;
