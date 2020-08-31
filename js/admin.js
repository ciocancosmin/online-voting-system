
var c = 0;

$( document ).ready(function() {
   	loadpage();
   	$("#add_candidate_btn").attr("onclick","add_candidate()");
   	$("#create_campaign_btn").attr("onclick","send_data()");
});

function loadpage()
{
	$.ajax({
	  url: "api/api.php?q=rkziiLU2YL",
	  type:"GET",
	  success: function(data){
	   	
	  	if(data == "1")
	  	{

	  		var div = '<div class="text-center border border-light p-5" id="campaign_form"><p class="h4 mb-4">Creeaza campanie de votare</p><div id="campaign_form_div"><label>Tip de alegeri</label><select class="browser-default custom-select mb-4" id="campaign_type_select"><option>Parlamentare</option><option>Europarlamentare</option><option>Prezidentiale</option></select></div><button class="btn btn-success btn-block" id="add_candidate_btn" onclick="add_candidate()">Adauga candidat</button><button class="btn btn-info btn-block" id="create_campaign_btn" onclick="send_data()">Creaza campania de votare</button></div>';

	  		$("body").append(div);

	  	}

	  }
	});
}

function add_candidate()
{
	document.getElementById("campaign_form_div").innerHTML += ' <input type="text" id="candidate_name_'+c+'" class="form-control mb-4" placeholder="Nume candidat"> ';
	c++;
}

function send_data()
{
	var campaign_type = $('#campaign_type_select').find(":selected").text();
	campaign_type = $.trim(campaign_type);
	var append1 = -1;
	if(campaign_type == "Parlamentare") append1 = 0;
	if(campaign_type == "Prezidentiale") append1 = 2;
	if(campaign_type == "Europarlamentare") append1 = 1;

	final_data = "";

	final_data += append1;
	final_data += "/***/";

	for(var i = 0;i<c;i++)
	{
		var n_candidate = $("#candidate_name_"+i).val();
		$.trim(n_candidate);
		final_data += n_candidate;
		final_data += "/**/";
	}

	final_data = final_data.substring(0, final_data.length - 4);

	$.ajax({
	  url: "api/api.php?q=fu1qXajFkp&d1="+final_data,
	  type:"GET",
	  success: function(data){
	   	
	  	if(data == "campaign_created_s") 
	  	{
	  		window.location.href = 'index.html';
	  	}


	  }
	});

}