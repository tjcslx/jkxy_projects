function getClass() {
    // score变量用于取id为score的输入框中的值
    var score = document.getElementById("score").value;
    // 通过parseInt函数解析score变量并将输出值返回至integer变量，当输入的值不是数值型时，返回值为NaN；parseInt的第二个参数为进制，10即十进制
    var integer = parseInt(score, 10);
    var r = document.getElementById("result");
    // 判断逻辑：
    // 1、当输入值不是数字（integer值为NaN），输入值不为整数（integer不为NaN但score与integer的长度不同），或输入值大于等于100或小于0时，显示各自对应的错误提示，文字颜色为红色；
    // 2、当integer大于等于60小于100时，显示根据成绩依次显示一等生至等生，文字颜色为默认颜色；
    // 3、当integer小于60时，显示根据成绩依次显示五等生至十等生，文字颜色为红色；
    if (isNaN(integer)) {
        r.innerHTML = "请输入数字！";
        r.style.color = "rgb(255, 0, 0)";
    } else if (isNaN(integer) == false && integer.toString().length != score.length) {
        r.innerHTML = "请输入整数！";
        r.style.color = "rgb(255, 0, 0)";
    } else if ((isNaN(integer) == false && integer > 100) || (isNaN(integer) == false && integer < 0)) {
        r.innerHTML = "请输入0-100之间的整数！";
        r.style.color = "rgb(255, 0, 0)";
    } else if (integer <= 100 && integer >= 90) {
        r.innerHTML = "该成绩为一等生！";
        r.style.color = "rgb(0, 0, 0)";
    } else if (integer < 90 && integer >= 80) {
        r.innerHTML = "该成绩为二等生！";
        r.style.color = "rgb(0, 0, 0)";
    } else if (integer < 80 && integer >= 70) {
        r.innerHTML = "该成绩为三等生！";
        r.style.color = "rgb(0, 0, 0)";
    } else if (integer < 70 && integer >= 60) {
        r.innerHTML = "该成绩为四等生！";
        r.style.color = "rgb(0, 0, 0)";
    } else if (integer < 60 && integer >= 50) {
        r.innerHTML = "该成绩为五等生！";
        r.style.color = "rgb(255, 0, 0)";
    } else if (integer < 50 && integer >= 40) {
        r.innerHTML = "该成绩为六等生！";
        r.style.color = "rgb(255, 0, 0)";
    } else if (integer < 40 && integer >= 30) {
        r.innerHTML = "该成绩为七等生！";
        r.style.color = "rgb(255, 0, 0)";
    } else if (integer < 30 && integer >= 20) {
        r.innerHTML = "该成绩为八等生！";
        r.style.color = "rgb(255, 0, 0)";
    } else if (integer < 20 && integer >= 10) {
        r.innerHTML = "该成绩为九等生！";
        r.style.color = "rgb(255, 0, 0)";
    } else {
        r.innerHTML = "该成绩为十等生！";
        r.style.color = "rgb(255, 0, 0)";
    };
}
