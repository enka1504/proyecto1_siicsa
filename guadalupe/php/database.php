<?php

$server = "localhost";
$username = "root";
$password = "";
$database = "practica";

//crear conexión con la base de datos
$db = new mysqli($server, $username, $password, $database);


//Si no se conecta a la bd
if($db->connect_error){
    die("Error al conectar con la BD: ". $db->connect_error);
}

