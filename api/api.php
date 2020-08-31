<?php

	session_start();

	require "../vendor/autoload.php";

	function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}


	$client = new MongoDB\Client;

	$main_db = $client -> voting_db;

	$users = $main_db -> users;

	$campaigns = $main_db -> campaigns;

	$votes = $main_db -> votes;

	if(!isset($_SESSION['cnp'])) $_SESSION['cnp'] = "none";

	if(!isset($_SESSION['target_campaign'])) $_SESSION['target_campaign'] = "none";

	if(!isset($_SESSION['campaign'])) $_SESSION['campaign']	= "none";

	if(isset($_GET['q']))
	{
		$query = htmlspecialchars($_GET['q']);
		
		if($query == "9iGyYTJOEY")
		{
			//check logged in
			if($_SESSION['cnp'] == "none")
			{
				echo "0";
			}
			else
			{
				echo "1";
			}
		}

		if($query == "1qH5BwXYrY")
		{

			if(isset($_GET['d1']))
			{
				$cnp = $_GET['d1'];
				if(strlen($cnp) == 13)
				{
					$ok = 1;
					for ($i=0; $i < strlen($cnp); $i++) { 
						if( ord($cnp[$i]) < 48 || ord($cnp[$i]) > 57 ) 
						{
							$ok = 0;
							break;
						}
					}
					if($ok == 0) echo "cnp_format_failed";
					else
					{
						//checking if exists in the db
						$f = $users->findOne([
							'cnp' => $cnp,
						]);
						if(!isset($f['_id']))
						{
							$code = generateRandomString(40);
							$insertOneResult = $users->insertOne([
							    'cnp' => $cnp,
							    'voted' => '',
							    'unique_code' => $code,
							]);

							echo $code;
						}
						else
						{
							echo "cnp_already_exists";
						}
					}
				}
				else
				{
					echo "cnp_format_failed";
				}
			}

		}
		if($query == "rkziiLU2YL")
		{
			if($_SESSION['cnp'] == "adm1n")
			{
				echo "1";
			}
			else echo "0";
		}
		if($query == "fu1qXajFkp")
		{

			if($_SESSION['cnp'] == "adm1n")
			{
				if(isset($_GET['d1'])) $camp_data = $_GET['d1'];
				$dd1 = explode("/***/", $camp_data);
				$dd2 = explode("/**/", $dd1[1]);
				$votes_count_special = "";
				foreach ($dd2 as $k) {
					$votes_count_special = $votes_count_special.$k."_"."0"."/**/";
				}
				$votes_count_special = substr_replace($votes_count_special, "", -4);

				//get year

				$current_year = date("Y");

				$insertOneResult = $campaigns->insertOne([
							    'type' => $dd1[0],
							    'status' => '0',
							    'vote_evidence' => $votes_count_special,
							    'total_number_of_votes' => '0',
							    'year' => $current_year
				]);

				echo "campaign_created_s";

			}

		}
		if($query == "IqoWPsgiCN")
		{
			if(isset($_GET['d1']))
			{

				$dd = $_GET['d1'];
				$dd_split = explode("/***/", $dd);
				$cnp_login = $dd_split[0];
				$cnp_code = $dd_split[1];

				$f = $users->findOne([
					'cnp' => $cnp_login,
				]);

				if(isset($f['_id']))
				{
					if($cnp_code == $f['unique_code'])
					{
						$_SESSION['cnp'] = $f['cnp'];
						echo "1";
					}
					else echo "Codul unic nu este corect!";
				}
				else
				{
					echo "Cnp-ul introdus nu este inregistrat in baza de date!";
				}

			}
		}
		if($query == "lNOCgqTqi1")
		{
			$_SESSION['cnp'] = "none";
			echo "1";
		}
		if($query == "qFPBqKalcd")
		{


			$f2 = $campaigns -> find();

			$send_data = "";

			foreach ($f2 as $key => $value) {
				$send_data .= $value['type']."/***/".$value['status']."/***/".$value['year']."/***/".$value['_id']."/*!*/" ; 
			}

			$send_data = substr_replace($send_data, "", -5);

			echo $send_data;

		}
		if($query == "wJ9u6EsC9Y")
		{

			if(isset($_GET['d1'])) $camp_data = $_GET['d1'];

			if($_SESSION['cnp'] == "adm1n")
			{

				$updateResult = $campaigns->updateOne(
			    [ '_id' => new MongoDB\BSON\ObjectID( $camp_data ) ],
			    [ '$set' => [ 'status' => '1' ]]
			);

			}

		}

		if($query == "PAIMnK5H3b")
		{

			if(isset($_GET['d1'])) $camp_data = $_GET['d1'];

			if($_SESSION['cnp'] == "adm1n")
			{

				$updateResult = $campaigns->updateOne(
			    [ '_id' => new MongoDB\BSON\ObjectID( $camp_data ) ],
			    [ '$set' => [ 'status' => '2' ]]
			);

			}

		}
		if($query == "EJXzPfGbsP")
		{
			$_SESSION['target_campaign'] = $_GET['d1'];
			echo "1";
			//echo $_SESSION['target_campaign'];
		}		
		if($query == "wZU39C8wKz")
		{
			if($_SESSION['cnp'] != "none")
			{
				$q = $campaigns->findOne([
					'_id' => new MongoDB\BSON\ObjectID( $_SESSION['target_campaign'] ),
				]);

				if(isset($q['_id']))
				{
					$v = $votes -> findOne([
						'from' => $_SESSION['cnp'],
						'which' => (string)$q['_id']
					]);
					if(!isset($v['_id'])) echo $q['vote_evidence']."/**/".$q['_id'];
					else echo "0";
				}
				else
				{
					echo "0";
				}

			}
			else
			{
				echo "0";
			}
		}
		if($query == "2IAnNEhqtN")
		{
			if(isset($_GET['d1'])) $vote_data = $_GET['d1'];
			$q_split = explode("_", $vote_data);
			$vote_id = $q_split[1];
			$vote_name = $q_split[0];
			$campaign_id = $q_split[2];
			if($_SESSION['cnp'] != "none")
			{
				$f = $campaigns->findOne([
					"_id" => new MongoDB\BSON\ObjectID( $campaign_id )
				]);
				if(isset($f['_id']))
				{
					$v = $votes -> findOne([
						'from' => $_SESSION['cnp'],
						'which' => (string)$f['_id']
					]);
					if(!isset($v['_id']))
					{
						$f_split = explode("/**/", $f['vote_evidence']);
						$t = $f_split[$vote_id];
						$t_split = explode("_", $t);
						$target_reassemble = $t_split[0]."_".(intval($t_split[1])+1);
						$new_f = "";
						for ($i=0; $i <sizeof($f_split); $i++) {
							if($f_split[$i] == $t)
							{
								$new_f .= $target_reassemble."/**/";
							}
							else
							{
								$new_f .= $f_split[$i]."/**/";
							}
						}
						$new_f = substr_replace($new_f, "", -4);
						$new_nr_of_votes = intval($f['total_number_of_votes'])+1;
						//echo $new_f." ".$new_nr_of_votes;
						$updateResult = $campaigns->updateOne(
						    [ '_id' => new MongoDB\BSON\ObjectID( $f['_id'] ) ],
						    [ '$set' => [ 'vote_evidence' => $new_f,'total_number_of_votes' => $new_nr_of_votes ]]
						);
						$votes -> insertOne([
							'from' => $_SESSION['cnp'],
							'who' => $vote_name,
							'which' => $campaign_id 
						]);
					}
				}
			}
		}
		if($query == "E9wdPyeUNs")
		{
			if( $_SESSION['cnp'] != "none" )
			{
				$q = $votes->find([
					"from" => $_SESSION['cnp']
				]);

				$spit = "";

				foreach ($q as $key => $value) {
					$spit .= $value['who']."/**/";
				}

				$spit = substr_replace($spit, "", -4);

				echo $spit;

			}
			else
			{
				echo "0";
			}
		}
		if($query == "a977gReIOo")
		{
			if(isset($_GET['d1']))
			{
				$_SESSION['campaign'] = $_GET['d1'];
				echo "1";
			}
		}
		if($query == "OXTwQTiW41")
		{
			$q = $campaigns -> findOne([
				"_id" => new MongoDB\BSON\ObjectID( $_SESSION['campaign'] )
			]);
			if(isset($q['_id']))
			{
				echo $q['vote_evidence']."/**/".$q['total_number_of_votes'];
			}
			else
			{
				echo "0";
			}
		}


	}




?>