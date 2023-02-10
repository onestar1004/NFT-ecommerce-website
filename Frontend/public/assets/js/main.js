/*----------------------------------------------
1. Preloader
----------------------------------------------*/

$(document).ready(function () {
  "use strict";

  /*----------------------------------------------
    2. Responsive Menu
    ----------------------------------------------*/
  (function ($) {
    "use strict";

    function navResponsive() {
      let navbar = $(".navbar .items");
      let menu = $("#menu .items");

      menu.html("");
      navbar.clone().appendTo(menu);

      $(".menu .icon-arrow-right")
        .removeClass("icon-arrow-right")
        .addClass("icon-arrow-down");
    }

    navResponsive();

    $(window).on("resize", function () {
      navResponsive();
    });

    $(window).on("load", function () {
      navResponsive();
    });
    $(".menu .dropdown-menu").each(function () {
      var children = $(this).children(".dropdown").length;
      $(this).addClass("children-" + children);
    });

    $(".menu .nav-item.dropdown").each(function () {
      var children = $(this).children(".nav-link");
      children.addClass("prevent");
    });

    $(document).on("click", "#menu .nav-item .nav-link", function (event) {
      if ($(this).hasClass("prevent")) {
        event.preventDefault();
      }

      var nav_link = $(this);

      nav_link.next().toggleClass("show");

      if (nav_link.hasClass("smooth-anchor")) {
        $("#menu").modal("hide");
      }
    });
  })(jQuery);

  /*----------------------------------------------
    3. Navigation
    ----------------------------------------------*/
});
