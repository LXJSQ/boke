var data;
var page=1;
var row;
var maxpage;
let left_wrap=$(".left_wrap")
let page_a=$(".left .page a")
$(function(){
    initContent();
    initEvent();
    setInterval(function () {
        $(".right>b").css("top", y++ + "px");
        if (y == 900) y = 26;
    }, 10);
})
 var y = 26;
function initEvent(){
    //调到第几页
    page_a.on("click",function(){
        page=Number($(this).html());
        initContent(page,row);
    })
    $(".left .page span:eq(0)").on("click",function(){
        console.log(page)
        if(Number(page)>1){
            page-=1;
            initContent(page,row);
        }
    })
    $(".left .page span:eq(2)").on("click",function(){
        if(page<Number(maxpage)){
            page+=1;  
            initContent(page,row);
        }
    })   
}

function initContent(page=1,row=2){
    left_wrap.html('')
    for(let i=0;i<page_a.length;i++){
        if(page==$(page_a[i]).html()){
            $(page_a[i]).css({'backgroundColor':'#83BF73',color:"#fff"})
        }else{
            $(page_a[i]).css({'backgroundColor':"rgb(249,249, 249)",color:'#37a'})
        }
    }
    $.ajax({
        type:"post",
        url:"/lifelog/find",
        data:{page:page,rows:row},
        success:function(data){
            maxpage=data.maxpage;
            let dataArr=data.rows;
            let str='';
            for(let i=0;i<dataArr.length;i++){
                let week=new Date(dataArr[i].date);
                switch(week.getDay()){
                    case 1:str="Monday" ;break;
                    case 2:str="Tuesday";break;
                    case 3:str="Wednesday" ;break;
                    case 4:str="Thursday" ;break;
                    case 5:str="Firday" ;break;
                    case 6:str="Saturday" ;break;
                    case 7:str="Sunday" ;break;
                }
                $("<div>").attr("class","box").html(
                    "<p><span>"+str+"</span><time>"+dataArr[i].date+"</time></p>\
                    <p>"+dataArr[i].sentence+"</p>\
                    <article>"+dataArr[i].content+"</article>").prependTo(left_wrap);
            }
        }
    })
}
    
    
    
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


