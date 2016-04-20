
        <?php
            /*
            *
            * -------------------------------------------------------
            * CLASSNAME:        Periodo
            * GENERATION DATE:  14.04.2016
            * FOR MYSQL TABLE:  periodo
            * FOR MYSQL DB:     hcb_criancas_teste
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
            include_once($path['beans'].'Periodo.php');


            /**
             * Description of PeriodoDAO
             *
             * @author Ana Carolina
             */

            class PeriodoDAO extends DAO{

                public function  __construct() {
                    parent::__construct();
                }

                 
                // **********************
                // INSERT
                // **********************

                public function insertPeriodo($periodo)
                {
                    $sql =  "insert into periodo ( prd_periodo )values";
                    $sql .= "( '".$periodo->getPrd_periodo()."')";
                    return $this->execute($sql);
                }
            
                // **********************
                // DELETE
                // **********************

                public function deletePeriodo($idperiodo)
                {
                    $sql = "delete from periodo where prd_id = $idperiodo";
                    return $this->execute($sql);
                }
            
                // **********************
                // SELECT BY ID
                // **********************

                function selectByIdPeriodo($idperiodo)
                {
                    $sql = "select * from periodo where prd_id = ". $idperiodo."limit 1 ";
                    $result = $this->retrieve($sql);
                    $qr = mysqli_fetch_array($result);
                    $periodo= new Periodo();
                    $periodo->setPrd_id($qr['prd_id']);
$periodo->setPrd_periodo($qr['prd_periodo']);

                    return $periodo;
                }
            
                // **********************
                // SELECT ALL
                // **********************

                function selectByIdPeriodo($idperiodo)
                {
                    $sql = "select * from periodo ";
                    $lista = array();
                    $result = $this->retrieve($sql);
                    while ($qr = mysqli_fetch_array($result)){
                    $periodo= new Periodo();
                    $periodo->setPrd_id($qr['prd_id']);
$periodo->setPrd_periodo($qr['prd_periodo']);

                    array_push($lista,$periodo);
                    };
                    return $lista;
                }
            
                // **********************
                // UPDATE
                // **********************

                function updatePeriodo($idperiodo)
                {
                    $sql = "update periodo set ";
                    $sql .= "prd_periodo = '".$periodo->getPrd_periodo()."',";

                    $sql .= "where $idperiodo = '".$periodo->getPrd_id()."'";
                    return $this->execute($sql);
                }
            }
        ?>