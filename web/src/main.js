$(function () {
    var encode = function () {
        var $str = $('.str-textarea');
        var $b64 = $('.b64-textarea');
        var $type = $('.type-item.active');
        var str = $str.val();
        var b64 = '';

        if (str.length) {
            if ($type.attr('data-type') === 'normal') {
                try {
                    b64 = base64.encodeBase64(str);
                } catch (e) {
                    alert('ERROR: Failed to encodeBase64');
                }
            } else {
                try {
                    b64 = base64.encodeBase64UrlSafe(str);
                } catch (e) {
                    alert('ERROR: Failed to encodeBase64UrlSafe');
                }
            }
            $b64.val(b64);
        }
    };

    var decode = function () {
        var $str = $('.str-textarea');
        var $b64 = $('.b64-textarea');
        var $type = $('.type-item.active');
        var b64 = $b64.val();
        var str = '';

        if (b64.length) {
            try {
                str = base64.decodeBase64(b64);
            } catch (e) {
                alert('ERROR: Failed to decodeBase64');
            }
            $str.val(str);
        }
    };

    $('.btn-to-b64').on('click', encode);
    $('.btn-to-str').on('click', decode);

    $('.type-item').on('click', function () {
        var $this = $(this);

        if (!$this.hasClass('active')) {
            var $str = $('.str-textarea');

            if (!$str.val()) {
                decode();
            }

            $this.parent().find('.active').removeClass('active');
            $this.addClass('active');
            localStorage.setItem('base64.online.type', $this.attr('data-type'));

            encode();
        }
    });

    // (function () {
    //     var type = localStorage.getItem('base64.online.type');

    //     if (type) {
    //         var $type = $('.type-item.' + type);
    //         if ($type[0]) {
    //             $('.type-item.active').removeClass('active');
    //             $type.addClass('active');
    //         }
    //     }
    // })();
});