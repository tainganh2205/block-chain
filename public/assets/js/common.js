$(document).ready(function() {
	$('.c-slider').slick({
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: false,
		autoplaySpeed: 3000,
	});

	$('.c-header__toggle').click(function(){
		$('.c-bgheader').toggleClass('is-active');	
		$(this).toggleClass('is-active');
		$(this).parents('.c-header').find('.c-nav').toggleClass('is-active');		
	});
	
	$('.c-darkmode input[name="darkmode"]').change(function(){
		if(!$('.c-darkmode input[name="darkmode"]').prop('checked')){
			$('body').removeClass('is-dark');
			$('.c-header__logo img').attr('src','assets/images/logo-light.png');
		}else{			
			$('body').addClass('is-dark');
			$('.c-header__logo img').attr('src','assets/images/logo-dark.png');
		}
	});

	if($('body').hasClass('is-dark')) {
		$('.c-header__logo img').attr('src','assets/images/logo-dark.png');
	}
});