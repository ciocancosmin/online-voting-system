<?php


	require "../vendor/autoload.php";

	$client = new MongoDB\Client;

	$main_db = $client -> voting_db;

	$users = $main_db -> users;

	$res = $users -> insertOne([
		'cnp' => 'adm1n',
		'unique_code' => 'klausiohannis' 
	]);


?>