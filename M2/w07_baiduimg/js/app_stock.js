$(document).ready(function () {
    //将box容器中的全部值保存到JSON中
    var dataImg = {
        data: [{
            "src": "0bd162d9f2d3572ce98282e18e13632762d0c3af.jpg",
            "desc": "低碳杂拍",
            "tag": "生态摄影"
        }, {
            "src": "6c224f4a20a4462302c2bc5a9c22720e0cf3d7f9.jpg",
            "desc": "清泉石上流",
            "tag": "风景"
        }, {
            "src": "f603918fa0ec08fae8a153a65bee3d6d55fbda0a.jpg",
            "desc": "填充、皮塔饼、三明治、炸薯条",
            "tag": "静物"
        }, {
            "src": "78310a55b319ebc44fdd413a8026cffc1f1716ef.jpg",
            "desc": "宠溺午后",
            "tag": "婚纱摄影"
        }, {
            "src": "d788d43f8794a4c2803d00550cf41bd5ad6e39b6.jpg",
            "desc": "Sometimes",
            "tag": "唯美"
        }, {
            "src": "ac345982b2b7d0a260a53323c9ef76094b369a1b.jpg",
            "desc": "在悬崖上荡秋千",
            "tag": "国外摄影"
        }, {
            "src": "9a504fc2d5628535740c139a92ef76c6a6ef6399.jpg",
            "desc": "爱疯乐魔",
            "tag": "lomo"
        }, {
            "src": "810a19d8bc3eb1354e25adb1a41ea8d3fc1f44dd.jpg",
            "desc": "《国家地理杂志》2011年2月",
            "tag": "国家地理杂志"
        }, {
            "src": "8d5494eef01f3a29e1fa28879b25bc315c607c4d.jpg",
            "desc": "作者：隽",
            "tag": "人文纪实"
        }, {
            "src": "e824b899a9014c080502acd2087b02087bf4f488.jpg",
            "desc": "影响可以成为情绪的表达",
            "tag": "光影"
        }]
    };
    $(window).load(function () {
        //页面载入时启动waterfallFlow函数，将已载入的图片以瀑布流方式显示
        waterfallFlow();
    });
    $(window).scroll(function () {
        var s = $('.box').size(); //box容器的个数
        //当ifImgLazyLoad函数返回值为true，且页面中的图片个数小于等于100张时，进行懒加载：将JSON中的元素保存到box容器中
        //我在CSS中编写了一个class为lazy，默认不显示，为新增的box容器增加lazy类，加载完成后用show函数实现动画出现，但效果很差，我在网上找了别的方法
        //animate方法也不适合，有没有更好的方法？-_-
        if (ifImgLazyLoad() && s <= 100) {
            $.each(dataImg.data, function (index, value) {
                var box = $("<div>").addClass("box").addClass("lazy").appendTo($(".container"));
                var content = $("<div>").addClass("content").appendTo(box);
                $("<img>").attr({
                    "src": "img/" + $(value).attr("src"),
                    "alt": $(value).attr("desc")
                }).appendTo(content);
                content.append("<p>" + $(value).attr("desc") + "</p>");
                content.append("<span>标签：</span>");
                var tag = $("<span>").addClass("tag").appendTo(content);
                tag.append($(value).attr("tag"));
                $(".box").show(1000);
            });
            waterfallFlow();
        }
    });
});

//1、通过boxWidth变量取第一个box容器的宽度（ 即图片宽度）， 用整个视口的宽度除以box， 得到视口容纳box容器的个数， 保存到num变量；
//2、在所有box中通过jQuery的each方法进行遍历，如下：通过boxHeight变量取每个box容器的高度，当box的索引index小于num时，即图片在视口的第一行，此时将boxHeight保存到boxArray数组中；
//3、当box的索引大于num，即图片不在视口的第一行时，通过minBoxHeight变量取boxArray数组中最小的值，即第一行图片的最小高度，通过minBoxIndex变量取boxArray数组中最小高度所对应的索引，将第二行的第一张图片至于该索引图片下方，并重新计算位置以便下一张图片进行摆放，实现瀑布流效果。
//"top": minBoxHeight + 160中，160为header与nav的高度之和
function waterfallFlow() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor(($(window).width()) / boxWidth);
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
                "top": minBoxHeight + 160,
                "left": box.eq(minBoxIndex).position().left
            });
            boxArray[minBoxIndex] += box.eq(index).height();
        }
    });
};

//当页面卷动至最下方图片高度的1/2时，返回true即启动LazyLoad懒加载，否则返回值为false
function ifImgLazyLoad() {
    var box = $(".box");
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return (lastBoxHeight < scrollHeight + documentHeight) ? true : false;
}