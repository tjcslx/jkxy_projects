require(["jquery", "jcarousel"], function () {
    function ajax(el) {
        var jcarousel = $('.' + el + ' .jcarousel-wrapper .jcarousel').jcarousel();
        var json = './json/' + el + '.json';
        var setup = function (data) {
            var html = '<ul>';

            $.each(data.items, function () {
                html += '<li><img src="' + this.src + '" alt="' + this.title + '"></li>';
            });
            html += '</ul>';
            jcarousel
                .html(html);
            jcarousel
                .jcarousel('reload');
        };
        $('.' + el + ' .jcarousel-wrapper .jcarousel-control-prev')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.' + el + ' .jcarousel-wrapper .jcarousel-control-next')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $.getJSON(json, setup);
    };

    function basic() {
        $('.top .jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function () {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function () {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    };

    (function () {
        ajax('ent');
        ajax('reports');
        ajax('univ');
        basic();
    })();
});