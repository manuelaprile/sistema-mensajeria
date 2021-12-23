let user = sessionStorage.getItem("usuario");
var datos =JSON.parse(user)
var id = JSON.parse(datos.id)


function cargarcontacto(event){
    var nombre = document.querySelector("#texto").value;
    let select = document.querySelector('select');
    select.innerHTML='';
    cargar = new XMLHttpRequest();
    cargar.onreadystatechange=function(){
        debugger;
        if (cargar.readyState == 4) {
            if (cargar.status == 200) {
                var contactos = JSON.parse(cargar.responseText)
                for (var i=0; i < contactos.length; i++){
                    let contacto = document.querySelector('select')
                    contacto.innerHTML += `
                                            <option value="${contactos[i].id}">${contactos[i].nombre}</option>
                                        `
                    console.log(contactos[i].id)
                }

                
            }
        }
        
    }
    cargar.open("GET",`http://santiagots-001-site5.dtempurl.com/api/Contactos/Nombre/${nombre}`, true);
    cargar.send();
    event.preventDefault();
  }

  function agregar(event){
    debugger;
    var envio=
    {
      "IdUsuario": id,
      "idContacto": document.getElementById("idcontactos").value
    }                  
    console.log(envio); 
    enviar = new XMLHttpRequest();
    enviar.onreadystatechange=function(){
        if (enviar.readyState == 4) {
            if (enviar.status == 201) {
                segundoMensaje("Contacto agregado","exito");
                }
            else{
                segundoMensaje("Debe seleccionar un contacto","error");
            }
        }
    }
        
    enviar.open("POST",`http://santiagots-001-site5.dtempurl.com/api/Contactos`, true);
    enviar.setRequestHeader('Content-type','application/json');
    console.log(envio);
    enviar.send(JSON.stringify(envio));
    event.preventDefault();
  }

  function cargadoOK(){
      //cargarcontacto();
      var form = document.querySelector('#busqueda');
      form.addEventListener('submit',cargarcontacto);
      var segundoForm = document.querySelector('#add-contact');
      segundoForm.addEventListener('submit', agregar);
  }

  window.addEventListener("load",cargadoOK);