$(document).ready(function () {
    $(window).on("load", function () {
        imgLoc();
        var dataImg = {
            data: [{
                "src": "img/1.jpg"
            }, {
                "src": "img/2.jpg"
            }, {
                "src": "img/3.jpg"
            }, {
                "src": "img/4.jpg"
            }, {
                "src": "img/5.jpg"
            }, {
                "src": "img/6.jpg"
            }, {
                "src": "img/7.jpg"
            }, {
                "src": "img/8.jpg"
            }, {
                "src": "img/9.jpg"
            }, {
                "src": "img/10.jpg"
            }, {
                "src": "img/11.jpg"
            }]
        }
        window.onscroll = function () {
            var s = $(".box").size();
            if (imgLazyLoad() && s < 100) {
                $.each(dataImg.data, function (index, value) {
                    var box = $("<div>").addClass("box").appendTo($(".container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src", $(value).attr("src")).appendTo(content);
                });
                imgLoc();
            };
        }
    });
});

//1、通过boxWidth变量取第一个box容器的宽度（ 即图片宽度）， 用整个视口的宽度除以box， 得到视口容纳box容器的个数， 保存到num变量；
//2、在所有box中通过jQuery的each方法进行遍历，如下：通过boxHeight变量取每个box容器的高度，当box的索引index小于num时，即图片在视口的第一行，此时将boxHeight保存到boxArray数组中；
//3、当box的索引大于num，即图片不在视口的第一行时，通过minBoxHeight变量取boxArray数组中最小的值，即第一行图片的最小高度，通过minBoxIndex变量取boxArray数组中最小高度所对应的索引，将第二行的第一张图片至于该索引图片下方，并重新计算位置以便下一张图片进行摆放
function imgLoc() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    var boxArray = [];
    box.each(function (index, value) {
        var boxHeight = box.eq(index).height();
        if (index < num) {
            boxArray[index] = boxHeight;
        } else {
            var minBoxHeight = Math.min.apply(null, boxArray);
            var minBoxIndex = $.inArray(minBoxHeight, boxArray);
            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": box.eq(minBoxIndex).position().left
            });
            boxArray[minBoxIndex] += box.eq(index).height();
        }
    });
}

//当页面卷动至
function imgLazyLoad() {
    var box = $(".box");
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return (lastBoxHeight < scrollHeight + documentHeight) ? true : false;
}