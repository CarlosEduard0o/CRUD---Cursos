<?php

// Verifica se o método HTTP é DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    
    // Recebe os dados enviados na requisição DELETE
    $data = json_decode(file_get_contents("php://input"));
    
    // Verifica se o parâmetro 'id' ou 'nomeCurso' foi passado
    if (isset($_GET['idCurso']) || (isset($data->id) || isset($_GET['nomeCurso']) || isset($data->nomeCurso))) {
        
        // Conexão com o banco de dados MySQL
        $url = "localhost";
        $usuario = "root";
        $senha = "";
        $base = "api";


        $conn = new mysqli($url, $usuario, $senha, $base);

        // Verifica a conexão
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // Inicializa as variáveis
        $idCurso = isset($_GET['idCurso']) ? $_GET['idCurso'] : (isset($data->idCurso) ? $data->idCurso : null);
        $nomeCurso = isset($_GET['nomeCurso']) ? $_GET['nomeCurso'] : (isset($data->nomeCurso) ? $data->nomeCurso : null);

        // Prepara a query SQL para deletar o curso com base no ID ou no nome
        if (!is_null($idCurso)) {
            $sql = "DELETE FROM cursos WHERE idCurso = $idCurso";
        } elseif (!is_null($nomeCurso)) {
            $sql = "DELETE FROM cursos WHERE nomeCurso = '$nomeCurso'";
        } else {
            // Se nenhum parâmetro válido for fornecido, retorna um JSON com mensagem de erro
            header('Content-Type: application/json');
            echo json_encode(array('error' => 'Parâmetros inválidos. É necessário fornecer "idCurso" ou "nomeCurso"'));
            exit;
        }

        // Executa a query SQL
        if ($conn->query($sql) === TRUE) {
            // Retorna um JSON com mensagem de sucesso
            header('Content-Type: application/json');
            echo json_encode(array('message' => 'Curso removido com sucesso'));
        } else {
            // Retorna um JSON com mensagem de erro
            header('Content-Type: application/json');
            echo json_encode(array('error' => 'Erro ao remover curso: ' . $conn->error));
        }

        $conn->close();
    } else {
        // Se nenhum parâmetro 'id' ou 'nomeCurso' foi passado, retorna um JSON com mensagem de erro
        header('Content-Type: application/json');
        echo json_encode(array('error' => 'É necessário fornecer "idCurso" ou "nomeCurso" para remover o curso'));
    }

} else {
    // Se o método HTTP não for DELETE, retorna um JSON com mensagem de erro
    header('Content-Type: application/json');
    echo json_encode(array('error' => 'Método HTTP inválido. Esperado DELETE'));
}
?>
