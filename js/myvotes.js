function check_logged_in()
{
		$.ajax({
	  url: "api/api.php?q=E9wdPyeUNs",
	  type:"GET",
	  success: function(data){

	   if(data != "0")
	   {

	   		f_split = data.split("/**/");
	   		for (var i = 0; i < f_split.length; i++) {
	   			document.getElementById("camp_1").innerHTML += '<div class="col-md-4"><div class="vote_post"><h3 class="vote_h" >'+f_split[i]+'</h3></div></div>';
	   		}

	   }

	  }
	});

}
check_logged_in();