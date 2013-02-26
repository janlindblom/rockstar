// This block is from Foundation, no additions.
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

// Here's where the app specific code starts!

// Pattern matching for verifying an email address
function verifyEmail(req) {
  var pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (pattern.test(req)) {
    return true;
  } else {
    return false;
  }
}

// This one is used by the form to provide the right feedback
function emailVerification(text) {
  var hadError = false;
  if (verifyEmail(text)) {
    $("#emailError").text("");
    $("#emailError").removeClass("error");
    hadError = true;
  } else {
    $("#emailError").text("Det där ser inte ut som någon e-postadress!");
    $("#emailError").addClass("error");
  }
  return hadError;
}

// This one is used by the form to check required fields
function checkRequired(elem) {
  var errorField = $(elem).next('small');
  var hadError = false;
  if ($(elem).val() === '') {
    errorField.text('Det här fältet är obligatoriskt!');
    errorField.addClass('error');
    hadError = true;
  } else {
    errorField.text('');
    errorField.removeClass('error');
  }
  return hadError;
}

// This is the submit handler, we override the default to do submit using Ajax
function submitHandler(e) {
  var bandName = $("#band").val();
  // Here's where we override the default submit
  e.preventDefault();
  var errors = false;
  // Check required fields
  $("input[type=text].required").each(function(e) {
    hasError = checkRequired(this);
    if (hasError) {
      errors = hasError;
    }
  });
  
  // Were there any errors?
  if (!errors) {
    // No errors! Submit! Submit!
    $.post("/submit", $("#rockstarForm").serialize(), function(html) {
      // In the success handler, let's overwrite some content with feedback.
      $("#rockstarFormContainer").html(html);
      // Let's fetch some songs!
      // The /topthree route returns the three first tracks by a given artist as JSON.
      $.getJSON("/topthree/"+bandName, function(data) {
        // In the success handler. First overwrite the spinner.
        $("#topthree").html('');
        // And now we make a simple list.
        var items = [];
        $.each(data.tracks, function(key, val) {
          items.push('<li><a href="' + val.href + '">' + val.name + '</a> (<a href="' + val.album.href + '">' + val.album.name + '</a>)</li>');
        });
        $('<ol/>', {html: items.join('')}).appendTo("#topthree");
        // Get a photo too, photos are nice.
        $.getJSON("/image/"+bandName, function(data) {
          $('<img/>', {'src': data.image.url}).appendTo("#topthree");
        });
      });
      $("#rockstarForm").submit(function(e) {
        submitHandler(e);
      });
    });
  }
  return false;
}

// Aaand this one runs as soon as the DOM reaches ready state.
$(document).ready(function($) {
  // Attach validation to the email field
  $("#emailAddress").focusout(function() {
    emailVerification($(this).val());
  });
  // Override the submit function of the form
  $("#rockstarForm").submit(function(e) {submitHandler(e)});
  // Attach validation to required fields
  $("input[type=text].required").focusout(function(e) {
    checkRequired(this);
  });
});
