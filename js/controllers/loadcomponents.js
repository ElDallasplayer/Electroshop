const LoadComponent = (urlarchivo,idpadre) => {
    $("#" + idpadre).load(
        urlarchivo,
        function (response, status, xhr) {
          if (status == "error") {
            console.log(
              "Error al cargar el contenido: " +
                xhr.status +
                " " +
                xhr.statusText
            );
          }
        }
      );
}

const RedireccionarPagina = (urlpage) => {
  console.log(window.location )
   window.location.href = "../" + urlpage + "?userguid=" + ObtenerGuidUser();
}

const RedireccionarVista = (urlpage) => {
  window.location = '../' + urlpage.split(".")[0] + '/' + urlpage;
}

const DireccionPeticiones = () =>{
  return "https://localhost:7213"; //TESTS
  return "https://dallasito-001-site1.ltempurl.com"; //SERVIDOR
}

const CrearCookies = (guid) => {
  document.cookie = "userguid=" + guid;
}

const EliminarCookies = () => {
  document.cookie = "userguid=" + "";
}

const ObtenerGuidUser = () => {
  const cookies = document.cookie.split('; ');

  for (let cookie of cookies) {
    if (cookie.startsWith('userguid=')) {
      return cookie.split('=')[1];
    }
  }
  return null;
};

const IniciarSesion = (email, password) =>{
  $.get(DireccionPeticiones() + "/Home/IniciarSesion?email=" + email + "&password=" + password, (data) =>{
    console.log(data)
    if(data.result == "OK"){
      CrearCookies(data.guidLogin)  
      $(".nombre_usuario_logueado").html(data.username)

      $(".component").append(
        $("<div class='gray-container-main'></div><dialog open class='sayhellocontainer'><h1 class='text-hello-popup'> ¡Bienvenido denuevo " + data.username + "!</h1></dialog>")
      )
    }else{
      alert("Usuario o contraseña incorrectos.")
    }
  }).then((data) =>{
    if(data.result == "OK"){
      $(".icono-cerrar-formulario").click()
    }
  })
}

const CerrarSesion = (guid) =>{
  $.get(DireccionPeticiones() + "/Home/CerrarSesion?guid=" + guid, (data) =>{
    EliminarCookies()
    location.reload();
  })
}

const ActualizarProductosCarrito = (productos) =>{
  $(".contenedor-articulos-carrito").empty()
  $(".contenedor-articulos-carrito").append(
    $('<p class="cantidad-articulos-carrito">' + productos + '</p>')
  )
}