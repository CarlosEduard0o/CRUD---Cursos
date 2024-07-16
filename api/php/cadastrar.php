<?php
//Incluir a conexão
// include("conexao.php");

$url = "localhost";
$usuario = "root";
$senha = "";
$base = "api";

// Conexão com o banco de dados MySQL
$conn = new mysqli($url, $usuario, $senha, $base);

// Verifica a conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Recebe os dados enviados via POST
$data = json_decode(file_get_contents("php://input"));

$nomeCurso = $data->nomeCurso;
$valorCurso = $data->valorCurso;

// Prepara a query SQL para inserção
$sql = "INSERT INTO cursos (nomeCurso, valorCurso) VALUES ('$nomeCurso', '$valorCurso')";

if ($conn->query($sql) === TRUE) {
    // Se a inserção foi bem-sucedida, retorna uma mensagem de sucesso
    $response = array("status" => "success", "message" => "Curso cadastrado com sucesso!");
    echo json_encode($response);
} else {
    // Se ocorrer algum erro na inserção, retorna uma mensagem de erro
    $response = array("status" => "error", "message" => "Erro ao cadastrar curso: " . $conn->error);
    echo json_encode($response);
}


$conn->close();


?>