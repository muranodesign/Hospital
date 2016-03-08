
        <?php
            /*
            *
            * -------------------------------------------------------
            * CLASSNAME:        LiberarCapitulo
            * GENERATION DATE:  07.03.2016
            * FOR MYSQL TABLE:  liberar_capitulo
            * FOR MYSQL DB:     hcb_criancas
            * -------------------------------------------------------
            * CODE GENERATED BY:
            * @MURANO DESIGN
            * -------------------------------------------------------
            *
            */

            session_start();
            $path = $_SESSION['PATH_SYS'];
            include_once($path['DB'].'DataAccess.php');
            include_once($path['DB'].'DAO.php');
            include_once($path['beans'].'LiberarCapitulo.php');


            /**
             * Description of LiberarCapituloDAO
             *
             * @author Ana Carolina
             */

            class LiberarCapituloDAO extends DAO{

                public function  __construct() {
                    parent::__construct();
                }

                 
                // **********************
                // INSERT
                // **********************

                public function insertLiberarCapitulo($liberarcapitulo)
                {
                    $sql =  "insert into liberar_capitulo ( lbr_escola,lbr_capitulo,lbr_status )values";
                    $sql .= "( '".$liberarcapitulo->getLbr_escola()."','".$liberarcapitulo->getLbr_capitulo()."','".$liberarcapitulo->getLbr_status()."'");
                    return $this->execute($sql);
                }
            
                // **********************
                // DELETE
                // **********************

                public function deleteLiberarCapitulo($idliberarcapitulo)
                {
                    $sql = "delete from liberar_capitulo where lbr_id = $idliberarcapitulo";
                    return $this->execute($sql);
                }
            
                // **********************
                // SELECT BY ID
                // **********************

                function selectByIdLiberarCapitulo($idliberarcapitulo)
                {
                    $sql = "select * from liberar_capitulo where lbr_id = ". $idliberarcapitulo."limit 1 ";
                    $result = $this->retrieve($sql);
                    $qr = mysql_fetch_array($result);
                    $liberarcapitulo= new LiberarCapitulo();
                    $liberarcapitulo->setLbr_id($qr[lbr_id]);
$liberarcapitulo->setLbr_escola($qr[lbr_escola]);
$liberarcapitulo->setLbr_capitulo($qr[lbr_capitulo]);
$liberarcapitulo->setLbr_status($qr[lbr_status]);

                    return $liberarcapitulo;
                }
            
                // **********************
                // SELECT ALL
                // **********************

                function selectByIdLiberarCapitulo($idliberarcapitulo)
                {
                    $sql = "select * from liberar_capitulo ";
                    $lista = array();
                    $result = $this->retrieve($sql);
                    while ($qr = mysql_fetch_array($result)){
                    $liberarcapitulo= new LiberarCapitulo();
                    $liberarcapitulo->setLbr_id($qr[lbr_id]);
$liberarcapitulo->setLbr_escola($qr[lbr_escola]);
$liberarcapitulo->setLbr_capitulo($qr[lbr_capitulo]);
$liberarcapitulo->setLbr_status($qr[lbr_status]);

                    array_push($lista,$liberarcapitulo);
                    };
                    return $lista;
                }
            
                // **********************
                // UPDATE
                // **********************

                function updateLiberarCapitulo($idliberarcapitulo)
                {
                    $sql = "update liberar_capitulo set ";
                    $sql .= "lbr_escola = '".$liberarcapitulo->getLbr_escola()."',";
$sql .= "lbr_capitulo = '".$liberarcapitulo->getLbr_capitulo()."',";
$sql .= "lbr_status = '".$liberarcapitulo->getLbr_status()."',";

                    $sql .= "where $idliberarcapitulo = '".$liberarcapitulo->getLbr_id()."'";
                    return $this->execute($sql);
                }
            }
        ?>