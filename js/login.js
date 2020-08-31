$(document).ready(function(){
	$("#login_btn").attr("onclick","send_login_details()");
});

function send_login_details()
{
	cnp_normal = $.trim( $("#cnp_normal").val() );
	cnp_code = $.trim( $("#cnp_code").val() );
	data_to_send = cnp_normal+"/***/"+cnp_code;
	//ajax
	$.ajax({
	  url: "api/api.php?q=IqoWPsgiCN&d1="+data_to_send,
	  type:"GET",
	  success: function(data){
	   	
	  	if(data == "1") window.location.href = "index.html";
	  	else
	  	{
	  		$("#login_error").text(data);
	  	}

	  }
	});
}