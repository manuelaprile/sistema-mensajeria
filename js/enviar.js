let user = sessionStorage.getItem("usuario");
var datos =JSON.parse(user)
var id = JSON.parse(datos.id)




function cargarcontacto(){

  cargar = new XMLHttpRequest();
  cargar.onreadystatechange=function(){
      if (cargar.readyState == 4) {
          if (cargar.status == 200) {
              var contactos = JSON.parse(cargar.responseText)
              for (var i=0; i < contactos.length; i++){
                  let contacto = document.querySelector("select")
                  contacto.innerHTML += `
                                        <option value="${contactos[i].id}">${contactos[i].nombre}</option>
                                      `
              } 
          }
      }
      
  }
  cargar.open("GET",`http://santiagots-001-site5.dtempurl.com/api/Usuarios/${id}/Contactos`, true);
  cargar.send();
}



function enviar(event){
  debugger;
  var envio=
  {
    "texto": document.querySelector('textarea').value,
    "idDestinatario": document.getElementById("idcontacto").value,
    "idRemitente": id
  }                  
  console.log(envio); 
  enviar = new XMLHttpRequest();
  enviar.onreadystatechange=function(){
      if (enviar.readyState == 4) {
          if (enviar.status == 201) {
              mensaje("Mensaje enviado correctamente","exito");
              }
      }
  }
      
  enviar.open("POST",`http://santiagots-001-site5.dtempurl.com/api/Mensajes`, true);
  enviar.setRequestHeader('Content-type','application/json');
  enviar.send(JSON.stringify(envio));
  event.preventDefault()
}

function verificarMensaje(){
  esValido = true;
  var envio=
  {
    "texto": document.querySelector('textarea').value,
    "idDestinatario": document.getElementById("idcontacto").value,
    "idRemitente": id
  }
  if (document.querySelector('textarea').value.length == 0){
    mensaje("Los campos no pueden ser vacíos");
    return esValido = false;
  }
  return esValido;
}

function enviarMensaje(event){
  if (verificarMensaje()){
    enviar(event)
  }
}


function cargadoOK(){
  cargarcontacto();
  var form = document.querySelector("#envio");
  form.addEventListener("submit", enviarMensaje);
}


window.addEventListener('load',cargadoOK)
