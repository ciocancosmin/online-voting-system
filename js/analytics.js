function load_analytics()
{
    $.ajax({
      url: "api/api.php?q=OXTwQTiW41&d1",
      type:"GET",
      success: function(data){

        if(data != "0")
        {
            var data_votes = []
            var data_s = []
            f_split = data.split("/**/");
            total_vote_nr = f_split[f_split.length-1];
            for (var i = 0; i < f_split.length-1; i++) {
                s_split = f_split[i].split("_");
                vote_nr = parseInt(s_split[1]);
                vote_name = s_split[0];

                data_to_push = []
                data_to_push.push(vote_nr);

                data_s.push({
                    seriesType:"bar",
                    collectionAlias:vote_name,
                    data:data_to_push
                });

            }

            $("#chart2").shieldChart({
                exportOptions: {
                    image: false,
                    print: false
                },
                axisY: {
                    title: {
                        text: "Numar de voturi"
                    }
                },
                dataSeries: data_s
            });


        }

      }
    });
}
$(document).ready(function(){
   load_analytics(); 
});