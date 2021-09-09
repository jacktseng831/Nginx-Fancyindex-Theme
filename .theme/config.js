//
/*------------------------------------*\
    Originally used in Nginxy by @lfelipe1501

    Modified by @jacktseng831
\*------------------------------------*/
// Configure .theme here:
//
//

$(document).ready(function(){
	// Override the headline with breadcrumbs
	//var loc = $("h1").text();
	var loc = window.location.pathname;
	var segments = loc.split('/');
	var breadcrumbs = '';
	var currentPath = '/';
	for (var i = 0; i < segments.length; i++) {
		if (segments[i] !== '') {
			currentPath += segments[i] + '/';
			breadcrumbs += '/<a href="' + currentPath + '" class=\"breadcrumbs\">' + window.unescape(segments[i]) + '<\/a>';
		} else if (segments.length - 1 !== i) {
			currentPath += '';
			breadcrumbs += '<a href="' + currentPath + '" class=\"breadcrumbs\">File System<\/a>';
		}
	}
	$('h1.breadcrumbs').html(breadcrumbs);

	// Establish supported formats.
	var list = new Array();
	var formats = ["bin", "jpg", "gif", "bmp", "png", "html", "css", "zip", "iso", "tiff", "ico", "psd", "pdf", "exe", "rar", "deb", "swf", "7z", "doc", "docx", "xls", "xlsx", "pptx", "ppt", "txt", "php", "js", "c", "c++", "torrent", "sql", "wmv", "avi", "mp4", "mp3", "wma", "ogg", "msg", "wav", "py", "java", "gzip", "jpeg", "raw", "cmd", "bat", "sh", "svg"];
	
	// Scan all files in the directory, check the extensions and show the right MIME-type image.
	$('td a').each(function(){
		var found = 0;
		var arraySplit = $(this).attr('href').split(".");
		var fileExt = arraySplit[arraySplit.length - 1];
	
		for (var i = 0; i < formats.length; i++) {
			if (fileExt.toLowerCase() == formats[i].toLowerCase()) {
				var found = 1;
				var oldText = $(this).text();
				$(this).html('<img class="icons" src="/.theme/icons/' + formats[i] + '.png" style="margin:0px 4px -4px 0px"></img></a>' + oldText);
				return;
			}
		}

		// Add an icon for the go-back link.
		if ($(this).text().indexOf("Parent directory") >= 0) {
			var found = 1;
			var oldText = $(this).text();
			$(this).html('<img class="icons" src="/.theme/icons/home.png" style="margin:0px 4px -4px 0px">' + oldText);
			return;
		}
	

		// Check for folders as they don't have extensions.
		if ($(this).attr('href').substr($(this).attr('href').length - 1) == '/') {
			var found = 1;
			var oldText = $(this).text();
			$(this).html('<img class="icons" src="/.theme/icons/folder.png" style="margin:0px 4px -4px 0px">' + oldText.substring(0, oldText.length - 1));
	
			// Fix for annoying jQuery behaviour where inserted spaces are treated as new elements -- which breaks my search.
			var string = ' ' + $($(this)[0].nextSibling).text();
	
			// Copy the original meta-data string, append a space char and save it over the old string.
			$($(this)[0].nextSibling).remove();
			$(this).after(string);
			return;
		}

		// File format not supported by Better Listings, so let's load a generic icon.
		if (found == 0){
			var oldText = $(this).text();
			$(this).html('<img class="icons" src="/.theme/icons/error.png" style="margin:0px 4px -4px 0px">' + oldText);
			return;
		}
	});
});
