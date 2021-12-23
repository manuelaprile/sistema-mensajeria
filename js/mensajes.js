let user = sessionStorage.getItem("usuario");
var datos =JSON.parse(user)
var id = JSON.parse(datos.id)


function agregar_contactos(){
    contact = new XMLHttpRequest();
    contact.onreadystatechange=function(){
        if (contact.readyState == 4) {
            if (contact.status == 200) {
                var contactos = JSON.parse(contact.responseText)
                for (var i=0; i < contactos.length; i++){
                    let contacto = document.querySelector("#contactos")
                    contacto.innerHTML += `
                                        <p>${contactos[i].nombre}</p>
                                        `
                }
            }
        }
    }
    contact.open("GET",`http://santiagots-001-site5.dtempurl.com/api/Usuarios/${id}/Contactos`, true);
    contact.send();
}



function agregar_mensajes(){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange =  function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var usuario=JSON.parse(xmlhttp.responseText)
                var mensajes = usuario.mensajes;
                var contacto = JSON.stringify(usuario.contactos[1])
                for (var i=0; i < mensajes.length; i++){
                    var contacto = JSON.stringify(usuario.contactos[i])
                    var main = document.querySelector("main");
                    main.innerHTML += ` 
                                        <article class="articulo">
                                            <h3>${mensajes[i].id}</h3>
                                            <div class="contenido">
                                                ${mensajes[i].texto}
                                            </div>
                                            <div>
                                                <h3>
                                                    ${mensajes[i].fecha}
                                                    <a class="" href="envio.html"><ion-icon name="refresh-outline"></ion-icon></a>
                                            </h3>
                                            </div>
                                        </article>
                                     `
                                    console.log(contacto);
                                    console.log(mensajes);                       
                }
            }else{
                alert("Usuario no encontrado");
            }
        }
        };
        xmlhttp.open("GET",`http://santiagots-001-site5.dtempurl.com/api/Usuarios/${id}`, true);
        xmlhttp.send();

    }


function cargadoOK() {
    agregar_mensajes(); 
    agregar_contactos();
}
    
window.addEventListener("load",cargadoOK)
