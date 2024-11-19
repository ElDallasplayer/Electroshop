$(document).ready(function () {
  $(".carousel").carousel({
    interval: 5000,
  });

  ObtenerProductosOferta()
  async function ObtenerProductosOferta() {
    $.get(
        DireccionPeticiones() + "/Product/GetSALEProducts",
        (data) => {
            if(data.result == "OK"){
                let dataObtenida = data.data;
                let slideCount = 0;
                
                while(dataObtenida.length > 0){
                    slideCount++;
                    let dataVista = [];
                    if(dataObtenida.length > 0 && dataObtenida.length < 4){
                        dataVista = dataObtenida.slice(0, dataObtenida.length);
                        dataObtenida = [];
                    }else{
                        dataVista = dataObtenida.slice(0, 4);
                        dataObtenida = dataObtenida.slice(4, dataObtenida.length + 1);
                    }
                    $.get(
                         DireccionPeticiones() + "/Product/GetProductSlider?number=" +slideCount+ "&products=" + dataVista.join(','),
                        (res) => {
                          $("#slider-container-productos-oferta").append(res);
                          AgregarEventosTarjetas();
                        }
                      );
                }
            }
        })
  }

  ObtenerProductosEstacion()
  async function ObtenerProductosEstacion() {
    $.get(
       DireccionPeticiones() + "/Product/GetSTATIONProducts",
      (data) => {
        if(data.result == "OK"){
                let dataObtenida = data.data;
                let slideCount = 0;
                
                while(dataObtenida.length > 0){
                    slideCount++;
                    let dataVista = [];
                    if(dataObtenida.length > 0 && dataObtenida.length < 4){
                        dataVista = dataObtenida.slice(0, dataObtenida.length);
                        dataObtenida = [];
                    }else{
                        dataVista = dataObtenida.slice(0, 4);
                        dataObtenida = dataObtenida.slice(4, dataObtenida.length + 1);
                    }
                $.get(
                    DireccionPeticiones() + "/Product/GetProductSlider?number=" +slideCount+ "&products=" + dataVista.join(','),
                    (res) => {
                      $("#slider-container-productos-estacion").append(res);
                      AgregarEventosTarjetas();
                    }
                  );
            }
        }
      }
    );
  }

  ObtenerProductosMenorPrecio();
  async function ObtenerProductosMenorPrecio() {
    // Esperar a que se complete la solicitud inicial
    const data = await $.get(DireccionPeticiones() + "/Product/GetPricesOrderByMinorPrice");

    if (data.result === "OK") {
        let dataObtenida = data.data;
        let slideCount = 0;

        while (dataObtenida.length > 0) {
            slideCount++;
            let dataVista = [];

            if (dataObtenida.length > 0 && dataObtenida.length < 4) {
                dataVista = dataObtenida.slice(0, dataObtenida.length);
                dataObtenida = [];
            } else {
                dataVista = dataObtenida.slice(0, 4);
                dataObtenida = dataObtenida.slice(4);
            }

            console.log(slideCount);

            // Esperar la respuesta de la solicitud
            const res = await $.get(
                DireccionPeticiones() + "/Product/GetProductSlider?number=" + slideCount + "&products=" + dataVista.join(',')
            );

            $("#slider-container-productos-menor-precio").append(res);
            AgregarEventosTarjetas();
        }
    }
}

  const AgregarEventosTarjetas = () => {
    $(".tarjeta-producto").on("click", (e) => {
      e.stopImmediatePropagation();

      let id = e.target.getAttribute("data-tarjeta");
      $("#container_producto_popup").empty();

      console.log(id)

      RedireccionarVista("products.html?id=" + id)
    });
  };
});
