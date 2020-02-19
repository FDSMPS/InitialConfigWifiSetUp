(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);


$(document).ready(function () {
    $('#submitBt').submit(function () {
        var pass = $('#pass').val();
        var ssid = $('#ssid').val();
        var cameraCode = $('#cameraCode').val();
        var data = {};
        data.ssid = ssid;
        data.pass = pass;
        data.cameraCode = cameraCode;
        $('#response').empty().append('<div class="bs-example center-block"><div id="loginalert" class="alert alert-info"><a href="#" data-dismiss="alert" class="close">×</a>Processing...</div></div>');
        $.ajax({
            url: '/',  //Server script to process data
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            async: true,
            success: function (msg) {
                if ('redirect' in msg) {
                    window.location = msg.redirect;
                } else if ('login_error' in msg){
                    $('#response').empty().append(msg.login_error);
                }
            },
            cache: false,
            processData: false
        });
        this.reset();
        return false;
    });
});