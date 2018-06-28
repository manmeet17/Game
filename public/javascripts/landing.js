$(document).on("initialize-entry", function () {
    $("select").selecty();

    $('.okBtn').on('click', function (e) {
        $("body").addClass("load");
        var $form = $('#credForm');
        var validForm = validateEntryForm($form);

        if (validForm) {

            // clear errors and setup the game
            $('.error').removeClass('email name service location');

            // Populate data to be verified in salesforce
            var data = {};

            // For inputs
            $('#credForm input, #credForm select').each(function (index, ele) {
                data[$(ele).data('params')] = $(ele).val();
            });

            $.ajax({
                url: '/checkUser',
                data: data,
                method: 'POST',
                cache: false,
                success: function (data) {
                    location.href = "/rules/" + data.id;
                    $("body").removeClass("load");
                },
                error: function (err) {
                    location.href = '/';
                    console.log(err);
                    $("body").removeClass("load");
                }
            });
        }
    });

    // Realtime validation email field
    $('#credForm input[type="email"]').bind('blur', function (e) {
        var value = $(this).val().trim();
        var isInvalid = true;
        if (value) {
            $(this).addClass("hasContent"); // Has some text

            if (value && value.split('@').length === 2) {
                if (value.split('@')[1].split('.').length >= 2 && value.split('@')[1].split('.')[0].length > 0 && value.split('@')[1].split('.')[1].length > 0) {
                    isInvalid = false;
                }
            }

            if (isInvalid && value !== '') {
                $(".error").removeClass("service name fill-all location").addClass("email");
            } else {
                $(".error").removeClass("service name email fill-all location");
            }
        } else {
            $(this).removeClass("hasContent"); // Has no text
            $(".error").removeClass("service name fill-all email location");
        }
    });

    $('#credForm input[type="text"]').bind('keydown', function (e) {
        var elem = $(this);
        var KEYS_TO_OMIT = [32, 37, 39, 8, 9];

        if (KEYS_TO_OMIT.indexOf(e.keyCode) === -1) {
            if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123)) {
                return true;
            } else {
                return false;
            }
        }
    }).bind('blur', function (e) {

        if (!$(this).val().trim()) {
            $(this).val('');
        }

    });
});


function validateEntryForm($form) {

    var allFilled = true;

    // Check if inputs are empty or invalid
    $form.find("input").each(function () {
        var $input = $(this);

        if ($input.val() == '') {
            allFilled = false;
        }
    });


    // Check if drop boxes are null
    $form.find("select").each(function () {
        var $select = $(this);

        if ($select.val() == null) {
            allFilled = false;
        }
    });

    allFilled ? $('.error').removeClass('fill-all') : $('.error').removeClass("email name service location").addClass('fill-all');

    return !($('.error').hasClass('fill-all') || $('.error').hasClass('location') || $('.error').hasClass('email') || $('.error').hasClass('name') || $('.error').hasClass('service'));

}
