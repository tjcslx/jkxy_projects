(function () {
    //设置nav标签中隐藏菜单项函数，参数ms为显示、隐藏动画时间，0为无动画：
    //1、用窗口宽度除以nav标签中每个li元素的宽度，并取整得到在当前窗口宽度可以显示的li元素个数，保存到shown变量；li元素的总数保存到size变量；
    //2、除了最后一个元素之外，索引大于shown变量的li元素将被隐藏；最后一个li元素点击时将所有隐藏的元素显示出来。
    function setHiddenNavItems(ms) {
        var shown = Math.floor(window.innerWidth / $("nav>ul>li").width()) - 2;
        var size = $("nav>ul>li").size();
        for (var i = shown; i <= size - 2; i++) {
            $("nav>ul>li").eq(i).hide(ms);
        }
    };

    //打开新版块或点击更多按钮时以Ajax方式加载10条新闻，如果记录数小于10，则加载全部；
    //1、加载过程中执行动画，即动态地将动画div追加到li元素中，隐藏原来的链接；
    //2、加载成功后，将全部li元素加载到ul中，同时删除动画div并将链接显示出来；
    //3、参数startNum为当前ul中li元素的个数，对应MySQL limit的第一个参数；
    //4、category为版块，0为首页，其他为对应版块；
    //5、element为新增动画元素的父级元素，即点击元素本身；
    //6、trigger为触发点击事件的元素（链接或按钮）。
    function getNextTenNews(startNum, category, element, trigger) {
        $.ajax({
            url: "http://localhost:3900/newslist///0/" + category + "/" + startNum + "/10",
            beforeSend: function () {
                element.append("<div class=\"ani\"><div class=\"ac\"><i></i><i></i><i></i><i></i><i></i></div></div>");
                element.children(trigger).hide();
                element.children("div.ani").show();
            },
            success: function (data) {
                element.children(trigger).show();
                element.children("div.ani").remove();
                $.each(data, function (index, value) {
                    if ((startNum > 0)) {
                        $("section.index>ul").append("<li><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"" + $(value).attr("n_id") + "\"><h3>" + $(value).attr("n_heading") + "</h3><p>" + $(value).attr("n_abstract") + "</p><span class=\"time\">" + $(value).attr("insert_time") + "</span><span class=\"origin\">" + $(value).attr("dno_name") + "</span></a></li>");
                    } else {
                        if (index = 0) {
                            $("section.index>ul").html("<li><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"" + $(value).attr("n_id") + "\"><h3>" + $(value).attr("n_heading") + "</h3><p>" + $(value).attr("n_abstract") + "</p><span class=\"time\">" + $(value).attr("insert_time") + "</span><span class=\"origin\">" + $(value).attr("dno_name") + "</span></a></li>");
                        } else {
                            $("section.index>ul").append("<li><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"" + $(value).attr("n_id") + "\"><h3>" + $(value).attr("n_heading") + "</h3><p>" + $(value).attr("n_abstract") + "</p><span class=\"time\">" + $(value).attr("insert_time") + "</span><span class=\"origin\">" + $(value).attr("dno_name") + "</span></a></li>");
                        };
                    };
                });
            }
        })
    };

    function getFivePhotos() {
        $.ajax({
            url: "http://localhost:3900/photos",
            success: function (data) {
                $.each(data, function (index, value) {
                    $("div.jcarousel>ul").append("<li><img src=\"" + $(value).attr("np_src") + "\"></li>");
                });
            }
        });
    };

    //取类为active的li元素
    function getActiveItem() {
        for (i = 0; i <= $("nav>ul>li").size(); i++) {
            if ($("nav>ul>li>a").eq(i).css("border-bottom-width") == "1px") {
                return i;
            }
        }
    };

    //根据新闻流水号取新闻内容，并将json中的数据写入模态窗口
    function getNewsDetails(newsid) {
        $.ajax({
            url: "http://localhost:3900/news/" + newsid,
            success: function (data) {
                $.each(data, function (index, value) {
                    $(".modal-header h4").html($(value).attr("n_heading"));
                    $(".modal-body span.time").html($(value).attr("insert_time"));
                    $(".modal-body span.origin").html($(value).attr("dno_name"));
                    $(".modal-body p").html($(value).attr("n_content"));
                });
            }
        });
    };
    
    //为模态窗口绑定事件，当点击链接时返回该链接对应的新闻信息，使之可以进行修改和删除
    $('#newsmodal').on('show.bs.modal', function (event) {
        var a = $(event.relatedTarget);
        var id = a.data('whatever');
        var modal = $(this);
        getNewsDetails(id);
    });

    //页面加载时运行setHiddenNavItems方法，参数为0即无动画；
    $(window).on({
        load: function () {
            setHiddenNavItems(0);
            getFivePhotos();
            getNextTenNews(0, 0, $("nav>ul>li").eq(0), "a");
        }
    });

    //导航栏元素点击时进行判断如下：
    //1、若点击元素不是最后一个li元素，即内容不是∨或∧，则移除li元素中存在的active类，并给点击元素增加active类，并运行getNextTenNews方法；
    //2、当点击元素是第一个li元素，即内容是“首页”，则getNextTenNews方法中的第二个参数category值为0，否则为当前li.active的元素ID，通过getActiveItem方法返回。
    $("nav>ul>li").click(function () {
        if (($.trim($(this).html()) != "∨") && ($.trim($(this).html()) != "∧")) {
            $("li.active").removeClass("active");
            $(this).addClass("active");
            $("section.index>ul>li").remove();
            if ($("li.active").children("a").html() == "首页") {
                getNextTenNews(0, 0, $(this), "a");
            } else {
                getNextTenNews(0, getActiveItem(), $(this), "a");
            };
        }
    });

    //点击最后一个元素时进行判断：若内容为∨则为展开隐藏的li元素，若内容为∧则隐藏第一行之外的li元素，即运行setHiddenNavItems方法；
    $("li.expand").click(function () {
        if ($.trim($(this).html()) == "∨") {
            $(this).siblings().show(200);
            $(this).html("∧");
        } else {
            setHiddenNavItems(200);
            $(this).html("∨");
        }
    });

    //点击右下角的返回按钮，以动画返回页面顶部
    $(".back").on({
        click: function () {
            $("html,body").animate({
                scrollTop: 0
            }, 200);
            return false;
        }
    });
    
    //点击更多按钮时运行getNextTenNews函数；
    $("div.more").click(function () {
        var size = $("section.index>ul>li").size();
        getNextTenNews(size, getActiveItem(), $(this), "button.more");
    });
})();