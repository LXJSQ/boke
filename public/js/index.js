var first_article=0;
$(function () {
    var img=$("main .ad_wrap .ad_wrap_img");
    var  title_span="";
    var istop=true;
    var isleft=true;
    var x=20;
    var y=-280;
    var i = 0;
    $.ajax({
        type:'post',
        url:'it_article/find',
        data:{
            type:'it_article',
        },
        success:function(data){
            for(let i=0;i<data.length;i++){
                $("<li><i>"+(i+1)+"</i><a href='it-article.html?id="+data[i].id
                  +"&type="+data[i].type+"'>"+data[i].article_title+"</a></li>").appendTo("#article_title")
            };
        },
    })
    $.ajax({
        type:"post",
        url:"everydaySentence/find",
        data:{},
        success:function(data){
            title_span=data[0].content;
            $("#sentence_author").html("-&nbsp;-by&nbsp;&nbsp;" +data[0].author)
        }
    })
    $.ajax({
        type:'post',
        url:"readTimes/find",
        data:{},
        success:function(data){
           first_article=data[0].index_first_article
        }
    })
    initBook();
    initLifeLog();
    initIt_article();
    
    setInterval(function () {
        $("#border").fadeOut(200,function(){
            $("#title_span ").text(title_span.substr(0, ++i))
            $(this).fadeIn(200);
        })
    }, 600);
    $(".ad_wrap h2").fadeIn(1000,function(){
        $(this).fadeOut(1000,function(){
            $(this).fadeIn(1000);
        })
    });
    $(".ad_wrap h4").fadeIn(2000);

    setInterval(function(){
        if(y>=-108){
            istop=false;
        }
        if(y<=-346){
            istop=true;
        }
        if(istop){
            img.css("top",y++ +"px")
        }else{
            img.css("top",y-- +"px")
        }
        if(x>1000){
            isleft=false;
        }
        if(x<0){
            isleft=true;
        }
        if(isleft){
            img.css("right",x++)
        }else{
            img.css("right",x--)
        }
        initTime();
    },10);
    
    var g=0;
    setInterval(function(){
        
        img.find("img").css("transform","rotate("+ g++ +"deg)")
        
    },20);
    setInterval(function(){
        let r=Math.round(Math.random()*255);
        let g_color=Math.round(Math.random()*255);
        let b=Math.round(Math.random()*255);
        $(".ad_wrap_img").css("backgroundColor","rgba("+r+","+g_color+","+b+",.2)")
    },1500)
    var j = -1;
    var shoot_div = $("#shoot_right div");
    setInterval(function(){
        j++;
//        $("#left_img").fadeOut(1000,function(){
            shoot_div.eq(j).css("border", "8px solid #efefef").find("i").css("visibility", "visible");
            shoot_div.not($('.shoot_right div:eq(' + j + ')')).css("border", "8px solid transparent")
            .find("i").css("visibility", "hidden");
            $("#left_img").attr("src", "img/img" + j + ".webp")
            if (j == 2) {
                j = -1;
            }
//        });
    },3000);
    initEvent();
    initMod()//初始化组件
//    let r=-1;
//    setInterval(function(){
//        r++;
//        $("#bg_img").fadeOut(1000,function(){
//            $(this).attr("src","img/bg"+r+".webp").fadeIn(1000)
//            if(r==2){
//                r=-1;
//            }
//        })
//    },4000)
});
function book_infoFun(){
    $(".book_img").on("mouseenter", function () {
        $(this).parent().find("article").fadeIn(100);
    }).on("mouseleave", function () {
        $(this).parent().find("article").fadeOut(100);
    });
}

function initEvent() {
    $("#first_article").on("click",function(){
        first_article++;
    }) 
}

function initMod(){
    draw();
    commentFun();
}

function initBook(){
    $.ajax({
        type:"post",
        url:"it_article/find",
        data:{page:1,type:'book_article'},
        success:function(data){
           let dataArr=data.rows;
           for(let i=0;i<dataArr.length;i++){
               $("<div class='book_div'>\
                    <p class='book_img'><a href='it-article.html?id="+dataArr[i].id+"&type="+dataArr[i].type+"'><img src=img/"+dataArr[i].book_img+" alt=''/></a></p>\
                    <a href='it-article.html?id="+dataArr[i].id+"&type="+dataArr[i].type+"'>"+dataArr[i].book_author+"</a>\
                    <p>"+dataArr[i].book_title+"</p>\
                    <article>\
                        <img src='img/left_arrow.png' alt=''/>\
                        <h5>"+dataArr[i].book_title+"</h5>\
                        <p>"+dataArr[i].book_author+"</p>\
                        <p>"+dataArr[i].book_info+"</p>\
                    </article>\
                </div>").appendTo('#goodbook')
                book_infoFun();
           }
        }
    })
}

function initLifeLog(){
    $.ajax({
        type:"post",
        url:"lifelog/find",
        data:{
            page:1,
            rows:2,
        },
        success:function(data){
            let dataArr=data.rows;
            for(let i=0;i<dataArr.length;i++){
                $()
            }
        }
    })
}

function initIt_article(){
    $.ajax({
        type:"post",
        url:"it_article/find",
        data:{
            page:1,
            rows:2,
            type:"it_article"
        },
        success:function(data){
            let dataArr=data.rows;
            for(let i=0;i<dataArr.length;i++){
                $("<div class='it_article'>\
                    <pre>热 <span></span></pre>\
                    <div class='img_wrap'>\
                        <img src='img/"+dataArr[i].it_img+"' alt=''/>\
                    </div>\
                    <article>\
                        <h4>"+dataArr[i].article_title+"</h4>\
                        <p>"+dataArr[i].sentence+"<span>…...</span></p>\
                        <span><a id='first_article' href='it-article.html?id="+dataArr[i].id+"&type="+dataArr[i].type+"'>阅读全文</a></span>\
                    </article>\
                    <p>\
                        <img src='img/time.jpg' alt=''/>\
                        <time>"+dataArr[i].time+"</time>\
                        <small>编辑： 刘相军</small>\
                        <span>分类： IT之旅</span>\
                        <span>点击 ："+dataArr[i].readtime+"</span>\
                    </p>\
                </div>").appendTo("#it_life");
            }
        }
    })
}

function commentFun(){
    $.ajax({
        "type":'post',
        'url':"comment/find",
        data:{},
        success:function(data){
            var dataArr=data.reverse().slice(0,7);
            for(let i=0;i<dataArr.length;i++){
                if(dataArr[i].src){
                    let src=dataArr[i].src.split('public')[1];
//                    console.log(src)
                    $("<div class='comment_div'>\
                        <img src='"+src+"'alt=''/>\
                        <div class='comment_left'>\
                            <p><span>"+dataArr[i].name+"</span> &nbsp; &nbsp;<time>"+dataArr[i].time+"</time></p>\
                            <p>"+dataArr[i].comment+"</p>\
                        </div>\
                    </div>").appendTo('.comment')
                }
            }
        }
    })
}

function draw() {
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');
    context.save(); 
    context.translate(66,66);
    var deg=2*Math.PI/12;
    context.save();
    context.beginPath();
    for(var i=0;i<13;i++){
        var x=Math.sin(i*deg);
        var y=-Math.cos(i*deg);
        context.lineTo(x*64,y*64);
    }
    var c=context.createRadialGradient(0,0,0,0,0,130);
    c.addColorStop(0,"#1C48FF");
    c.addColorStop(.5,"#00EEFF");
    context.fillStyle=c;
    context.fill();
    context.closePath();
    context.restore();
    context.save();
    context.beginPath();
    for(var i=1;i<13;i++){
        var x1=Math.sin(i*deg);
        var y1=-Math.cos(i*deg);
        context.fillStyle="#fff";
        context.font="nomal 14px Calibri";
        context.textAlign='center';
        context.textBaseline='middle';
        context.fillText(i,x1*50,y1*50);
    }
    context.closePath();
    context.restore();
    context.save();
    context.beginPath();
    for(var i=0;i<12;i++){
        var x2=Math.sin(i*deg);
        var y2=-Math.cos(i*deg);
        context.moveTo(x2*80,y2*80);
        context.lineTo(x2*80,y2*80);
    }
    context.strokeStyle='#fff';
    context.lineWidth=1;
    context.stroke();
    context.closePath();
    context.restore();
    context.save();
    var deg1=2*Math.PI/60;
    context.beginPath();
    for(var i=0;i<60;i++){
        var x2=Math.sin(i*deg1);
        var y2=-Math.cos(i*deg1);
        context.moveTo(x2*100,y2*100);
        context.lineTo(x2*120,y2*120);
    }
    context.strokeStyle='#fff';
    context.lineWidth=1;
    context.fill();
    context.closePath();
    context.restore();
    context.save();
    context.strokeStyle="yellow";
    context.font='14px  sans-serif ';
    context.textAlign='center';
    context.textBaseline='middle';
    context.strokeText('L X J',0,25);
    
    context.restore();
    
    var time=new Date();
    var h=(time.getHours()%12)*2*Math.PI/12;
    var m=time.getMinutes()*2*Math.PI/60;
    var s=time.getSeconds()*2*Math.PI/60;
    context.save();
    context.rotate( h + m/12 + s/720) ;
    context.beginPath();
    context.moveTo(0,6);
    context.lineTo(0,-32);
    context.strokeStyle="#fff";
    context.lineWidth=3;
    context.stroke();
    context.closePath();
    context.restore();

    context.save();
    context.rotate( m+s/60 ) ;
    context.beginPath();
    context.moveTo(0,8);
    context.lineTo(0,-40);
    context.strokeStyle="#fff";
    context.lineWidth=2;
    context.stroke();
    context.closePath();
    context.restore();
    context.save();
    context.rotate( s );
    context.beginPath();
    context.moveTo(0,10);
    context.lineTo(0,-50);
    context.strokeStyle="#fff";
    context.lineWidth=1;
    context.stroke();
    context.closePath();
    context.restore();
    context.restore();
    setTimeout(draw, 1000);

}
function initTime(){
    var now_time=new Date();
    var y=now_time.getFullYear();
    var mon=now_time.getMonth();
    var d=now_time.getDate();
    var w=now_time.getDay(); 
    var h=now_time.getHours();
    var min=now_time.getMinutes();
    min<10 ? min="0"+min : min=min;
    var s=now_time.getSeconds();
    s<10 ? s="0"+s : s=s;
    switch (w){
        case 1:w="一";break;
        case 2:w="二";break;
        case 3:w="三";break;
        case 4:w="四";break;
        case 5:w="五";break;
        case 6:w="六";break;
        case 0:w="日";break;
    }
    $("#time_minutes").html(h+":"+min+" <span>"+ s+"</span>");
    $("#time_week").html("星期"+w);
    $("#time_year").html( y + "年" +Number(mon+1)  + "月"+ d+ "日")
}