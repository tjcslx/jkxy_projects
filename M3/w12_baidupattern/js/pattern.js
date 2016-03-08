/*
此处使用了单例模式及工厂模式：通过单例方式建立了singleton类；建立了jqFactory工厂类，定义一个接口即jqFactory.interface，创建了两个类side和section，这个接口由子类决定实例化哪一个类。
*/
require(['jquery'], function () {
    var singleton = function (fn) {
        var result;

        function init() {
            fn.apply(this, arguments);
        };
        return {
            getInstance: function () {
                return (!result? init(): result);
            }
        }
    };

    var jqFactory = {};
    jqFactory.side = function () {
        $('#li_last').hover(function () {
            $('.side').show(200);
        });
        $('.side').mouseleave(function () {
            $('.side').hide(200);
        });
    };

    jqFactory.section = function () {
        $('.menu li').each(function (index) {
            var currItem = $(this);
            currItem.click(function () {
                timeout = setTimeout(function () {
                    $('.rt .menu .active').removeClass('active');
                    $('.rc .active').removeClass('active');
                    currItem.addClass('active');
                    $('.rc section').eq(index).addClass('active');
                }, 300);
            });
        });
    };

    /*工厂接口*/
    jqFactory.inferface = function (para) {
        return new jqFactory[para]();
    };

    /*s1、s2为singleton单例的实例化*/
    var s1 = singleton(function () {
        return jqFactory.inferface('side');
    });
    s1.getInstance();
    s1 = null;
    var s2 = singleton(function () {
        return jqFactory.inferface('section');
    });
    s2.getInstance();
});