<?php
//Variáveis
$url = "localhost";
$usuario = "root";
$senha = "";
$base = "api";

//Conexão
$conexao = mysqli($url, $usuario, $senha, $base);

// Verifica a conexão
if ($conexao->connect_error) {
    die("Connection failed: " . $conexao->connect_error);
}

//Arrumar caracteres especiais
mysqli_set_charset($conexao, "utf8");

?>