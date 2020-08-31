var vote_id = -1;
function select_vote(this,id)
{
	if(vote_id != -1) $("#vote_pos_button_"+vote_id).attr("class","btn btn-info");
	vote_id = id;
	$(this).attr("class","btn btn-danger");
}

$(document).ready(function(){
	vote_id = -1;
});