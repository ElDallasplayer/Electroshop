import * as tarjetas from "./tarjeta.js";

    let Cheked = "";
    let valorId = $('#contenedor_tarjetas_back').length?"contenedor_tarjetas_back":"contenedor_tarjetas";
    export function CargarChecks(){
        $(".form-checkbox").change(function () {
            let idBusqueda = this.getAttribute("id");
            
            if(idBusqueda == "-1")
            {
                if (this.checked){
                    $(".checkbox-calidades").prop("checked",false) 
                    Cheked = Cheked.replace("_1","")
                    console.log(Cheked)
                }
            }

            if (this.checked) {
                Cheked += "_" + idBusqueda;
            } else {
                Cheked = Cheked.replace("_" + idBusqueda,"")
            }
        
            $.get(DireccionPeticiones() + "/Product/GetProductsByFilters?filters=" + Cheked, (data) =>{
                $("#" + valorId).html(data)
                tarjetas.AgregarEventosTarjetas()
            })
          });
        
          $("#input_busqueda_categoria").keypress(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code==13){
                let busca = $("#input_busqueda_categoria").val();
                    BuscarProducto(busca)
            }
        });
        
          $(".boton_busqueda_lateral").on("click", () =>{
            let busca = $("#input_busqueda_categoria").val();
                BuscarProducto(busca)
          })
        
          
    }

    function BuscarProducto(busqueda){
        $.get(DireccionPeticiones() + "/Product/GetProductsBySearch?searchValue=" + busqueda, (data) =>{
            $("#" + valorId).html(data)
            tarjetas.AgregarEventosTarjetas()
        })
      }

    CargarChecks();
    

