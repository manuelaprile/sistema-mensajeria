function verificar(event){
    var user = sessionStorage.getItem("usuario");
    var id   = sessionStorage.getItem("id");
    if (user == null){
      window.location.href='index.html';
  }
}


function mensaje(texto, clase)
{
  var warning = document.querySelector("section");
  const error = document.createElement('p');
  error.textContent = texto;
  error.className = clase;
  error.classList.add('error');
  warning.appendChild(error);
  setTimeout(() => {
    error.remove();
  }, 5000);

}

function segundoMensaje(texto, clase)
{
  var warning = document.querySelector("#mostrarmensaje");
  const error = document.createElement('p');
  error.textContent = texto;
  error.className = clase;
  error.classList.add('error');
  warning.appendChild(error);
  setTimeout(() => {
    error.remove();
  }, 5000);
}



window.addEventListener("load",verificar);
