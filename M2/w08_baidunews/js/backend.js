(function () {
    //以Ajax方式取出需要的代码写入到select元素中，参数tableName为代码表名。
    function getDimension(tableName) {
        $.ajax({
            url: "dimension.php",
            data: {
                tableName: tableName
            },
            success: function (data) {
                var sid = "select#" + tableName;
                var sidmodal = "select#news" + tableName;
                $(sid).append(data);
                $(sidmodal).append(data);
            }
        })
    };

    //Form中的四个元素有变化时，都会运行getNextTenNewsInTable。
    var formArray = [$("input#heading"), $("input#abstract"), $("select#origin"), $("select#category")];
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
        var c = $("select#category").val();
        $.ajax({
            url: "news_table.php",
            data: {
                heading: h,
                abstract: a,
                origin: o,
                category: c
            },
            success: function (data) {
                $("table>tbody").html(data);
            }
        })
    };

    //取出id对应的新闻，并将数据写入到模态窗口的对应元素中。
    function getNewsInModal(id, colName, element) {
        $.ajax({
            url: "news_singlecol.php",
            data: {
                id: id,
                col: colName
            },
            success: function (data) {
                element.val(data);
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
        getDimension("origin");
        getDimension("category");
    });

    //新闻维护模态窗口点击保存按钮时，将数据保存（当“新闻流水号”为空时新增记录，否则更新记录）到数据库，弹出提示并关闭模态窗口，然后刷新首页的表格。
    $("button#save").click(function () {
        getNotes("0", "heading", "新闻标题不能为空！");
        getNotes("0", "content", "新闻内容不能为空！");
        getNotes("1", "origin", "请选择新闻来源！");
        getNotes("1", "category", "请选择新闻版块！");
        if (($("#newsheading").val() != "") && ($("#newscontent").val() != "") && ($("#newsorigin").val() != "0") && ($("#newscategory").val() != "0")) {
            if ($("#newsid").val() != "") {
                $.ajax({
                    url: "update.php",
                    data: {
                        id: $("#newsid").val(),
                        heading: $("#newsheading").val(),
                        content: $("#newscontent").val(),
                        origin: $("#newsorigin").val(),
                        category: $("#newscategory").val()
                    },
                    success: function (data) {
                        alert(data);
                        $("#newsmodal button#close").click();
                        getNewsInTable();
                    }
                });
            } else {
                $.ajax({
                    url: "insert.php",
                    data: {
                        heading: $("#newsheading").val(),
                        content: $("#newscontent").val(),
                        origin: $("#newsorigin").val(),
                        category: $("#newscategory").val()
                    },
                    success: function (data) {
                        alert(data);
                        $("#newsmodal button#close").click();
                        getNewsInTable();
                    }
                });
            };
        };
    });

    //新闻维护模态窗口点击删除按钮时，在数据库中将数据打上删除标志（status = 0），弹出提示并关闭模态窗口，然后刷新首页的表格。
    $("button#delete").click(function () {
        if ($("#newsid").val() == "") {
            alert("删除失败！");
        } else {
            $.ajax({
                url: "delete.php",
                data: {
                    id: $("#newsid").val()
                },
                success: function (data) {
                    alert(data);
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
        getNewsInModal(id, "dnc_id", $("#newscategory"));
    })
})()