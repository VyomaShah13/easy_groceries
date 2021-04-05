
<?php

// GET LIST OF PRODUCTS 

require_once("easy_groceries.class.php");

$oEasyGroceries = new EasyGroceries();

$data = $oEasyGroceries->getProductsRandom();

header("Content-Type: application/json");

echo $data;

?>
