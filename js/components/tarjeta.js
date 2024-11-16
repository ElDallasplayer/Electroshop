
    const ObtenerTodasLasTarjetas = () => {
        $.get(DireccionPeticiones() + "/Product/GetProducts", (data) =>{
            $("#contenedor_tarjetas_back").html(data);
            AgregarEventosTarjetas();
        })
    }
    ObtenerTodasLasTarjetas();

    export function AgregarEventosTarjetas() {
        $(".tarjeta-producto").on("click", (e) =>{
            e.stopImmediatePropagation();

            let id = e.target.getAttribute("data-tarjeta");
            $("#container_producto_popup").empty();

            $('html').animate({
                scrollTop: $("#container_producto_popup").offset().top
              }, 0); 

              RedireccionarVista("producto.html?id=" + id)
        })
    }