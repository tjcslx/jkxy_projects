//将所有按钮通过getElementById方法获得，并保存在各自的变量中；并将两个数字、算符及结果分别保存在四个变量中，根据四个变量的值决定数字按钮单击事件的处理逻辑
var r = document.getElementById("result");
var btn0 = document.getElementById("btn0");
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var btn5 = document.getElementById("btn5");
var btn6 = document.getElementById("btn6");
var btn7 = document.getElementById("btn7");
var btn8 = document.getElementById("btn8");
var btn9 = document.getElementById("btn9");
var btn_dot = document.getElementById("btn_dot");
var btn_del = document.getElementById("btn_del");
var btn_plus = document.getElementById("btn_plus");
var btn_minus = document.getElementById("btn_minus");
var btn_multiply = document.getElementById("btn_multiply");
var btn_divide = document.getElementById("btn_divide");
var btn_sin = document.getElementById("btn_sin");
var btn_cos = document.getElementById("btn_cos");
var btn_tan = document.getElementById("btn_tan");
var btn_log = document.getElementById("btn_log");
var btn_equals = document.getElementById("btn_equals");
var num1 = null,
    num2 = null,
    op = null,
    result = null;

//0-9这十个按钮的单击事件：当输入框的值为0时，单击直接将值修改为按钮对应的值，否则在已输入值的后面增加一位按钮对应的值
btn0.onclick = function () {
    if (num1 === null) {
        r.value = "0";
        num1 = 0;
    } else if ((num1 !== null) && (op === null) && (num2 === null)) {
        if (r.value !== "0") {
            r.value = r.value + "0";
            num1 = r.value;
        }
    } else if ((num1 !== null) && (op !== null) && (num2 === null)) {
        r.value = "0";
        num2 = 0;
    } else if ((num1 !== null) && (op !== null) && (num2 !== null)) {
        if (r.value !== "0") {
            r.value = r.value + "0";
            num2 = r.value;
        }
    }
};

btn1.onclick = numPress(1);

btn2.onclick = numPress(2);

btn3.onclick = numPress(3);

btn4.onclick = numPress(4);

btn5.onclick = numPress(5);

btn6.onclick = numPress(6);

btn7.onclick = numPress(7);

btn8.onclick = numPress(8);

btn9.onclick = numPress(9);

//小数点按钮的单击事件：当输入框的值不存在小数点（通过正则表达式进行匹配）时，会在后面添加小数点，否则为无效操作
btn_dot.onclick = function () {
    if (!r.value.match("\\.")) {
        r.value = r.value + ".";
    }
};

//删除按钮的单击事件：当输入框的值只有一位时，将其置为0，否则删除最后一位
btn_del.onclick = function () {
    if (r.value.length === 1) {
        r.value = "0";
    } else {
        r.value = r.value.substr(0, r.value.length - 1);
    }
};

//删除按钮的双击事件：将输入框的值置为0
btn_del.ondblclick = function () {
    r.value = "0";
};

//加减乘除四个按钮的单击事件：将算符变量op置为加减乘除，并将变量num1置为当前输入框的值
btn_plus.onclick = function () {
    op = "+";
    num1 = r.value;
};

btn_minus.onclick = function () {
    op = "-";
    num1 = r.value;
};

btn_multiply.onclick = function () {
    op = "*";
    num1 = r.value;
};

btn_divide.onclick = function () {
    op = "/";
    num1 = r.value;
};

//sin、 cos、 tan、 log四个按钮的单击事件：直接进行计算，当输入数值计算后会出现异常时进行提示。所有计算结果都保留十二位数字（不含小数点）
//同时将结果保存到全局变量result中，当再次点击数值按钮时，若result变量不为空，则将输入框置成输入的数值，即重新开始计算
btn_sin.onclick = function () {
    var s = Math.sin(r.value * 2 * Math.PI / 360);
    if ((s.toFixed(11).toString() === "0.00000000000") || (s.toFixed(11).toString() === "-0.00000000000")) {
        r.value = "0";
    } else {
        r.value = parseFloat(s.toFixed(11).toString());
    }
    result = r.value;
    num1 = null;
    op = null;
};

btn_cos.onclick = function () {
    var c = Math.cos(r.value * 2 * Math.PI / 360);
    if ((c.toFixed(11).toString() === "0.00000000000") || (c.toFixed(11).toString() === "-0.00000000000")) {
        r.value = "0";
    } else {
        r.value = parseFloat(c.toFixed(11).toString());
    }
    result = r.value;
    num1 = null;
    op = null;
};

//当参数为90+180n（n为整数）时，cos值为0，所以tan值无效，在tan函数中对这种情况进行提示
btn_tan.onclick = function () {
    var t = Math.tan(r.value * 2 * Math.PI / 360);
    if ((r.value / 90) % 2 === 1) {
        alert("无效结果。");
    } else {
        r.value = parseFloat(t.toFixed(11).toString());
        result = r.value;
        num1 = null;
        op = null;
    }
};

btn_log.onclick = function () {
    if (r.value === "0") {
        alert("无效结果。");
    } else {
        r.value = truncate(parseFloat(Math.log(r.value)));
        result = r.value;
        num1 = null;
        op = null;
    }
};

//等号按钮的单击事件：详细如下：
//1、当算符变量op为空时，不作处理；
btn_equals.onclick = function () {
    if (op !== null) {
        num2 = r.value;
        var n1 = new Number(num1);
        var n2 = new Number(num2);
        if ((op === "/") && (r.value === "0")) {
            alert("当算符为除时，被除数不能为0！");
        } else {
            if (op === "+") {
                r.value = (new Number(n1 + n2)).toString();
            } else if (op === "-") {
                r.value = (new Number(n1 - n2)).toString();
            } else if (op === "*") {
                r.value = (new Number(n1 * n2)).toString();
            } else {
                r.value = (new Number(n1 / n2)).toString();
            }
            result = r.value;
            num1 = null;
            num2 = null;
            op = null;
        }
    }
};

//截取函数，即将参数截取成整数+小数位数字个数不超过12位的数字，当参数整数位大于12位时返回null
function truncate(n) {
    var x = parseInt(n, 10).toString().length;
    if (x <= 12) {
        return n.toFixed(12 - x);
    } else {
        return null;
    }
}

function numPress(num) {
    if (num1 === null) {
        r.value = num.toString();
        num1 = num;
    } else if ((num1 !== null) && (op === null) && (num2 === null)) {
        if (r.value !== "0") {
            r.value = r.value + num.toString();
            num1 = r.value;
        } else {
            r.value = num.toString();
            num1 = num;
        }
    } else if ((num1 !== null) && (op !== null) && (num2 === null)) {
        r.value = num.toString();
        num2 = num;
    } else if ((num1 !== null) && (op !== null) && (num2 !== null)) {
        if (r.value !== "0") {
            r.value = r.value + num.toString();
            num2 = r.value;
        } else {
            r.value = num.toString();
            num2 = num;
        }
    }
}