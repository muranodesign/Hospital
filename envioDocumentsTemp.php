<style>
.envio_documentos_container {
  padding-left: 15px;
}

.envio-doc-panel {
  position: relative;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 15px;
}
h3 {
  color: #45871e;
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 15px;
}
h4 {
  margin-top: 8px;
  margin-bottom: 18px;
}
.filtro-envio-doc {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 150px;
}
.envio-doc-lista {
  border-top: 1px solid #cfcfcf;
  padding: 10px 0;
  height: 379px;
  overflow: hidden;
}
.envio-doc {
  margin: 5px 0;
  padding: 8px 12px;
  border-radius: 5px;
  background-color: #fff;
}
.envio-doc > .envio-doc-label:not(:empty) {
  margin-top: 10px;
}
.envio-doc-header > span {
  display: block;
  float: left;
  /*overflow: hidden;*/
}
.envio-doc-title {
  width: 75%;
  font-size: 16px;
  line-height: 1.2em;
}
.clickable {
  cursor: pointer;
}
.envio-doc-date {
  width: 25%;
  font-size: 16px;
  color: #999;
}
.envio-doc-header::after {
  content: "";
  display: block;
  width: 100%;
  clear: both;
}

.envio-doc-icones {
  font-size: 16px;
}
.envio-doc-icones > span {
  position: relative;
}
.envio-doc-icones > span:not(:last-of-type) {
  margin-right: 8px;
}
.envio-doc-icones > span:hover > .icon-label {
  display: block;
}
.icon-label::before {
  z-index: 1;
  position: absolute;
  transform-origin: center;
  transform: rotate(45deg);
  border: inherit;
  background-color: inherit;
  content: "";
  width: 10px;
  height: 10px;
  left: 10px;
  top: -6px;
  border-right: none;
  border-bottom: none;
}
.icon-label {
  font-family: "Source sans pro", Helvetica, Arial, sans-serif;
  z-index: 2;
  display: none;
  position: absolute;
  padding: 6px;
  background-color: #fff;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  width: 150px;
  left: -10px;
  top: 25px;
}
.envio-doc-modal::after {
  content: "";
  display: block;
  width: 100%;
  clear: both;
}

.envio-doc-modal .envio-doc-panel {
  margin-bottom: 0;
}

.envio-doc-modal .envio-doc-lista {
  height: 184px;
}

.envio-doc-modal h3 {
  margin-bottom: 5px;
}
.envio-doc-modal h5 {
  margin-bottom: 5px;
  color: #999;
  font-size: 16px;
}
.envio-doc-modal h6 {
  margin-top: 5px;
  margin-bottom: 10px;
  color: #999;
}
.envio-doc-modal h6:last-of-type {
  margin-bottom: 20px;
}
.envio-doc-modal .envio-doc-modal-body p {
  margin-top: 5px;
  margin-bottom: 15px;
}
.envio-doc-modal .envio-doc-modal-body p:last-child {
  margin-bottom: 0;
}
.envio-doc-modal .envio-doc-modal-body p > .glyphicon {
  margin-right: 5px;
}

.envio-doc-icones > .text-success,
.icon-label > span.text-success {
  color: #4b9c4c;
}

/* Barra de rolagem personalizada */

.mCustomScrollbar:not(.mCS_no_scrollbar) > .mCustomScrollBox > .mCSB_container {
  margin-right: 22px !important;
}
</style>

<h3>Envio de documentos</h3>
<div class="envio-doc-panel">
  <h4>Documentos enviados</h3>
  <input id="filtroEnviosDoc" onkeyup="filtrarPanelList('filtroEnviosDoc')" class="form-control filtro-envio-doc" type="text" name="filtro-envio-doc" placeholder="Pesquisar" />
  <div id="envioDocumentosLista" class="envio-doc-lista">
    <div class="alert alert-warning">Carregando...</div>
  </div>
</div>
<div id="envioDocumentosActions">
  <div class="envio-doc-btns text-right">
    <button type="button" class="btn" onclick="">Finalizar</button>
    <button type="button" class="btn btn-primary" onclick="viewFormNovoEnvioDocumento()">Novo envio</button>
  </div>
</div>
<!-- TESTE -->
<script>
  window.onload = function() {
    document.querySelectorAll(".envio-doc-title").forEach(function(envio) {
      envio.onclick = function() {
          showModalEnvioDoc();
          getInfoEnvioDoc();
      }
    });
  }
</script>
