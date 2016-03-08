var timeout;
(function() {
    $("#li_last").hover(function() {
        $(".side").show(200);
    });
    $(".side").mouseleave(function() {
        $(".side").hide(200);
    });
    $(".menu li").each(function(index) {
        var currItem = $(this);
        currItem.click(function() {
            timeout = setTimeout(function() {
                $(".rt .menu .active").removeClass("active");
                $(".rc .active").removeClass("active");
                currItem.addClass("active");
                $(".rc section").eq(index).addClass("active");
            }, 300);
        });
    });
})();
