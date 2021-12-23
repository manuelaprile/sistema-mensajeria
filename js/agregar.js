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
                for (var i=0; i < mensajes.length; i++){
                    var main = document.querySelector("main");
                    main.innerHTML += `    <main>     
                                                <article>
                                                    <h3>${mensajes[i].id}</h3>
                                                    <textarea name="" id="" cols="93" rows="10">
${mensajes[i].texto}
                                                    </textarea>
                                                        <div class="marco">
                                                            <div style="width: 45%; display: inline-block; text-align: left;">
                                                                <a class="" href="envio.html"><ion-icon name="refresh-outline"></ion-icon></a>
                                                            </div>
                                                            <div style="width: 45%; display: inline-block; text-align: left;">
                                                                <h3 class="">${mensajes[i].fecha}</h3>
                                                            </div>
                                                        </div>
                                                </article>      
                                            </main>`
                                            console.log(usuario)
                                            console.log(mensajes);
                }
            }else{
                alert("Hubo problemas con la petición");
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

