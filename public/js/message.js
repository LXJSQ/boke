var button;
var textarea;
var input_name;
var touxiangSrc;
var img_div;

$(function () {
    button = $("#submitBtn");
    textarea = $(".comment_textarea textarea");
    input_name = $(".comment_textarea p input:eq(0)")
    img_div = $("#previewImg")
    initEvent();
    imgUpload();
    messageBord();
})

function initEvent() {
    //提交评论的函数
    button.on("click", function(){
        event.preventDefault();
        if(input_name.val().length == 0 ||textarea.val().length == 0) {
            $("#hint").html("留个名字再提交吧").css("visibility", 'visible')
        } else {
            var now_time = new Date();
            var y = now_time.getFullYear();
            var mon = now_time.getMonth();
            var d = now_time.getDate();
            var h = now_time.getHours();
            var min = now_time.getMinutes();
            min < 10 ? min = "0" + min : min = min;
            var obj = {
                name: input_name.val(),
                comment: textarea.val(),
                time: y + "-" + (mon+1) + "-" + d + "&nbsp;" + h + ":" + min,
                src: touxiangSrc,
            };
            $.ajax({
                type: "post",
                url: "comment/add",
                data: obj,
                success: function () {
                    $("#clearFile").html("<input name='file' id='checkImg' type='file' />");
                    $("textarea").val("");
                    $("#name").val("");
                    $("#previewImg").html("")
                    messageBord();
                    $("#hint").css("visibility", 'hidden')
                }
            })
        }
    })
}

function imgUpload() {
    $("#preview").on("click", function () {
        $.ajaxFileUpload({
            url: "/upload",
            fileElementId: $("#checkImg").attr("id"),
            dataType: "string",
            success: function (data) {
                img_div.append("<img src='" + data.split('public')[1] + "'/>");
                touxiangSrc = data;
            }
        });
    });
}

function messageBord() {
    $.ajax({
        type: 'post',
        url: 'comment/find',
        data: {},
        success: function (data) {
            var dataArr = data.reverse();
            var src="";
            $("#comment_wrap").html('');
            for (let i = 0; i < dataArr.length; i++) {
                if(dataArr[i].src){
                        src= (dataArr[i]['src']).split('public')[1];
                   }else{
                       src="../img/undefinedImg.jpg"
                   }
                $("<div class='comment'>\
                                    <div class='portrait'><img src='" +src+ "'/></div>\
                                        <div class='comment_right'>\
                                                <p>\
                                                    <span>" + dataArr[i].name + "</span>\
                                                    <time>" + dataArr[i].time + "</time>\
                                                </p>\
                                        <p>" + dataArr[i].comment + "</p>\
                                        <a href='message.html'>回复</a>\
                                        </div>\
                                    </div>\
                              </div>").appendTo("#comment_wrap")
            }
        }
    })
}
