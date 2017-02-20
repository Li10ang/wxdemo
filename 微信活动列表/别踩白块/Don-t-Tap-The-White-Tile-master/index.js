/*˼·��
1.��������div�Լ���Ϸ�����div
2.Ϊ��Ϸ�������4��div��ÿ��div����4�飬�������һ���ڿ�
3.ɾ�����һ��div���ڶ���-100px���һ��div
4.��Ϸ�˶���ÿ������-100px��Ϊ0ʱ��ִ��2����������Ϊ-100px��ɾ�����һ��
5.����Ч������ʱ��������ڿ�ʱʹ���ɰ׿飬�Ʒ����������������׿�ʧ���Լ����һ��div����ײ�ʧ�ܣ������ʱ����ʧ�ܽ���Ч�������ո���ͣ�Լ��ٰ��ո����*/

/*ȫ�ֱ������������Ƽ�ʱ�����ٶ��Լ���Ϸ״̬*/
var clock = null;
var state = 1;      // 1������,2��ͣ,3ʧ��
var speed = 2;      //��ʼ����Ϸ�ٶ�
/*��id��ȡԪ��*/
function getElement(_id){
    return document.getElementById(_id);
}
/*����div������Ϊ_className*/
function createDiv(_className){
    var div=document.createElement("div");
    div.className=_className;
    return div;
}
/*4��С�����飬���"cellTile blackTile"*/
function createArr(){
    var arr=["cellTile","cellTile","cellTile","cellTile"];
    var i = Math.floor(Math.random()*4);
    arr[i]="cellTile blackTile";
    return arr;
}
/*������div��ÿ�д���4��С��,����ڿ�*/
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
/*ɾ�����һ��*/
function dropRow(){
    var container = getElement('container');
    if(container.childNodes.length == 6) {
        container.removeChild(container.lastChild);
    }
}
/*��Ϸ��ʼ��:����4�У�����¼�*/
function init(){
    for(var i=0; i<4; i++) {
        addRow();
    }
    getElement('main').onclick = function (ev) {
        judge(ev);
    }
}
/*������Ϸ����ʱ��*/
function start(){
    clock = window.setInterval('move()', 40);
}
/*������*/
function accelerate(){
    speed +=2;
}
/*����*/
function move(){
    var container = getElement('container');
    //window.getComputedStyle()����document.defaultView.getComputedStyle()
    var top = parseInt(window.getComputedStyle(container,null)["top"]);
    if(speed + top > 0) {
        top = 0;
    } else {
        top += speed; //����ÿ���½�������
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
/*�Ʒ���*/
function getScore(){
    var score=getElement("score");
    var newscore = parseInt(score.innerHTML)+1;
    score.innerHTML = newscore;
    if(newscore % 10 == 0) {
        accelerate();
    }
}
/*���ո���Ϸ��ͣ���ٰ��ո���Ϸ����*/
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
/*������Ϸ �����ʱ��*/
function end(){
    clearInterval(clock);
    state = 3;
    var score=getElement("score");
    var newscore = parseInt(score.innerHTML);
    score.innerHTML = newscore;
    alert('Game Over & Score:'+score.innerHTML);
}
/*�жϣ���ͣ���룬ʧ���߽��룬δʧ����Ϸ����ڿ��׿飬�Ʒ�*/
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
