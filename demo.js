window.onload = function(){
    //轮播
    function $(id){
        return document.getElementById(id);
    }
    var container = $("slider");
    var list = $("list");
    var buttons = $("buttons").getElementsByTagName("span");
    var prev = $("prev");
    var next = $("next");
    var index = 1 ;
    var timer ;
    //圆点span
    function showButton(){
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className == "on"){
                buttons[i].className = "";
            }
        }
        buttons[index-1].className = "on";
    }
    
    //滑动
    function animate(offset) {
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + "px";
        if( newLeft > -1920){
            list.style.left = -1920*5 + "px";
        }
        if(newLeft < -1920*5 ){
            list.style.left = -1920 + "px";
        }
    }
    //左右箭头
    next.onclick = function () {
            if(index == 5){
                index = 1
            }else{
                index ++ ;
            }
            showButton();
            animate(-1920)
        };
    prev.onclick = function () {
            if(index == 1){
                index = 5;
            }else {
                index --;
            }
            showButton();
            animate(1920)
    };
    //span定位图片
    for(var i=0;i<buttons.length;i++){
        if(this.className){
            return;
        }
        buttons[i].onclick = function () {
            var myIndex = parseInt(this.getAttribute("index"));
            var offset = -1920 * (myIndex - index);
            animate(offset);
            index = myIndex;
            showButton();
        }
    }
    //自动播放
    function play(){
         timer = setInterval(function(){
            next.onclick();
        },3000);
    }
    play();
    //鼠标移入停止
    container.onmousemove = function () {
        clearTimeout(timer);
    };
    container.onmouseout = play;
    //二维码
    var qrCode = $("qrcode").getElementsByTagName("li");
    var qrBtn = $("qrcodeBtn").getElementsByTagName("span");
    for(var j=0;j<qrBtn.length;j++){
        var onBtn = qrBtn[j];
        onBtn.num = j ;
        onBtn.onmousemove = function () {
            for(var k=0;k<qrBtn.length;k++){
                qrBtn[k].className = "";
                qrCode[k].style.display = "none";
            }
            this.className = "ons" ;
            qrCode[this.num].style.display = "block" ;
        }
    }
    //解决IE8之类不支持getElementsByClassName

    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (className, element) {
            var children = (element || document).getElementsByTagName('*');
            var elements = new Array();
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                var classNames = child.className.split(' ');
                for (var j = 0; j < classNames.length; j++) {
                    if (classNames[j] == className) {
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;
        };
    }
    //左侧导航
    var info = document.getElementsByClassName("categoryli");
    var panels = document.getElementsByClassName("category-panels");
   for(var m=0;m<info.length;m++){
       var onInfo = info[m];
       onInfo.id = m ;
       onInfo.onmousemove = function () {
            panels[this.id].style.display = "block" ;
        };
       onInfo.onmouseout = function () {
            panels[this.id].style.display = "none" ;
        }
    }
};