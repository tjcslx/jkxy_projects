function calculate() {
    // 变量定义，其中用new Number取代parseInt以解决后者参数为数字与非数字混合时，返回值为数字部分而非NaN的问题
    var num1 = new Number(document.getElementById("num1").value);
    var num2 = new Number(document.getElementById("num2").value);
    var op = document.getElementById("operator");
    var result = document.getElementById("result");
    // 判断逻辑：
    // 1、若HTML表单中输入的num1或num2不为数字，即JS中d两个参数num1或num2值为NaN时，提示“请输入数字！”；
    // 2、若算符为除且num2为0，出现提示“除法计算时被除数不能为0！”；
    // 3、其他情况下计算结果，并用toString函数返回非科学记数法数值；
    if (isNaN(num1) || isNaN(num2)) {
        result.innerHTML = '请输入数字！';
    } else if ((op.selectedIndex == 3) && (num2 == 0)) {
        result.innerHTML = '当算符为除时，被除数不能为0！';
    } else {
        if (op.selectedIndex == 0) {
            result.innerHTML = new Number(num1 + num2).toString();
        } else if (op.selectedIndex == 1) {
            result.innerHTML = new Number(num1 - num2).toString();
        } else if (op.selectedIndex == 2) {
            result.innerHTML = new Number(num1 * num2).toString();
        } else {
            result.innerHTML = new Number(num1 / num2).toString();
        };
    }
}
