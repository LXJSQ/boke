var page = 1;
var maxpage;
var next_title;
var last_title;
var catalog_btn;
var type = "it_article";
var id;
$(function () {
    if(/\?|=|&/.test(location.href)){
        id = location.href.split("?")[1].split("&")[0].split("=")[1];
        type=location.href.split("?")[1].split("&")[1].split("=")[1];
        console.log(location.href.split("?")[1])
    }
    
    console.log(id,page)
    initMod(page,type,id); //初始化左边内容
    initEvent();
    initCatalog(type); //初始化右边目录
    pageFun(page, type)  //初始化上下篇
})

function initEvent() {
    $('#nextPage').on('click', function () {
        if (page < Number(maxpage))
            page += 1;
        initMod(page, type);
        pageFun(page, type)
    });
    $('#lastPage').on('click', function () {
        if (page > 1) {
            page -= 1;
            initMod(page, type);
            pageFun(page, type)
        }
    });
    $("#it_article").on('click', function () {
        type = 'it_article';
        initCatalog(type);
        pageFun(page, type);
        initMod(page, type)
    });
    $("#book_article").on('click', function () {
        type = 'book_article';
        initCatalog(type)
        pageFun(page, type)
        initMod(page, type)
    })
}


function initMod(page,type,id) {   //初始化文章内容
//    console.log(page,type,id)
    switch(type){
        case "it_article":$("#it_article").css({color:'#FF0036',backgroundColor:'#efefef'});
                          $("#book_article").css({color:'#37a',backgroundColor: 'white'});break;
        case "book_article":$("#book_article").css({color:'#FF0036',backgroundColor: '#efefef'});
                        $("#it_article").css({color:'#37a',backgroundColor: 'white'});break;      
    }
    
    $.ajax({
        type: "post",
        url: 'it_article/find',
        data: {
            page: page,
            rows: 1,
            type: type,
            id: id
        },
        success: function (data) {
            $("#section_wrap").html('');
            maxpage = data.maxpage;
            var data = data.rows[0];
            var _id=data._id;
            var new_readtime=data.readtime
            var sectionArr = data.section;
            $('#read_time').html("阅读【"+data.readtime+"】");
            $('#edit').html("编辑：<a href='message.html'>刘相军</a>")
            $('article h2').html(data.article_title);
            $('#sentence_p').html(data.sentence);
            $('article time').html('发布时间 ： ' + data.time);
            $('#article_author').html(data.article_author).attr('href', data.href)
            for (let i = 0; i < sectionArr.length; i++) {
                $("<section id=sec" + i + "><h3>" + sectionArr[i].h3 + "</h3><p>" + sectionArr[i].p + "</p></section>").appendTo('#section_wrap');
                if (sectionArr[i].src.length > 0) {
                    $("<p><img src='" + sectionArr[i].src + "'/></p>").appendTo("#sec" + i);
                }
            }
            $.ajax({
                type:"post",
                url:"it_article/update",
                data:{
                    _id: _id,
                    readtime:Number(new_readtime)+1
                },
                success:function(){
                    
                }
            })
        }
    })
}

function pageFun(page, type) {  //上下篇
    $.ajax({
        type: 'post',
        url: 'it_article/find',
        data: {
            page: page + 1,
            rows: 1,
            type: type
        },
        success: function (data) {
            if (data.rows.length > 0) {
                next_title = data.rows[0].article_title;
                $('#nextPage').html(next_title)
            } else {
                $('#nextPage').html("没有了")
            }

        }
    })
    $.ajax({
        type: 'post',
        url: 'it_article/find',
        data: {
            page: page - 1,
            rows: 1,
            type: type
        },
        success: function (data) {
            if (page - 1 > 0 && data.rows.length > 0) {
                last_title = data.rows[0].article_title;
                $('#lastPage').html(last_title)
            } else {
                $('#lastPage').html("没有了")
            }

        }
    })
}


function initCatalog(type) {   //目录选择函数
    $("#catalog").html('');
    $.ajax({
        type: 'post',
        url: 'it_article/find',
        data: {
            type: type,
        },
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                $("<li><i>" + (i + 1) + "</i><button id=" + data[i].id + ">" + data[i].article_title + "<button></li>").appendTo("#catalog")
            }
            $("#catalog").find("button").on("click", function () {
                var id = $(this).attr('id');
                initMod(1, type, id);
            });
        }
    })
}
