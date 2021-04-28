jQuery(function($) {
    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
            $(".sidebar-dropdown").removeClass("active");
            $(this).parent().removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this).next(".sidebar-submenu").slideDown(200);
            $(this).parent().addClass("active");
        }
    });
    $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
    });
    $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
    });
    $("body").on("keypress", ".angka", function(s) {
        var i = s.which ? s.which : event.keyCode;
        return i > 31 && (48 > i || i > 57) && 45 != i && 46 != i ? !1 : !0
    }), $("body").on("focus", ".angka", function() {
        0 == $(this).val() && $(this).val("")
    }), $("body").on("blur", ".angka", function() {
        "" == $(this).val() && $(this).val(0)
    }), $("input").keypress(function(s) {
        13 == s.keyCode && s.preventDefault()
    });
});
