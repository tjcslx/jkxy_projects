// 该函数将输入的三个参数r、g、b分别转换为十六进制，并进行拼接；若某个参数为一位则补0
function hexFromRGB(r, g, b) {
    var hex = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
    ];
    $.each(hex, function(nr, val) {
        if (val.length === 1) {
            hex[nr] = "0" + val;
        }
    });
    return hex.join("").toUpperCase();
}

// 滑块移动时改变颜色，设置部分元素，包括导航栏、右侧预览框背景颜色，及正文部分文字颜色，并将颜色保存至localStorage中的color键下，实现键值对
function refreshSwitch() {
    var red = $("#red").slider("value"),
        green = $("#green").slider("value"),
        blue = $("#blue").slider("value"),
        hex = hexFromRGB(red, green, blue);
    $("#preview").css("background-color", "#" + hex);
    $("nav").css("background-color", "#" + hex);
    $("span").css("color", "#" + hex);

    localStorage.color = hex;
}
// 主函数，取出color键对应的值，若值不存在，则RGB三个滑块取默认值255，140，60，并生成默认颜色；
// 否则通过substr函数取该值对应的三种颜色的值，并将其转换为0-255之间的十进制数值
$(function() {
    var color = localStorage.getItem("color");

    $("#red, #green, #blue").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        slide: refreshSwitch,
        change: refreshSwitch
    });

    if (color === null) {
        $("#red").slider("value", 255);
        $("#green").slider("value", 140);
        $("#blue").slider("value", 60);
    } else {
        $("#red").slider("value", parseInt(color.substr(0, 2), 16));
        $("#green").slider("value", parseInt(color.substr(2, 2), 16));
        $("#blue").slider("value", parseInt(color.substr(4, 2), 16));
    };
});
