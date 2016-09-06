
<?php
/*
*
* -------------------------------------------------------
* CLASSNAME:        Documentos
* GENERATION DATE:  05.09.2016
* FOR MYSQL TABLE:  documento
* FOR MYSQL DB:     hcb
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
include_once($path['beans'].'Documento.php');


/**
 * Description of DocumentosDAO
 *
 * @author MURANO DESIGN
 */

class DocumentoDAO extends DAO{

    public function  __construct($da) {
        parent::__construct($da);
    }

     
    // **********************
    // INSERT
    // **********************

    public function insertDocumentos($documentos)
    {
        $sql =  "insert into documento ( doc_assunto,doc_descricao,doc_arquivo )values";
        $sql .= "( '".$documentos->getDoc_assunto()."','".$documentos->getDoc_descricao()."','".$documentos->getDoc_arquivo()."')";
        return $this->executeAndReturnLastID($sql);
    }

    // **********************
    // DELETE
    // **********************

    public function deleteDocumentos($iddocumentos)
    {
        $sql = "delete from documento where doc_id = $iddocumentos";
        return $this->executeAndReturnLastID($sql);
    }

    // **********************
    // SELECT BY ID
    // **********************

    function selectByIdDocumentos($iddocumentos)
    {
        $sql = "select * from documento where doc_id = ". $iddocumentos."limit 1 ";
        $result = $this->retrieve($sql);
        $qr = mysqli_fetch_array($result);
        $documentos= new Documentos();
        $documentos->setDoc_id($qr['doc_id']);
$documentos->setDoc_assunto($qr['doc_assunto']);
$documentos->setDoc_descricao($qr['doc_descricao']);
$documentos->setDoc_arquivo($qr['doc_arquivo']);

        return $documentos;
    }

    // **********************
    // SELECT ALL
    // **********************

    function  selectAllDocumentos()
    {
        $sql = "select * from documento ";
        $lista = array();
        $result = $this->retrieve($sql);
        while ($qr = mysqli_fetch_array($result)){
        $documentos= new Documentos();
        $documentos->setDoc_id($qr['doc_id']);
        $documentos->setDoc_assunto($qr['doc_assunto']);
        $documentos->setDoc_descricao($qr['doc_descricao']);
        $documentos->setDoc_arquivo($qr['doc_arquivo']);

        array_push($lista,$documentos);
        };
        return $lista;
    }

    // **********************
    // UPDATE
    // **********************

    function updateDocumentos($documentos)
    {
        $sql = "update documento set ";
        $sql .= "doc_assunto = '".$documentos->getDoc_assunto()."',";
$sql .= "doc_descricao = '".$documentos->getDoc_descricao()."',";
$sql .= "doc_arquivo = '".$documentos->getDoc_arquivo()."',";

        $sql .= "where doc_id = '".$documentos->getDoc_id()."'";
        return $this->executeAndReturnLastID($sql);
    }
    
    public function selectDocumentoEnviados()
    {
        $sql  = "select doc.doc_id, doc.doc_assunto, doc.doc_descricao is not null and doc.doc_descricao <> '' as doc_descricao,  doe.*, ( ";
        $sql .=     "select count(dor2.dor_id) > 0 from documento_envio doe2 join documento_retorno dor2 on dor2.dor_envio = doe2.doe_id ";
        $sql .= ") > 0  as  doe_retornos, ( ";
        $sql .=    "select count(dor3.dor_id) > 0 from documento_envio doe3 join documento_retorno dor3 on dor3.dor_envio = doe3.doe_id where doe3.doe_visto = 0 ";
        $sql .= ") as doe_retornos_nao_vistos, (select count(doe4.doe_id) from documento_envio doe4 where doe4.doe_documento = doc.doc_id) ";
        $sql .=    "- (select count(dor4.dor_id) from documento_retorno dor4 join documento_envio doe5 on dor4.dor_envio = doe5.doe_id where doe5.doe_documento = doc.doc_id) > 0 ";
        $sql .= "as doe_retornos_pendentes ";
        $sql .= "from documento doc ";
        $sql .=    "join documento_envio doe on doe.doe_documento = doc.doc_id ";
        $sql .= "group by doe.doe_documento order by doe.doe_data_envio desc;";
        $result = $this->retrieve($sql);
        $retorno = [];
        
        while($qr = mysqli_fetch_array($result)) {
            $doe = new DocumentoEnvio();
            $doe->setDoe_id($qr["doe_id"]);
            $doe->setDoe_data_envio($qr["doe_data_envio"]);
            $doe->setDoe_visto($qr["doe_visto"]);
            $doe->setDoe_retorno($qr["doe_retorno"]);
            $doe->setDoe_documento(new Documento());
            $doe->getDoe_documento()->setDoc_id($qr["doc_id"]);
            $doe->getDoe_documento()->setDoc_assunto($qr["doc_assunto"]);
            $doe->getDoe_documento()->setDoc_descricao($qr["doc_descricao"]);

            array_push($retorno, [
                "documento_envio" => $doe,
                "verificadores" => [
                    "exige_retorno" => intval($qr["doe_retornos"]),
                    "retornos_nao_vistos" => intval($qr["doe_retornos_nao_vistos"]),
                    "retornos_pendentes" => intval($qr["doe_retornos_pendentes"])
                ]
            ]);
        }
        
        return $retorno;
    }
}
?>