// 若输入框str未输入任何值，则以默认的字符串axbdmakmpja进行计算，否则以输入的字符串进行计算。
// 计算方法一：利用对象保存字符及其出现次数，并在该对象中进行计算，步骤如下：
// 1、新建对象obj，参数为字符，值为出现次数；
// 2、变量i的值从0到字符串str长度减一之间循环，k为str中第i个位置显示的字符，当obj[k]即k元素出现次数值存在时，obj[k]加一，否则为1；
// 3、将生成的对象通过冒泡排序（？）进行排列，只取出现次数最多的字符；
// 取出字符后，通过getPos函数取得该字符出现位置，并将字符与位置拼接为一个字符串显示在页面上；
function stringCountObject() {
    if (document.getElementById("str").value == "") {
        str = "axbdmakmpja";
    } else {
        str = document.getElementById("str").value;
    }
    // 步骤1
    var obj = {};
    // 步骤2
    for (var i = 0, l = str.length, k; i < l; i++) {
        k = str.charAt(i);
        if (obj[k]) {
            obj[k]++;
        } else {
            obj[k] = 1;
        }
    }
    // 步骤3
    var m = 0;
    var i = null;
    for (var k in obj) {
        if (obj[k] > m) {
            m = obj[k];
            i = k;
        }
    }
    // 取字符位置并拼接字符串
    document.getElementById("result").innerHTML = getPos(str, i);
}

// 计算方法二：利用正则表达式进行计算，步骤如下：
// 1、每次取字符串str中的第一个字符letter，并将其替换为空，用原str长度减去替换后字符串的长度即为letter字符的出现次数；
// 2、str字符串去掉全部letter字符后，下一个字符的出现次数与之前的字符比较，取次数多的字符，以此类推；
// 3、循环至str字符为空即全部字符都被替换为空，此时取出现次数最多的字符；
// 此时通过getPos函数取得该字符出现位置时，由于循环结束后str已为空，因此应在函数初始将str的原值赋给变量s，利用s进行计算；
function stringCountRegExp() {
    if (document.getElementById("str").value == "") {
        str = "axbdmakmpja";
    } else {
        str = document.getElementById("str").value;
    };
    var s = str;
    var maxLength = 0;
    var result = "";
    while (str != "") {
        var prevStr = str;
        letter = str.charAt(0);
        str = str.replace(new RegExp(letter, "g"), "");
        if (prevStr.length - str.length > maxLength) {
            maxLength = prevStr.length - str.length;
            result = letter;
        };
    };
    document.getElementById("result").innerHTML = getPos(s, result);
}

// 取得字符串str中字符s出现的位置，返回值为所有位置拼接的字符串
function getPos(str, s) {
    var pos = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == s) {
            pos = pos + "，第" + (i + 1) + "个位置";
        }
    };
    pos = pos.replace("，", "");
    return "该字符串中出现次数最多的为" + s + "，分别出现在" + pos + "。";
}
