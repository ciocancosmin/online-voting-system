var vote_id = -1;
function select_vote(id)
{
	if(vote_id != -1) $("#vote_pos_button_"+vote_id).attr("class","btn btn-info");
	vote_id = id;
	$("#vote_pos_button_"+id).attr("class","btn btn-danger");
}

function send_vote()
{
	var q = $("#vote_h_id_"+vote_id).text();
	var send = q+"_"+vote_id+"_"+$("body").attr("id");

	$.ajax({
	  url: "api/api.php?q=2IAnNEhqtN&d1="+send,
	  type:"GET",
	  success: function(data){

	  	//alert(data);

	  	window.location.href = "myvotes.html";

	  }
	});

}

function load_votes()
{
	$.ajax({
	  url: "api/api.php?q=wZU39C8wKz",
	  type:"GET",
	  success: function(data){

	  	if(data != "0")
	  	{
	  		f_split = data.split("/**/");
	  		$("body").attr("id",f_split[f_split.length-1]);
	  		for (var i = 0; i < f_split.length-1; i++) {
	  			s_split = f_split[i].split("_");
	  			cand_name = s_split[0]; //here dude here is that thing you need
	  			v_count = s_split[1];	//here dude here is that thing you need
	  			document.getElementById("camp_1").innerHTML += '<div class="col-md-4"><div class="vote_post"><h3 class="vote_h" id="vote_h_id_'+i+'" >'+cand_name+'</h3><button type="button" class="btn btn-info" id="vote_pos_button_'+i+'" onclick="select_vote('+i+');">Selecteaza</button></div></div>';
	  		}
	  		document.getElementById("camp_2").innerHTML += '<div class="col-lg-12"><button type="button" class="btn btn-success" style="width: 100%;" onclick="send_vote()">Voteaza</button></div>';
	  	}

	  }
	});
}

load_votes();

$(document).ready(function(){
	//
});