function check_logged_in()
{
		$.ajax({
	  url: "api/api.php?q=9iGyYTJOEY",
	  type:"GET",
	  success: function(data){

	   if(data == "0")
	   {
	   		$("#vote_btn").attr("href","login.html");
	   		$("#my_votes_btn").attr("href","login.html");
	   }
	   else if(data == "1")
	   {
	   		$("#vote_btn").attr("href","index.html#campaigns_now");
	   		$("#my_votes_btn").attr("href","myvotes.html");
	   		var p = '<li class="nav-item" id="logout_btn"><a class="nav-link navbar_text" href="#">Delogheaza-te</a></li>';
	   		document.getElementById("nvbr").innerHTML += p;
	   		$("#logout_btn").attr("onclick","logout()");
	   }

	  }
	});

}
function logout()
{
	$.ajax({
	  url: "api/api.php?q=lNOCgqTqi1",
	  type:"GET",
	  success: function(data){
	   	if(data == "1") window.location.href = "index.html";
	  }
	});
}
function load_campaigns()
{
	$.ajax({
	  url: "api/api.php?q=qFPBqKalcd",
	  type:"GET",
	  success: function(data){
	   	str_spl = data.split("/*!*/");
	   	n_active = 0;
	   	n_started = 0;
	   	n_done = 0;
	   	for (var i = 0; i < str_spl.length; i++) {
	   		final_splt = str_spl[i].split("/***/");
	   		c_name = "";
			if(final_splt[0] == "0") c_name = "Parlamentare";
			if(final_splt[0] == "1") c_name = "Europarlamentare";
			if(final_splt[0] == "2") c_name = "Prezidentiale";
			c_year = final_splt[2];
			document.getElementById("campaigns_now_div").innerHTML = "";
	   		if(final_splt[1] == "0")
	   		{
	   			if( $("body").attr("id") == "1")
	   			{
	   				n_started++;
	   				var qq = '<div class="normal_campaign_div" id="normal_campaign_div_'+i+'" val="'+final_splt[3]+'"><img src="img/r_img1.jpg" class="normal_campaign_div_img"><div style="margin-top: 30px;"></div><h4 style="text-align: center;">Alegeri '+c_name+" "+c_year+'</h6><div style="margin-top: 30px;"></div><button class="btn btn-success c_form_btn" onclick="start_vote('+i+')">Start vot</button></div>';
	   				document.getElementById("campaigns_now_div").innerHTML += qq;
	   			}
	   		}
	   		if(final_splt[1] == "1")
	   		{
	   			 n_active++;
	   			 if( $("body").attr("id") == "1")
	   			 {
	   			 	var qq = '<div class="normal_campaign_div" id="normal_campaign_div_'+i+'" val="'+final_splt[3]+'"><img src="img/r_img1.jpg" class="normal_campaign_div_img"><div style="margin-top: 30px;"></div><h4 style="text-align: center;">Alegeri '+c_name+" "+c_year+'</h6><div style="margin-top: 30px;"></div><button class="btn btn-danger c_form_btn" onclick="stop_vote('+i+')">Stop vot</button></div>';
	   				document.getElementById("campaigns_now_div").innerHTML += qq;	
	   			 }
	   			 else
	   			 {
	   			 	var qq = '<div class="normal_campaign_div" id="normal_campaign_div_'+i+'" val="'+final_splt[3]+'"><img src="img/r_img1.jpg" class="normal_campaign_div_img"><div style="margin-top: 30px;"></div><h4 style="text-align: center;">Alegeri '+c_name+" "+c_year+'</h6><div style="margin-top: 30px;"></div><button class="btn btn-success c_form_btn" onclick="s_vote('+i+')" >Voteaza</button></div>';
	   				document.getElementById("campaigns_now_div").innerHTML += qq;
	   			 }
	   		}
	   		if(final_splt[1] == "2")
	   		{
	   			n_done++;
	   			var qq = '<div class="normal_campaign_div" style="cursor:pointer;" id="normal_campaign_div_'+i+'" val="'+final_splt[3]+'" onclick="go_to_camp('+i+');";><img src="img/r_img1.jpg" class="normal_campaign_div_img"><div style="margin-top: 30px;"></div><h4 style="text-align: center;">Alegeri '+c_name+" "+c_year+'</h6><div style="margin-top: 30px;"></div></div>';
	   			document.getElementById("campaigns_old").innerHTML += qq;
	   		}
	   		if(n_started == 0 && n_active == 0)
	   		{
	   			document.getElementById("campaigns_now_div").innerHTML += '<div class="empty_campaign_div">Nu sunt campanii electorale in desfasurare in acest moment</div>';
	   		}
	   	}
	  }
	});
}
function check_admin()
{
	$.ajax({
	  url: "api/api.php?q=rkziiLU2YL",
	  type:"GET",
	  success: function(data){
	   	
	  	if(data == "1") $("body").attr("id","1");

	  }
	});
}
function start_vote(nr)
{
	var qq = $("#normal_campaign_div_"+nr).attr("val");

	$.ajax({
	  url: "api/api.php?q=wJ9u6EsC9Y&d1="+qq,
	  type:"GET",
	  success: function(data){
	  
	  	window.location.reload();

	  }
	});

}
function stop_vote(nr)
{
	var qq = $("#normal_campaign_div_"+nr).attr("val");

	$.ajax({
	  url: "api/api.php?q=PAIMnK5H3b&d1="+qq,
	  type:"GET",
	  success: function(data){
	  
	  	window.location.reload();

	  }
	});


}

function s_vote(nr)
{
	var qq = $("#normal_campaign_div_"+nr).attr("val");

	$.ajax({
	  url: "api/api.php?q=EJXzPfGbsP&d1="+qq,
	  type:"GET",
	  success: function(data){
	   
	   window.location.href = "vote.html";

	  }
	});

}
function go_to_camp(id)
{
	var v = $("#normal_campaign_div_"+id).attr("val");
	$.ajax({
	  url: "api/api.php?q=a977gReIOo&d1="+v,
	  type:"GET",
	  success: function(data){

	   window.location.href = "analytics.html";

	  }
	});
}
$(document).ready(function(){
	check_logged_in();
	check_admin();
	load_campaigns();
});