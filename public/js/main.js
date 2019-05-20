/* eslint-disable no-invalid-this,no-undef,filenames/no-index,consistent-return,no-shadow,no-restricted-globals,func-names */
$(() => {
	// Carousel
	const $item = $('.carousel .item');
	let $wHeight = $(window).height();
	$item.eq(0).addClass('active');
	$item.height($wHeight * 0.95);
	$item.addClass('full-screen');

	$('.carousel img').each(function () {
		const $src = $(this).attr('src');
		const $color = $(this).attr('data-color');
		$(this).parent().css({
			'background-image': `url(${$src})`,
			'background-color': $color,
		});
		$(this).remove();
	});

	$(window).on('resize', () => {
		$wHeight = $(window).height();
		$item.height($wHeight);
	});

	$('.carousel').carousel({
		interval: 10000,
		pause: 'false',
	});

	$('a.toscroll').on('click', (e) => {
		const url = e.target.href;
		const hash = url.substring(url.indexOf('#') + 1);
		$('html, body').animate({
			scrollTop: $(`#${hash}`).offset().top,
		}, 500);
		return false;
	});

	// Center-button shadow
	$('.center-button').hover(
		() => $('#shadow').css('box-shadow', '-5px 150px 500px 233px rgba(255,255,255,1)'),
		() => $('#shadow').css('box-shadow', '-5px 150px 500px 233px rgba(255,255,255,0.8)'),
	);

	// initialize Comparisons;
	setTimeout(() => {
		$('.twentytwenty-container').twentytwenty({
			no_overlay: true,
		});
	}, 100);

	// Contact-form
	$('#contact-form').on('submit', (e) => {
		if (!e.isDefaultPrevented()) {
			const url = '/mail';
			const data = {
				address: $('#email').val(),
				subject: $('#message').val(),
			};

			$.ajax({
				type: 'POST',
				url: url,
				data: data,
				success: function (data) {
					const messageAlert = `alert-${data.type}`;
					const messageText = data.message;

					const alertBox = `<div class="alert ${messageAlert} alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>${messageText}</div>`;

					if (messageAlert && messageText) {
						$('#contact').find('.messages').html(alertBox);
						$('#contact-form')[0].reset();
						location.hash = '#contact';
					}
				},
			});
			return false;
		}
	});
});