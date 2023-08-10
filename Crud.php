<?php
    if (isset($_GET['id_eliminar'])) {
        $id = $_GET['id_eliminar'];
        $img = 'SELECT Foto from usuarios where id = '.$id.'';
        $buscaFoto = mysqli_query($conexion,$img);
        $registro = mysqli_fetch_assoc($buscaFoto);
        if ($registro['Foto'] !== "imgDefault.png") {
        unlink('imagenes/'.$registro['Foto']);
        }
        $sql3 = "DELETE from usuarios where id = '$id' ";
        $eliminar= mysqli_query($conexion, $sql3)? print("<script>alert('borrado');</script>"): print('error al borrar');
    }


                            /*empieza el editar usuario*/
                            
                            if (isset($_POST['Actualizar'])) {
                                $nombre_p = $_POST['nUser'];
                                $contra_p = $_POST['nPass'];
                                $foto_p = $_POST['foto'];
                                $id = $_GET['id_editar'];

                                if(is_uploaded_file($_FILES['foto']['tmp_name'])){
                                    move_uploaded_file($_FILES["foto"]["tmp_name"],$_FILES["foto"]["name"]);
                                $Foto = $_FILES["foto"]["name"];
                                $Foto= redimensionarImg($Foto, 200, 200);
                                unlink($_FILES["foto"]["name"]); //borra la imagen original guardada en la raiz del proyecto 
                                unlink($foto_p);
                                }else{
                                    $Foto = $foto_p;
                                }
                                $sql = "UPDATE usuarios SET Foto='$Foto', usuario='$nombre_p', contrasenia='$contra_p' WHERE id='$id'";
                                $editar= mysqli_query($conexion, $sql) ? print("<script>alert('Usuario editado'); </script>") : print('Error al editar');
                            }
                            
                            /*termina el editar usuario*/

    if(isset($_POST["registrar"])){
        if(is_uploaded_file($_FILES['foto']['tmp_name'])){
            move_uploaded_file($_FILES["foto"]["tmp_name"],$_FILES["foto"]["name"]);
        $Foto = $_FILES["foto"]["name"];
        $Foto= redimensionarImg($Foto, 200, 200);
        unlink($_FILES["foto"]["name"]); //borra la imagen original guardada en la raiz del proyecto 
        }else{
            $Foto="imgDefault.png";
        }
        $usuario = $_POST['nombre'];
        $contra = $_POST['contra'];
        $consulta = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
        $resultado = mysqli_query($conexion, $consulta);
        if (mysqli_num_rows($resultado) > 0) {
            echo '<script>alert("El nombre de usuario ya existe, elija otro nombre.");</script>';
        } else {
            $sql = "INSERT INTO usuarios (Foto, usuario, contrasenia) VALUES ('$Foto', '$usuario', '$contra')";
            $insertar = mysqli_query($conexion, $sql) ? print("<script>alert('Registro insertado');</script>") : print('Error al guardar');
        }
    }
    ?>