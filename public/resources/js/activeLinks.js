const currentPage = window.location.pathname.slice(1);    

let removeAllActive = function(){
	document.getElementById("portfolio").classList.remove("active");
	document.getElementById("about").classList.remove("active");
	document.getElementById("contact").classList.remove("active");
	document.getElementById("blog").classList.remove("active");
}

let addActive = function(){
	if (typeof(currentPage) !== 'undefined' && currentPage !== null && currentPage !== ''){
		if(currentPage !== 'home')            
			document.getElementById(`${currentPage}`).classList.add("active");
	}
}

removeAllActive();
addActive();
