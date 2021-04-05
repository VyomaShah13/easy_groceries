<?php

// GET LIST OF PRODUCTS BY CATEGORY

$username = $_POST["email"];
$username = addslashes($username);

$password = $_POST["password"];
$password = addslashes($password);

$name_first = $_POST["name_first"];
$name_first = addslashes($name_first);

$name_last = $_POST["name_last"];
$name_last = addslashes($name_last);

$address = $_POST["address"];
$address = addslashes($address);

$city = $_POST["city"];
$city = addslashes($city);

$province = $_POST["province"];
$province = addslashes($province);

$postal_code = $_POST["postal_code"];
$postal_code = addslashes($postal_code);

$same_as = $_POST["same_as"];
$same_as = addslashes($same_as);

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->createAccount($username,$password,$name_first,$name_last, $address, $city, $province, $postal_code, $same_as);

header("Content-Type: application/json");

echo $data;

?>
