
<?php
/*
*
* -------------------------------------------------------
* CLASSNAME:        Mensagem
* GENERATION DATE:  11.06.2015
* FOR MYSQL TABLE:  mensagem
* FOR MYSQL DB:     hcb_criancas
* -------------------------------------------------------
* CODE GENERATED BY:
* @MURANO DESIGN
* -------------------------------------------------------
*
*/



class Mensagem
{ 
private $msg_id;

private $msg_destinatario;
private $msg_remetente;
private $msg_assunto;
private $msg_mensagem;
private $msg_lida;
private $msg_cx_entrada;
private $msg_cx_enviado;
private $msg_tipo_mensagem;
private $msg_data;
private $msg_proprietario;
private $msg_anexo;
private $destinatarios;
private $msg_destinatario_grupo;
private $msg_ativo;



public function Mensagem()
{

}




public function getMsg_id()
{
return $this->msg_id;
}

public function getMsg_destinatario()
{
return $this->msg_destinatario;
}

public function getMsg_remetente()
{
return $this->msg_remetente;
}

public function getMsg_assunto()
{
return $this->msg_assunto;
}

public function getMsg_mensagem()
{
return $this->msg_mensagem;
}

public function getMsg_lida()
{
return $this->msg_lida;
}

public function getMsg_cx_entrada()
{
return $this->msg_cx_entrada;
}

public function getMsg_cx_enviado()
{
return $this->msg_cx_enviado;
}

public function getMsg_tipo_mensagem()
{
return $this->msg_tipo_mensagem;
}

public function getMsg_data()
{
return $this->msg_data;
}

public function getMsg_proprietario()
{
return $this->msg_proprietario;
}

public function getMsg_anexo()
{
return $this->msg_anexo;
}

public function getDestinatarios()
{
return $this->destinatarios;
}

public function getMsg_destinatario_grupo()
{
return $this->msg_destinatario_grupo;
}

public function getMsg_ativo()
{
return $this->msg_ativo;
}


public function setMsg_id($val)
{
$this->msg_id =  $val;
}

public function setMsg_destinatario($val)
{
$this->msg_destinatario =  $val;
}

public function setMsg_remetente($val)
{
$this->msg_remetente =  $val;
}

public function setMsg_assunto($val)
{
$this->msg_assunto =  $val;
}

public function setMsg_mensagem($val)
{
$this->msg_mensagem =  $val;
}

public function setMsg_lida($val)
{
$this->msg_lida =  $val;
}

public function setMsg_cx_entrada($val)
{
$this->msg_cx_entrada =  $val;
}

public function setMsg_cx_enviado($val)
{
$this->msg_cx_enviado =  $val;
}

public function setMsg_tipo_mensagem($val)
{
$this->msg_tipo_mensagem =  $val;
}

public function setMsg_data($val)
{
$this->msg_data =  $val;
}

public function setMsg_proprietario($val)
{
$this->msg_proprietario =  $val;
}

public function setMsg_anexo($val)
{
$this->msg_anexo =  $val;
}

public function setDestinatarios($val)
{
$this->destinatarios =  $val;
}

public function setMsg_destinatario_grupo($val)
{
$this->msg_destinatario_grupo =  $val;
}

public function setMsg_ativo($val)
{
$this->msg_ativo =  $val;
}


} 

?>

