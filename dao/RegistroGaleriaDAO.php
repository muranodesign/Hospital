
<?php
/*
*
* -------------------------------------------------------
* CLASSNAME:        RegistroGaleria
* GENERATION DATE:  21.03.2016
* FOR MYSQL TABLE:  registro_galeria
* FOR MYSQL DB:     hcb_criancas
* -------------------------------------------------------
* CODE GENERATED BY:
* @MURANO DESIGN
* -------------------------------------------------------
*
*/

$path = $_SESSION['PATH_SYS'];
include_once($path['DB'].'DataAccess.php');
include_once($path['DB'].'DAO.php');
include_once($path['beans'].'RegistroGaleria.php');


/**
* Description of RegistroGaleriaDAO
*
* @author Ana Carolina
*/

class RegistroGaleriaDAO extends DAO{

    public function  __construct($da) {
        parent::__construct($da);
    }

 
    // **********************
    // INSERT
    // **********************

    public function insertRegistroGaleria($registrogaleria)
    {
        $sql =  "insert into registro_galeria ( rgg_escola,rgg_usuario,rgg_menu_galeria,rgg_download_galeria,rgg_data )values";
        $sql .= "( '".$registrogaleria->getRgg_escola()."','".$registrogaleria->getRgg_usuario()."','".$registrogaleria->getRgg_menu_galeria()."','".$registrogaleria->getRgg_download_galeria()."','".$registrogaleria->getRgg_data()."')";
        return $this->execute($sql);
    }

    // **********************
    // DELETE
    // **********************

    public function deleteRegistroGaleria($idregistrogaleria)
    {
        $sql = "delete from registro_galeria where rgg_id = $idregistrogaleria";
        return $this->execute($sql);
    }

    // **********************
    // SELECT BY ID
    // **********************

    function selectByIdRegistroGaleria($idregistrogaleria)
    {
        $sql = "select * from registro_galeria where rgg_id = ". $idregistrogaleria."limit 1 ";
        $result = $this->retrieve($sql);
        $qr = mysqli_fetch_array($result);
        $registrogaleria= new RegistroGaleria();
        $registrogaleria->setRgg_id($qr[rgg_id]);
        $registrogaleria->setRgg_escola($qr[rgg_escola]);
        $registrogaleria->setRgg_usuario($qr[rgg_usuario]);
        $registrogaleria->setRgg_menu_galeria($qr[rgg_menu_galeria]);
        $registrogaleria->setRgg_download_galeria($qr[rgg_download_galeria]);
        $registrogaleria->setRgg_data($qr[rgg_data]);

        return $registrogaleria;
    }

    // **********************
    // SELECT ALL
    // **********************

    function selectAllRegistroGaleria()
    {
        $sql = "select * from registro_galeria ";
        $lista = array();
        $result = $this->retrieve($sql);
        while ($qr = mysqli_fetch_array($result)){
        $registrogaleria= new RegistroGaleria();
        $registrogaleria->setRgg_id($qr[rgg_id]);
        $registrogaleria->setRgg_escola($qr[rgg_escola]);
        $registrogaleria->setRgg_usuario($qr[rgg_usuario]);
        $registrogaleria->setRgg_menu_galeria($qr[rgg_menu_galeria]);
        $registrogaleria->setRgg_download_galeria($qr[rgg_download_galeria]);
        $registrogaleria->setRgg_data($qr[rgg_data]);

        array_push($lista,$registrogaleria);
        };
        return $lista;
    }

    // **********************
    // UPDATE
    // **********************

    function updateRegistroGaleria($idregistrogaleria)
    {
        $sql = "update registro_galeria set ";
        $sql .= "rgg_escola = '".$registrogaleria->getRgg_escola()."',";
        $sql .= "rgg_usuario = '".$registrogaleria->getRgg_usuario()."',";
        $sql .= "rgg_menu_galeria = '".$registrogaleria->getRgg_menu_galeria()."',";
        $sql .= "rgg_download_galeria = '".$registrogaleria->getRgg_download_galeria()."',";
        $sql .= "rgg_data = '".$registrogaleria->getRgg_data()."',";

        $sql .= "where $idregistrogaleria = '".$registrogaleria->getRgg_id()."'";
        return $this->execute($sql);
    }

    public function registroGaleriaCountAcessos()
    {
        $sql = "SELECT COUNT(*) FROM registro_galeria WHERE rgg_menu_galeria = 1";
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountDownload()
    {
        $sql = "SELECT COUNT(*) FROM registro_galeria WHERE rgg_download_galeria = 1"; 
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountAcessosEscola($escola)
    {
        $sql = "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "JOIN usuario us ON us.usr_id = rg.rgg_usuario ";
        $sql .= "WHERE rg.rgg_menu_galeria = 1 AND us.usr_perfil < 3 AND rg.rgg_escola = ".$escola;  
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountDownloadEscola($escola)
    {
        $sql =  "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "JOIN usuario us ON us.usr_id = rg.rgg_usuario ";
        $sql .= "WHERE rg.rgg_download_galeria = 1 AND us.usr_perfil < 3 AND rg.rgg_escola = ".$escola; 
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountAcessosProfessor($idProfessor)
    {
        $sql  = "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "JOIN usuario_variavel uv ON uv.usv_usuario = rg.rgg_usuario ";
        $sql .= "JOIN grupo gp ON gp.grp_id = uv.usv_grupo ";
        $sql .= "WHERE gp.grp_professor = ".$idProfessor." AND rgg_menu_galeria = 1";
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountDownloadProfessor($idProfessor)
    {
        $sql  = "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "JOIN usuario_variavel uv ON uv.usv_usuario = rg.rgg_usuario ";
        $sql .= "JOIN grupo gp ON gp.grp_id = uv.usv_grupo ";
        $sql .= "WHERE gp.grp_professor = ".$idProfessor." AND rgg_download_galeria = 1";
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountAcessosGrupo($idGrupo)
    {
        $sql  = "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "JOIN usuario_variavel uv ON uv.usv_usuario = rg.rgg_usuario ";
        $sql .= "WHERE uv.usv_grupo = ".$idGrupo." AND rgg_menu_galeria = 1";
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountDownloadGrupo($idGrupo)
    {
        $sql  = "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "JOIN usuario_variavel uv ON uv.usv_usuario = rg.rgg_usuario ";
        $sql .= "WHERE uv.usv_grupo = ".$idGrupo." AND rgg_download_galeria = 1";
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountAcessosUsuario($idUsuario)
    {
        $sql  = "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "WHERE rg.rgg_usuario = ".$idUsuario." AND rg.rgg_menu_galeria = 1";
        return $this->retrieve($sql)->fetch_row()[0];
    }

    public function registroGaleriaCountDownloadUsuario($idUsuario)
    {
        $sql  = "SELECT COUNT(*) FROM registro_galeria rg ";
        $sql .= "WHERE rg.rgg_usuario = ".$idUsuario." AND rgg_download_galeria = 1";
        return $this->retrieve($sql)->fetch_row()[0];
    }
}
?>