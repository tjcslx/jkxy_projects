require(["jquery"], function () {
    var timeout;

    /*鼠标在课程栏移动时，下方的课程会根据位置进行变换*/
    (function () {
        $(".cm li").each(function (index) {
            var currItem = $(this);
            $(this).mouseover(function () {
                timeout = setTimeout(function () {
                    $(".cm li.active").removeClass("active");
                    $(".cb section.active").removeClass("active");
                    currItem.addClass("active");
                    $(".cb section").eq(index).addClass("active");
                }, 200);
            }).mouseout(function () {
                clearTimeout(timeout);
            });
        });

        /*当鼠标掠过微信和APP的提示框后，显示二维码，移开后二维码消失*/
        $("a.wechat").mouseenter(function () {
            $("a.wechat img").show(200);
        }).mouseleave(function () {
            $("a.wechat img").hide(200);
        });

        $(".fixed .app").mouseenter(function () {
            $(".fixed .app img").show(200);
        }).mouseleave(function () {
            $(".fixed .app img").hide(200);
        });

        /*鼠标放在左上方菜单栏中的某一项后，右侧的菜单会跟随显示*/
        $(".menu ul li").each(function (index) {
            $(this).mouseover(function () {
                $(".menu ul li div.active").removeClass("active");
                $(this).children("div").addClass("active");
            }).mouseout(function () {
                $(this).children("div").removeClass("active");
            });
        });

        $(".top .menu").mouseenter(function () {
            $(".top .menu .hide").show(200);
        }).mouseleave(function () {
            $(".top .menu .hide").hide(200);
        });

        $(".kc").each(function () {
            $(this).mouseenter(function () {
                $(this).children("a").children("div.front").addClass("transform");
                $(this).children("a").children("div.rear").css("transform", "rotateY(0deg)");
            }).mouseleave(function () {
                $(this).children("a").children("div.front").removeClass("transform");
                $(this).children("a").children("div.rear").css("transform", "rotateY(90deg)");
            });
        });

        $(".sc").each(function () {
            $(this).mouseenter(function () {
                $(this).children("div.rear").addClass("transparent");
                $(this).children("div.front").show(200);
            }).mouseleave(function () {
                $(this).children("div.rear").removeClass("transparent");
                $(this).children("div.front").hide(200);
            });
        });
    })();
});