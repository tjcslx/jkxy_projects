$(document).ready(function () {
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
        waterfallFlow();
    });
    $(window).scroll(function () {
        if (ifImgLazyLoad()) {
            $("img.lazy").lazyload({
                effect: "fadeIn"
            });
        }
    });
});

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

function ifImgLazyLoad() {
    var box = $(".box");
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return (lastBoxHeight < scrollHeight + documentHeight) ? true : false;
}