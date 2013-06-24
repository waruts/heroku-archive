// JavaScript Document
/*-------------------------------------------
 	To set/get cookie with js
-------------------------------------------*/

function getCookie(c_name)
{
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	  {
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name)
		{
		return unescape(y);
		}
	  }
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function checkUserAgent() {
	if ( getQuerystring("fullsite")!='yes' ) {
		var platform = getCookie("platform");
		if ( !platform || platform=='' ) {
			$.ajax({
			  type: "GET",
			  url: '/mobilechoice.php',
			  success: function(data){  	
				platform = data;
				setCookie("platform",platform,30);  //keey cookie for 30 days
				redirectMobile( platform ); 
			   }
			});
		
		}
		else {
			redirectMobile( platform );
		}
	}
}

function redirectMobile( platform ) {
	if ( platform=="iphone" || platform=="mobile" ) {
		$("body").prepend('<div id="mobile-msg" style="height: 26px; line-height: 26px; padding: 0 10px; background-color: #666; color: #fff; font-weight: normal; font-size: 11px; border-bottom: 1px solid #fff"><!--span style="font-family: Georgia; color: #fd3; font-weight: normal">Mobile Users:</span--> Go to <a href="http://m.harvard.edu" style="color:#fff">m.harvard.edu</a> for the Harvard Mobile web app <div style="width: 20px; line-height: 26px; float: right; cursor: pointer; text-align:right;" onClick="$(\'#mobile-msg\').hide();">Close </div></div>');
	}
	else if ( platform=="ipad" || platform=="tablet" ) {
		$("body").prepend('<div id="mobile-msg" style="height: 33px; line-height: 33px; padding: 0 10px; background-color: #666; color: #fff; font-weight: normal; font-size: 125%; border-bottom: 1px solid #fff"><img src="/sites/all/themes/hedu2011hc/m/content/ipad.png" width="40" height="40" alt="iPad" style="float: left; margin-bottom: -8px; margin-right: 6px" /><span style="font-family: Georgia; color: #fd3; font-weight: normal">Tablet Users:</span> Go to <a href="http://m.harvard.edu" style="color:#fff">m.harvard.edu</a> for the Harvard Mobile web app <div style="width: 70px; line-height: 33px; float: right; cursor: pointer;text-align:right;" onClick="$(\'#mobile-msg\').hide();">Close </div></div>');
	}
}

function getQuerystring(key, default_)
{
  if (default_==null) default_=""; 
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}