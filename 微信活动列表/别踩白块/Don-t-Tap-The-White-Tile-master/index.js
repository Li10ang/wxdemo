/*思路：
1.创建容器div以及游戏活动容器div
2.为游戏容器添加4行div，每行div划分4块，随机出现一个黑块
3.删除最后一行div，在顶部-100px添加一行div
4.游戏运动：每当顶部-100px变为0时，执行2，顶部重置为-100px，删除最后一行
5.增加效果：计时器，点击黑块时使其变成白块，计分器，加速器，触白块失败以及最后一行div到达底部失败，清除计时器，失败禁入效果，按空格暂停以及再按空格继续*/

/*全局变量，用来控制计时器，速度以及游戏状态*/
var clock = null;
var state = 1;      // 1进行中,2暂停,3失败
var speed = 2;      //初始化游戏速度
/*按id获取元素*/
function getElement(_id){
    return document.getElementById(_id);
}
/*创建div，类名为_className*/
function createDiv(_className){
    var div=document.createElement("div");
    div.className=_className;
    return div;
}
/*4个小块数组，随机"cellTile blackTile"*/
function createArr(){
    var arr=["cellTile","cellTile","cellTile","cellTile"];
    var i = Math.floor(Math.random()*4);
    arr[i]="cellTile blackTile";
    return arr;
}
/*创建行div，每行创建4个小块,随机黑块*/
function addRow(){
    var container=getElement("container");
    var row=createDiv("row");
    var classes=createArr();
    for(var i=0;i<4;i++){
        row.appendChild(createDiv(classes[i]));
    }
    if(container.firstChild==null){
        container.appendChild(row);
    }else{
        container.insertBefore(row,container.firstChild);
    }

}
/*删除最后一行*/
function dropRow(){
    var container = getElement('container');
    if(container.childNodes.length == 6) {
        container.removeChild(container.lastChild);
    }
}
/*游戏初始化:创建4行，点击事件*/
function init(){
    for(var i=0; i<4; i++) {
        addRow();
    }
    getElement('main').onclick = function (ev) {
        judge(ev);
    }
}
/*启动游戏，计时器*/
function start(){
    clock = window.setInterval('move()', 40);
}
/*加速器*/
function accelerate(){
    speed +=2;
}
/*动画*/
function move(){
    var container = getElement('container');
    //window.getComputedStyle()等于document.defaultView.getComputedStyle()
    var top = parseInt(window.getComputedStyle(container,null)["top"]);
    if(speed + top > 0) {
        top = 0;
    } else {
        top += speed; //调节每次下降的像素
    }
    container.style.top=top+"px";
    if(top==0){
        addRow();
        container.style.top="-100px";
        dropRow();
    }else if(top == (-100 + speed)){
        var rows = container.childNodes;
        if((rows.length == 5) && (rows[rows.length-1].pass !== 1)){
            end();
        }
    }
}
/*计分器*/
function getScore(){
    var score=getElement("score");
    var newscore = parseInt(score.innerHTML)+1;
    score.innerHTML = newscore;
    if(newscore % 10 == 0) {
        accelerate();
    }
}
/*按空格游戏暂停，再按空格游戏继续*/
window.addEventListener("keyup",function(event){
    //alert(event.keyCode);
    if(state==1){
        if(event.keyCode==32){
            clearInterval(clock);
            alert("Game Pause & press SPACE to continue");
            state = 2;
            return false;
        }
    }
    if(state==2){
        if(event.keyCode==32){
            start();
            return state = 1;
        }
    }
})
/*结束游戏 清除计时器*/
function end(){
    clearInterval(clock);
    state = 3;
    var score=getElement("score");
    var newscore = parseInt(score.innerHTML);
    score.innerHTML = newscore;
    alert('Game Over & Score:'+score.innerHTML);
}
/*判断：暂停禁入，失败者禁入，未失败游戏点击黑块变白块，计分*/
function judge(ev){
    if(state==2) {
        alert("Game Pause & press SPACE to continue");
        return false;
    }
    if(state == 3) {
        alert("Failure Forbidden");
        return false;
    }
    if(ev.target.className.indexOf('blackTile') == -1){
        end();
    }else{
        ev.target.className = 'cellTile';
        ev.target.parentNode.pass = 1;
        getScore();
    }
}
