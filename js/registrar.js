function funcionSubmit(event)
{

var usuario =
    {
        nombre: document.querySelector("#idUsuario").value,
        email: document.querySelector("#idEmail").value,
        clave: document.querySelector("#idPassword").value
        
    }
    console.log(usuario);

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = procesarDatos;
xmlhttp.open('post', `http://santiagots-001-site5.dtempurl.com/api/Usuarios`, true);
xmlhttp.setRequestHeader('Content-Type',  'application/json');
xmlhttp.send(JSON.stringify(usuario));

}


function procesarDatos(event)
{

debugger;
if (event.target.readyState == 4) 
{
    if (event.target.status == 201){ //OK
    // todo va bien, respuesta recibida
    var json = JSON.parse(event.target.responseText);
    sessionStorage.setItem("usuario", event.target.responseText);
    sessionStorage.setItem("id", json.id);
    console.log(json);
    document.location='mensajes.html';
    }else{
      mensaje("Error al ingresar","error");
    }
}
}

function validarRegistro(){ 
debugger;
    var usuario = document.getElementById('idUsuario').value;
    var clave = document.getElementById('idPassword').value;
    var confirmarclave = document.getElementById('idconfirmarPassword').value;
    var email = document.getElementById('idEmail').value;
    var emailvalidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var esValido = true;

    if(usuario.length == 0){
      debugger;
      mensaje("Los campos no pueden ser vacios","error");
      esValido = false;
    }
    if(clave.includes(usuario)){
      mensaje("El usuario no puede formar parte de la clave","error");
      esValido = false;
    }

    if (email.match(emailvalidation)){
      esValido = true;
    }else{
      mensaje("El email es incorrecto","error");
      esValido = false;
    }

    if (clave.lenght == 0 || confirmarclave.lenght == 0){
      mensaje("Las claves no puede ser vacía","error");
      esValido = false;
    }

    if (clave.length<6){
      mensaje("La clave debe tener un mínimo de 6 caracteres con un número, letra minúscula y letra mayúscula","error")
      esValido = false;
    }

    if ((clave.search(/[a-z]/) == -1)) {
      mensaje("La clave debe tener un mínimo de 6 caracteres con un número, letra minúscula y letra mayúscula","error")
      esValido = false;
    }

    if ((clave.search(/[A-Z]/) == -1)) {
      mensaje("La clave debe tener un mínimo de 6 caracteres con un número, letra minúscula y letra mayúscula","error")
      esValido = false;
    }

    if ((clave.search(/[0-9]/) == -1)) {
      mensaje("La clave debe tener un mínimo de 6 caracteres con un número, letra minúscula y letra mayúscula","error")
      esValido = false;
    }


    if (clave!=confirmarclave){
      mensaje("Las claves deben coincidir");
      esValido = false;
    }

    return esValido;
}
  
  function registrar(event)
  {
        if(validarRegistro())
        {
            funcionSubmit(event)

        }

        event.preventDefault();
  }



function borrar(event)
{
    debugger;
    var elementoP = event.target;
    var padre = elementoP.parentElement;
    padre.removeChild(elementoP);
}



function cargadoOK()
{
    var form = document.querySelector("#registro");
    form.addEventListener("submit", registrar);
}

window.addEventListener("load",cargadoOK);



