<?php
if(isset($_FILES["file"]))
{
	move_uploaded_file($_FILES["file"]["tmp_name"], $_GET["nomimage"].".jpg");
}
?>