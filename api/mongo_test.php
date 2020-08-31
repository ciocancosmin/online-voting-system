<?php

	require "../vendor/autoload.php";

	$client = new MongoDB\Client;

	$main_db = $client -> voting_db;

	$users = $main_db -> users;

	$campaigns = $main_db -> campaigns;

	$f = $users->findOne([
		'cnp' => '1234567890123',
	]);

	//echo $f['unique_code'];

	//$f2 = $campaigns -> find();

	//$send_data = "";

	//foreach ($f2 as $key => $value) {
	//	$send_data .= $value['type']."/***/".$value['status']."/***/".$value['year']."/***/" ; 
	//}

	//$send_data = substr_replace($send_data, "", -5);

	//echo $send_data; 

	//$insertOneResult = $users->insertOne([
    //'cnp' => '0000000000001',
  //  'voted' => '1;2/*/2;3'
//]);

	//var_dump($insertOneResult);

?>