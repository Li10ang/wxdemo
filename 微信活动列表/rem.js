function fontSize(){
		var html = document.getElementsByTagName("html")[0];
		var w = document.documentElement.clientWidth||document.body.clientWidth;
		html.style.fontSize = w*20/750 + "px";
	}