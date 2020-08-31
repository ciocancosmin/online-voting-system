$( document ).ready(function() {
    $('#signup_btn').attr("onclick","send_data()");
});

function send_data()
{
	var qz = $('#signup_cnp').val();
	qz = $.trim(qz);
	$.ajax({
	  url: "api/api.php?q=1qH5BwXYrY&d1="+qz,
	  type:"GET",
	  success: function(data){
	   	c = data.split("_");
	   	if(c.length > 1) 
	   	{
	   		if(data == "cnp_format_failed")
	   		{
	   			create_error("Cnp-ul introdus nu este valid");
	   		}
	   		else if(data == "cnp_already_exists")
	   		{
	   			create_error("Cnp-ul introdus este deja inregistrat");
	   		}
	   	}
	   	else
	   	{
	   		create_success("Codul tau unic generat este: "+data);
	   	}
	  }
	});
}
function create_error(message)
{
	$("#signup_success").css("display","none");
	$("#signup_error").text(message);
	$("#signup_error").css("display","block");
}
function create_success(message)
{
	$("#signup_error").css("display","none");
	$("#signup_success").text(message);
	$("#signup_success").css("display","block");	
}
