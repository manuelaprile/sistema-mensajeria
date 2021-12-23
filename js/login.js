function funcionSubmit(event)
{
      var nombre = document.querySelector("#idUsuario").value;
      var clave = document.querySelector("#idPassword").value;
        

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = procesarDatos;
xmlhttp.open('get', `http://santiagots-001-site5.dtempurl.com/api/Usuarios/${nombre}/${clave}`, true);
xmlhttp.send();
event.preventDefault();
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
    window.location.href = 'mensajes.html';
    console.log(json);
     }else{
        mensaje("El usuario y/o contraseña ingresadas son incorrectas","error");
    }
  }
  else
  {
    segundoMensaje("Espere", "exito");
  }
}

  function EsValidoLogin() {

    var nombre = document.getElementById('idUsuario').value;
    var clave = document.getElementById('idPassword').value;

    if(nombre.length == 0){
        return false;
      }
      if(clave.length == 0){
        return false;
      }
    return true;
  }

  function ingresar(event)
  {
        if(EsValidoLogin())
        {
            funcionSubmit(event)
        }
        //llamar al servicio para ingresar
        else
        {
          let warning = document.querySelector("section");
          const error = document.createElement('p');
          error.textContent = "Los campos no pueden ser vacíos";
          error.classList.add('error');
          warning.appendChild(error);
          setTimeout(() => {
            error.remove();
          }, 5000);

          event.preventDefault();
        }
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
    var form = document.querySelector("#login");
    form.addEventListener("submit", ingresar);

}

window.addEventListener("load",cargadoOK);
