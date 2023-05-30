<?php

require_once('database.php');

$search_cantantes = $_POST['search_cantantes'];

//cadena de consulta
$query = "SELECT id, first_name , last_name FROM cantantes WHERE first_name LIKE '%".$search_cantantes."%' OR last_name LIKE '%".$search_cantantes."%'";

$cantantes = [];
$errors = ['data' => false];

$getCantantes = $db->query($query);

if($getCantantes->num_rows > 0) {
    while($data = $getCantantes->fetch_assoc()){
        $cantantes[] = $data;
    }
    echo json_encode($cantantes);
}else{
    echo json_encode($errors);
}

?>