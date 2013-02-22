;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);

function verifyEmail(req) {
  var pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (pattern.test(req)) {
    return true;
  } else {
    return false;
  }
}

function parseBand(fromField) {
    $.get("/topthree/" + encodeURI(fromField.value), function(jsonObject) {
        $("#topThree").html(jsonObject);
    });
}

function emailVerification(text) {
  if (verifyEmail(text)) {
    $("#emailError").text("");
    $("#emailError").removeClass("error");
  } else {
    $("#emailError").text("Det där ser inte ut som någon e-postadress!");
    $("#emailError").addClass("error");
  }
}

function requiredFields() {
  $("input.required").each(function() {
    if ($(this).val() === '') {
      
    }
  });
}

$(document).ready(function($) {
    $("#emailAddress").blur(function() {
      emailVerification($(this).val());
    });
    
    $("#rockstarForm").submit(function(e) {
        e.preventDefault();
        $.post("/submit", $("#rockstarForm").serialize(), function(html) {
            $("#rockstarFormContainer").html(html);
            emailVerification($("#emailAddress").val());
        });
        return false;
    });
});
