"use strict";

$(document).ready(function () {
    new WOW().init();
    inlojv_js_getqqinfo();

    $('body').on('click', '.comment-reply-link', function () {
        addComment.moveForm("comment-" + $(this).attr('data-commentid'), $(this).attr('data-commentid'), "respond", $(this).attr('data-postid'));
        return false; // 阻止 a tag 跳转，这句千万别漏了
    });

    $('a[href="#search"]').on('click', function (event) {
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });
    $('#search, #search button.close').on('click keyup', function (event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });
    // Headroom - show/hide navbar on scroll
    if ($('.headroom')[0]) {
        var headroom = new Headroom(document.querySelector("#navbar-main"), {
            offset: 300,
            tolerance: {
                up: 30,
                down: 30
            },
        });
        headroom.init();
    }
    if ($('.prettyprint').length) {
        window.prettyPrint && prettyPrint();
    }
    // Datepicker
    $('.datepicker')[0] && $('.datepicker').each(function () {
        $('.datepicker').datepicker({
            disableTouchKeyboard: true,
            autoclose: false
        });
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Popover
    $('[data-toggle="popover"]').each(function () {
        var popoverClass = '';
        if ($(this).data('color')) {
            popoverClass = 'popover-' + $(this).data('color');
        }
        $(this).popover({
            trigger: 'focus',
            template: '<div class="popover ' + popoverClass + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
    });

    // Additional .focus class on form-groups
    $('.form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // NoUI Slider
    if ($(".input-slider-container")[0]) {
        $('.input-slider-container').each(function () {

            var slider = $(this).find('.input-slider');
            var sliderId = slider.attr('id');
            var minValue = slider.data('range-value-min');
            var maxValue = slider.data('range-value-max');

            var sliderValue = $(this).find('.range-slider-value');
            var sliderValueId = sliderValue.attr('id');
            var startValue = sliderValue.data('range-value-low');

            var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });

            c.noUiSlider.on('update', function (a, b) {
                d.textContent = a[b];
            });
        })
    }

    if ($("#input-slider-range")[0]) {
        var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function (a, b) {
            f[b].textContent = a[b]
        })
    }


    // When in viewport
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function () {
            //alert();
        },
        doOut: function () {
            // Do something to the matched elements as they get off scren
        },
        tolerance: 200,
        throttle: 50,
        toggleClass: 'on-screen',
        debug: false
    });

    // Scroll to anchor with scroll animation
    $('[data-toggle="scroll"]').on('click', function (event) {
        var hash = $(this).attr('href');
        var offset = $(this).data('offset') ? $(this).data('offset') : 0;

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate({
            scrollTop: $(hash).offset().top - offset
        }, 600);

        event.preventDefault();
    });

    // 设置cookie
    function setCookie(a,c){var b=30;var d=new Date();d.setTime(d.getTime()+b*24*60*60*1000);document.cookie=a+"="+escape(c)+";expires="+d.toGMTString()}
    // 获取cookie
    function getCookie(b){var a,c=new RegExp("(^| )"+b+"=([^;]*)(;|$)");if(a=document.cookie.match(c)){return unescape(a[2])}else{return null}}

    // 核心函数
    function inlojv_js_getqqinfo(){

        // 获取cookie
        if(getCookie('user_qq') ){

            // $('div.comment-user-avatar img').attr('src',getCookie('user_avatar'));
            $('#qq').val(getCookie('user_qq'));
        }

        $('#qq').on('blur',function(){
            
            var qq=$('#qq').val(); // 获取访客填在qq表单上的qq数字，其中#qq表示QQ input标签上的id，改成你自己的！
            
            if (qq.length > 0) {

                var i = 0, got = -1, len = document.getElementsByTagName('script').length;
                while (i <= len && got == -1) {
                    var js_url = document.getElementsByTagName('script')[i].src,
                        got = js_url.indexOf('theme.js');
                    i++;
                }
                var ajax_php_url = js_url.replace('theme.js', '../../modules/fun-qqinfo.php');
                // ajax方法获取昵称
                $.ajax({
                    type: 'get',
                    url:ajax_php_url+'?type=getqqnickname&qq='+qq,  // func_getqqinfo.php是后端处理文件，注意路径，127.0.0.1 改成你自己的域名
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: 'portraitCallBack',
                    success: function(data) {
                        // console.log(data);
                        $('#author').val(data[qq][6]);	// 将返回的qq昵称填入到昵称input表单上，其中#author表示昵称input标签上的id，改成你自己的！
                        $('#email').val($.trim(qq)+'@qq.com'); // 将获取到的qq，改成qq邮箱填入邮箱表单，其中#email表示邮箱input标签上的id，改成你自己的！
                        // alert('已获取昵称！'); // 弹出警告
                        setCookie('user_qq',qq);	// 设置cookie
                    },
                    error: function() {
                        $('#qq,#author,#email').val(''); // 如果获取失败则清空表单，注意input标签上的id，改成你自己的！
                        alert('糟糕，昵称获取失败！请重新填写。'); // 弹出警告
                    }
                });
                // 获取头像
                // $.ajax({
                //     type: 'get',
                //     url: 'http://localhost/wordpress/wp-content/themes/lolimeow/modules/fun-qqinfo.php?type=getqqavatar&qq='+qq, // func_getqqinfo.php是后端处理文件，注意路径，127.0.0.1 改成你自己的域名！
                //     dataType: 'jsonp',
                //     jsonp: 'callback',
                //     jsonpCallback: 'qqavatarCallBack',
                //     success: function(data) {
                //         $('div.comment-user-avatar img').attr('src',data[qq]);	// 将返回的qq头像设置到你评论表单区域显示头像的节点上，div.comment-user-avatar img表示头像节点img标签，改成你自己的！
                //         alert('已获取头像！'); // 弹出警告
                //         setCookie('user_avatar',data[qq]);	 // 设置cookie
                //     },
                //     error: function() {
                //         alert('糟糕，获取头像失败了！请重新填写。'); // 弹出警告
                //         $('#qq,#yuao-comt-author,#yuao-comt-email').val(''); // 清空表单
                //     }
                // });
            }

        });
    }
});
