<?php
include("conexion.php");
$sql = 'SELECT * from usuario';
$consulta = mysqli_query($conexion, $sql);
$usuario ="";
//Hay que descomentar esto cuando se haya creado el registro al inicio de la pagina


$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    // Si se encontró el usuario, obtener los datos
    $fila = $resultado->fetch_assoc();
    $usuario = $fila["nickname"];
    $edad = $fila["edad"];
} else {
    // Si no se encontró el usuario, mostrar un mensaje o tomar alguna acción
    echo "Usuario no encontrado";
}

if (isset($_POST['puntos'])) {
    $puntos = $_POST['puntos'];
    $sql = "UPDATE usuario SET puntos='$puntos' WHERE nickname='$usuario'";
    $insertar = mysqli_query($conexion, $sql) ? print("<script>alert('puntos actualizados');</script>") : print('Error al guardar');
}else{
    $sql2 = "SELECT puntos FROM usuario WHERE nickname = '".$usuario."'";
    $punto = mysqli_query($conexion,$sql2);  
    $puntos = mysqli_fetch_assoc($punto);
    $puntos = $puntos['puntos'];
}
    if (isset($_POST['registro'])) {
        $puntos =0;
        $usuario = $_POST['nombre'];
        $edad = $_POST['edadRegistro'];
        $sql = "INSERT INTO usuario (nickname, edad, puntos) VALUES ('$usuario', '$edad', '$puntos')";
        $insertar = mysqli_query($conexion, $sql) ? print("<script>alert('Registro insertado');</script>") : print('Error al guardar');
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AprendeYA!</title>
    <link rel="stylesheet" href="index2.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,700&display=swap" rel="stylesheet">
</head>
<body>
    
        <div class="todo">
        <div class="izquierda">
            <div class="header">
                <img src="imgs/logos/logoLogoChico.png" alt="logo.png">
            </div>
            <div class="contenedor">
                <div class="imagenes" id="imagenes">
                </div>
                <div class="separador"></div>        
                <div class="palabras" id="palabras">
                </div>                        
            </div>
            <div class="instrucciones">
                    <label>selecciona la palabra y la imagen correspondientes, acumula la mayor cantidad de puntos que puedas</label>                
            </div>
        </div>
        
    </div>
    <div class="inicio">
            <form action="" method="post" id="miFormulario" >
                 <h1>Ingresar</h1>
                <input type="text" name="nombre" placeholder="Nombre" id="nombre" value="<?php echo $usuario ?>" required>
                <input type="submit" name="enviar" value="enviar" id="enviar">

                <p id="registroTexto">¿No tiene usuario? Registrese</p>
            </form>

            <form action="" method="post" id="miRegistro" style="display: none;">
            <h1>Registro</h1>
            <input type="text" name="nombre" placeholder="Nombre" id="nombreRegistro" required>
            <input type="number" name="edadRegistro" placeholder="Edad" id="edadRegistro" required>
            <input type="hidden" name="puntos" value="0">
            <input type="submit" name="registro" value="Registrese" id="enviar">

            <p id="loginTexto">Ingresar al juego</p>
            </form>
        
    </div>
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        function mostrarRegistro() {
            let miFormulario = document.getElementById("miFormulario");
            let miRegistro = document.getElementById("miRegistro");
            miFormulario.style.display = "none";
            miRegistro.style.display = "flex";
        }

        function mostrarLogin() {
            let miFormulario = document.getElementById("miFormulario");
            let miRegistro = document.getElementById("miRegistro");
            miFormulario.style.display = "flex";
            miRegistro.style.display = "none";
        }

        let registroTexto = document.getElementById("registroTexto");
        let loginTexto = document.getElementById("loginTexto");

        registroTexto.addEventListener("click", function() {
            mostrarRegistro();
        });

        loginTexto.addEventListener("click", function() {
            mostrarLogin();
        });
    });
</script>
    <?php
include "conexion.php";
if ($_POST) {
    $nombre = $_POST['nombre'];
    $query_consulta = mysqli_query($conexion, "SELECT * FROM usuario WHERE nickname='$nombre'");
    $fila = mysqli_fetch_assoc($query_consulta);
    if ($fila) {
        echo '<style>.inicio{display:none;}</style>';
        ?>
        <?php
        if (isset($_POST['nombre'])) {
            $nombre = $_POST['nombre'];
        
            // Consulta SQL para obtener el usuario y sus puntos
            $sql = "SELECT nickname, puntos FROM usuario WHERE nickname = '$nombre'";
            $consulta = mysqli_query($conexion, $sql);
        
            if (mysqli_num_rows($consulta) > 0) {
                // Si el usuario se encuentra en la base de datos, obtener sus puntos
                $registro = mysqli_fetch_assoc($consulta);
                $puntos = $registro['puntos'];
                $nombre = $registro['nickname'];
        
                // Aquí comienza la sección del marcador
                ?>
                <div class="marcador">
                <div class="titulo">
                <h1>Marcador</h1>
                </div>
                <div class="listado">
                <div class="labels">
                <?php
        
                // Mostrar la información del usuario actual
                
        
                // Consulta SQL para obtener todos los usuarios y sus puntos
                $sql_todos = "SELECT nickname, puntos FROM usuario ORDER BY puntos DESC";
                $consulta_todos = mysqli_query($conexion, $sql_todos);
        
                if (mysqli_num_rows($consulta_todos) > 0) {
                    // Iterar sobre los resultados y mostrar la información de cada usuario
                    while ($registro_todos = mysqli_fetch_assoc($consulta_todos)) {
                        
                            echo '<label>' . $registro_todos['nickname'] . ' - ' . $registro_todos['puntos'] . 'pts</label>';
                        
                    }
                }
        
                echo '</div>';
                echo '</div>';
        
                // Mostrar la información del usuario actual
                echo '<div class="puntos" id="puntaje">';
                echo '<label><p id="nickname">' . $nombre . '- </p></label>';
                echo '<label><p id="puntos">' . $puntos . ' pts</p></label>';
                echo '</div>';
        
                echo '</div>'; // Cierre de <div class="marcador">
            } else {
                echo 'No existe el usuario';
            }
        }
?>
    
<div id="cod"></div>
<script src="imagenes.js"></script> 
<script src="index.js"></script>  

    <?php
        exit;
    } else {
        echo 'No existe el usuario';
    }
}

    ?>     
</body>
</html>