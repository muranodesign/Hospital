
<?php
/*
*
* -------------------------------------------------------
* CLASSNAME:        Email
* GENERATION DATE:  11.06.2015
* FOR MYSQL TABLE:  email
* FOR MYSQL DB:     hcb_criancas
* -------------------------------------------------------
* CODE GENERATED BY:
* @MURANO DESIGN
* -------------------------------------------------------
*
*/



class Email
{ 
private $email_id;

private $email_usuario;
private $email_tipo_email;
private $email_identificacao_email;



public function Email()
{

}




public function getMl_id()
{
return $this->email_id;
}

public function getMl_usuario()
{
return $this->email_usuario;
}

public function getMl_tipo_email()
{
return $this->email_tipo_email;
}

public function getMl_identificacao_email()
{
return $this->email_identificacao_email;
}



public function setMl_id($val)
{
$this->email_id =  $val;
}

public function setMl_usuario($val)
{
$this->email_usuario =  $val;
}

public function setMl_tipo_email($val)
{
$this->email_tipo_email =  $val;
}

public function setMl_identificacao_email($val)
{
$this->email_identificacao_email =  $val;
}


} 

?>

