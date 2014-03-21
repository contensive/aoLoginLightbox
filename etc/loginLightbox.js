//
// --------------------------------
// Bind all events
//	called from both the page and ajax content updates
// --------------------------------
//
jQuery(document).ready(function(){
	jQuery('body').on('click', '.loginLightbox', function(){ return llOpenLoginLightbox()});
})
//
// --------------------------------
// bind the html form to an ajax submit
// --------------------------------
//
function llBindForm()
{
	// prepare form for ajaxForm serialization
	jQuery('#loginLightboxCon form').ajaxForm();
	// bind submit to handler
	jQuery('#loginLightboxCon form').unbind('submit').submit(llFormSubmit);
}
//
// --------------------------------
// Login Handler Complete
// --------------------------------
//
function llLoginHandlerComplete( response, destinationId )
{
	var urlFix,test;
	test = response;
	test = test.replace( ' ','' );
	test = test.replace( '\n','' );
	test = test.replace( '\t','' );
	test = test.replace( '\r','' );
	if ( test=='' )
	{
		urlFix = window.location.href;
		urlFix = urlFix.replace(/method=logout/i,'a=a');
		window.location = urlFix;
	}
	else
	{
		jQuery('#loginLightboxCon').html(response);
		//jQuery('#loginLightboxFormId').html(response);
		jQuery.fancybox.resize();
		llBindForm();
	}
}
//
// --------------------------------
// lightbox open
// --------------------------------
//
function llOpenLoginLightbox()
{
	cj.ajax.addonCallback('loginLightboxHandler','',llBuildLightbox);
	return false;
}
function llBuildLightbox( lightboxHtml )
{
	jQuery.fancybox({
		'scrolling' : 'no',
		/* 'padding' : 10, */
		'content' : '<div id="loginLightboxCon" custom="asdf">'+lightboxHtml+'</div>',
		'transitionIn' : 'fade',
		'transitionOut' : 'fade',
		'onComplete' : function(){
			jQuery.fancybox.resize();
			llBindForm();
			}
	});
}

//
// --------------------------------
//  submit the form
// --------------------------------
//
function llFormSubmit(e)
{
	e.preventDefault();
	jQuery(e.target).attr('id','loginLightboxFormId');
	var queryString = jQuery(e.target).formSerialize();
	cj.ajax.addonCallback('loginLightboxHandler',queryString,llLoginHandlerComplete,'loginLightboxCon');
	return false;
}
