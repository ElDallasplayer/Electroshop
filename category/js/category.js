import * as tarjetas from "../../js/components/tarjeta.js";

export function CargarEventos(){

    let valorId = $('#contenedor_tarjetas_back').length?"contenedor_tarjetas_back":"contenedor_tarjetas";

    $(".boton_busqueda_particular").on("click", (e) =>{
        e.stopImmediatePropagation();
    })
    
    $(".boton_ver_ofertas").on("click", (e) => {
        e.stopImmediatePropagation();
    
        $.get(DireccionPeticiones() + "/Product/OnlyGetSALES", (data) =>{
            $("#" + valorId).html(data)
            tarjetas.AgregarEventosTarjetas()
        })
    })
    
    $(".boton_ver_precios_menor").on("click", (e) => {
        e.stopImmediatePropagation();
    
        $.get(DireccionPeticiones() + "/Product/GetProductsByMinorPrices", (data) =>{
            $("#" + valorId).html(data)
            tarjetas.AgregarEventosTarjetas()
        })
    })
    
    $(".boton_ver_precios_mayor").on("click", (e) => {
        e.stopImmediatePropagation();
    
        $.get(DireccionPeticiones() + "/Product/GetProductsByMaxPrince", (data) =>{
            $("#" + valorId).html(data)
            tarjetas.AgregarEventosTarjetas()
        })
    })
}