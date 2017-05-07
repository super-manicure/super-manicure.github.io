/*
	Miniport by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			desktop: '(min-width: 737px)',
			tablet: '(min-width: 737px) and (max-width: 1200px)',
			mobile: '(max-width: 736px)'
		})
		.viewport({
			breakpoints: {
				tablet: {
					width: 1080
				}
			}
		});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on mobile.
			skel.on('+mobile -mobile', function() {
				$.prioritize(
					'.important\\28 mobile\\29',
					skel.breakpoint('mobile').active
				);
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Scrolly.
			$window.load(function() {

				var x = parseInt($('.wrapper').first().css('padding-top')) - 15;

				$('#nav a, .scrolly').scrolly({
					speed: 1000,
					offset: x
				});

			});

		// ImageViewer
		  $window.load(function() {
        var viewer = ImageViewer();
        $('.image.viewer').click(function (e) {
          var imgSrc = $('img', this).attr('src'),
          highResolutionImage = $(this).data('high-res-img');
          viewer.show(imgSrc, highResolutionImage);
          e.stopPropagation();
          return false;
        });
		  })

    // Form

      $window.load(function() {
        $('#send').click(function(e) {
          $.ajax({
            url: 'https://docs.google.com/forms/d/e/1FAIpQLScdLeHw2Z3fKIYiXqG0_aBUwz0C2u6oES60oDBkrAeBWFkX2w/formResponse',
            type: 'POST',
            data: {
              'entry.1717328734': $('#name', this).val(),
              'entry.176519675': $('#email', this).val(),
              'entry.117322243': $('#message', this).val()
            },
            headers: {
              "Access-Control-Allow-Origin": "https://docs.google.com/forms/d/e/1FAIpQLScdLeHw2Z3fKIYiXqG0_aBUwz0C2u6oES60oDBkrAeBWFkX2w/formResponse"
            },
            beforeSend: function() {
              $('#name, #email, #message, #send', this).attr('disabled', true);
            },
            success: function() {
              $('#send-message').toggle(true);
            },
            completed: function() {
              $('#send-form').toggle(false);
            }
          });
          e.stopPropagation();
          return false;
        });
      })
	});

})(jQuery);