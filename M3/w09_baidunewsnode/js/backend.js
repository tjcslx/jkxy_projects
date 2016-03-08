(function () {
    //以Ajax方式取出需要的代码写入到select元素中。
    function getOrigin() {
        $.ajax({
            url: "http://localhost:3900/origin",
            success: function (data) {
                $.each(data, function (index, value) {
                    $("select#origin").append("<option value=\"" + $(value).attr("dno_id") + "\">" + $(value).attr("dno_name") + "</option>");
                    $("select#newsorigin").append("<option value=\"" + $(value).attr("dno_id") + "\">" + $(value).attr("dno_name") + "</option>");
                });
            }
        });
    };

    //Form中的四个元素有变化时，都会运行getNextTenNewsInTable。
    var formArray = [$("input#heading"), $("input#abstract"), $("select#origin")];
    for (i = 0; i < formArray.length; i++) {
        formArray[i].change(function () {
            getNewsInTable();
        });
    };

    //以Ajax方式取出符合条件的新闻，并将数据写入到表格中。
    function getNewsInTable() {
        var h = $("input#heading").val();
        var a = $("input#abstract").val();
        var o = $("select#origin").val();
        var str = "<td><a href=\"#\" data-toggle=\"modal\" data-target=\"#newsmodal\" data-whatever=\"";
        $("tbody>tr").remove();
        $.ajax({
            url: "http://localhost:3900/newslist/" + h + "/" + a + "/" + o + "/0/0/0",
            success: function (data) {
                $.each(data, function (index, value) {
                    $("tbody").append("<tr>" + str + $(value).attr("n_id") + "\">" + $(value).attr("n_id") + "</a></td>" + str + $(value).attr("n_id") + "\">" + $(value).attr("n_heading") + "</a></td>" + str + $(value).attr("n_id") + "\">" + $(value).attr("n_abstract") + "</a></td>" + str + $(value).attr("n_id") + "\">" + $(value).attr("dno_name") + "</a></td>" + str + $(value).attr("n_id") + "\">" + $(value).attr("insert_time") + "</a></td></tr>");
                });
            }
        })
    };

    //取出id对应的新闻，并将数据写入到模态窗口的对应元素中。
    function getNewsInModal(id) {
        $("label#headingnotify").html("");
        $("label#contentnotify").html("");
        $("label#originnotify").html("");

        var h = $("input#newsheading");
        var c = $("textarea#newscontent");
        var o = $("select#newsorigin");
        $.ajax({
            url: "http://localhost:3900/news/" + id,
            success: function (data) {
                if (data.length == 0) {
                    h.val("");
                    c.val("");
                    o.val("0");
                } else {
                    $.each(data, function (index, value) {
                        h.val($(value).attr("n_heading"));
                        c.val($(value).attr("n_content"));
                        o.val($(value).attr("dno_id"));
                    });
                };
            }
        });
    };

    //模态窗口保存时进行空项目校验，当input、textarea项目为空或select项目值为0时label标签显示，参数type等于0时对应input、textarea，为1时对应select，column为判断是否为空的项目，notecontent为错误提示文本。
    function getNotes(type, column, notecontent) {
        var i = "#news" + column;
        var l = "label#" + column + "notify";
        if (((type == "0") && ($(i).val() == "")) || ((type == "1") && ($(i).val() == "0"))) {
            $(l).html(notecontent);
        } else {
            $(l).html("");
        };
    }

    //页面载入时进行分页功能的初始化，取出新闻来源及新闻版块的代码即名称。
    $(window).load(function () {
        getOrigin();
        getNewsInTable();
    });

    //新闻维护模态窗口点击保存按钮时，将数据保存（当“新闻流水号”为空时新增记录，否则更新记录）到数据库，弹出提示并关闭模态窗口，然后刷新首页的表格；点击按钮与返回结果之间，按钮变为无法点击状态。
    $("button#save").click(function () {
        getNotes("0", "heading", "新闻标题不能为空！");
        getNotes("0", "content", "新闻内容不能为空！");
        getNotes("1", "origin", "请选择新闻来源！");
        var url = "";
        if ($("#newsid").val() != "") {
            url = "http://localhost:3900/updatenews";
        } else {
            url = "http://localhost:3900/insertnews";
        };
        if (($("#newsheading").val() != "") && ($("#newscontent").val() != "") && ($("#newsorigin").val() != "0")) {
            $.ajax({
                url: url,
                data: {
                    id: $("#newsid").val(),
                    n_heading: $("#newsheading").val(),
                    n_content: $("#newscontent").val(),
                    n_origin: $("#newsorigin").val(),
                },
                method: "post",
                beforeSend: function () {
                    $("button#close").attr({
                        "disabled": "disabled"
                    });
                    $("button#delete").attr({
                        "disabled": "disabled"
                    });
                    $("button#save").attr({
                        "disabled": "disabled"
                    });
                },
                success: function (data) {
                    alert(data.msg);
                    $("button#close").removeAttr("disabled");
                    $("button#delete").removeAttr("disabled");
                    $("button#save").removeAttr("disabled");
                    $("#newsmodal button#close").click();
                    getNewsInTable();
                }
            });
        };
    });

    //新闻维护模态窗口点击删除按钮时，在数据库中将数据打上删除标志（status = 0），弹出提示并关闭模态窗口，然后刷新首页的表格；点击按钮与返回结果之间，按钮变为无法点击状态。
    $("button#delete").click(function () {
        if ($("#newsid").val() == "") {
            alert("删除失败！");
        } else {
            $.ajax({
                url: "http://localhost:3900/deletenews/" + $("#newsid").val(),
                beforeSend: function () {
                    $("button#close").attr({
                        "disabled": "disabled"
                    });
                    $("button#delete").attr({
                        "disabled": "disabled"
                    });
                    $("button#save").attr({
                        "disabled": "disabled"
                    });
                },
                success: function (data) {
                    alert(data.msg);
                    $("button#close").removeAttr("disabled");
                    $("button#delete").removeAttr("disabled");
                    $("button#save").removeAttr("disabled");
                    $("#newsmodal button#close").click();
                    getNewsInTable();
                }
            })
        }
    });

    //为模态窗口绑定事件，当点击链接时返回该链接对应的新闻信息，使之可以进行修改和删除
    $('#newsmodal').on('show.bs.modal', function (event) {
        var a = $(event.relatedTarget);
        var id = a.data('whatever');
        var modal = $(this);
        modal.find(".modal-body input#newsid").val(id);
        getNewsInModal(id, "n_heading", $("#newsheading"));
        getNewsInModal(id, "n_content", $("#newscontent"));
        getNewsInModal(id, "n_origin", $("#newsorigin"));
    });
})()