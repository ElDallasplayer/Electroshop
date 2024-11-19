$(document).ready( function () {

    let altura = $(".contenedor-opciones").offset().top;

    $(window).on("scroll", () => {
        if($(window).scrollTop() > altura){
            $(".contenedor-opciones").addClass("contenedor-opciones-fixed").addClass("shadow")
            $(".navbar-subtitulo").addClass("padding-menu-option")
        }else{
            $(".contenedor-opciones").removeClass("contenedor-opciones-fixed").removeClass("shadow")
            $(".navbar-subtitulo").removeClass("padding-menu-option")
        }
    })

    $("#boton-busqueda-vista-principal").on("click", () => {
        let valorBuscar = $("#buscador-principal-productos-navbar").val()
        RedireccionarVista('categorias.html?valorbusqueda=' + valorBuscar);
    })

    $("#buscador-principal-productos-navbar").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
            let busca = $("#buscador-principal-productos-navbar").val();
            RedireccionarVista('categorias.html?valorbusqueda=' + busca);
        }
    });

    $(".icono-usuarios").on("click", (e) =>{
        e.stopImmediatePropagation();
        LoadComponent("../components/usuario.html","usuario_form_container")
        $("#usuario_form_container").removeClass("d-none")
    })

    $("#categorias-button").on("click", (e) => {
        e.stopImmediatePropagation()
        $(".sub_categorias").slideUp();
        if($(".panel-contenedor-categorias").hasClass("panel-contenedor-categorias-visible")){
            $(".panel-contenedor-categorias").removeClass("panel-contenedor-categorias-visible")
            $("#categorias-button").removeClass("bolder-font")
        }else{
            $(".panel-contenedor-categorias").addClass("panel-contenedor-categorias-visible")
            $("#categorias-button").addClass("bolder-font")
        }
    })

    $(".imagen-logo").on("click", (e) =>{
        e.stopImmediatePropagation();

        RedireccionarPagina("index.html")
    })

    $("#iconoCarrito").on("click", () =>{
        RedireccionarVista("sales.html?user=" + ObtenerGuidUser())
    })
    let seleccionActual = "";
        $(".submenu-option").on(
        {
            mouseenter: function (e) {
                //let id = e.target.getAttribute("id");
                //if(seleccionActual != id){
                //    $(".sub_categorias").slideUp();
                //    seleccionActual = id;
                //    $("#categorias-subcategorias-" + id).slideDown()
                //}
            },
            mouseleave: function (e) {
                //console.log(e)
            }
        })

        $(".submenu-option").on("click", (e) => {
            $("#subcontenedor-" + "ventiladores").addClass("subcontenedor-visible");
        })

        function AgregarEventosTarjetas() {
            $(".tarjeta-producto").on("click", (e) =>{
                e.stopImmediatePropagation();
    
                let id = e.target.getAttribute("data-tarjeta");
                $("#container_producto_popup").empty();

                $('html').animate({
                    scrollTop: $("#container_producto_popup").offset().top
                  }, 1000); 

                $.get( DireccionPeticiones() + "/Productos/ObtenerPopUpProducto?id=" + id, (data) =>{
                    $("#container_producto_popup").html(data);
                    $("#container_producto_popup").removeClass("d-none");
                    $("#container_producto_popup_blur").removeClass("d-none");
    
                    $("#blurElementFather").on("click",() =>{
                        $("#container_producto_popup").empty();
                        $("#container_producto_popup").addClass("d-none");
                        $("#container_producto_popup_blur").addClass("d-none");
                    })
                })
            })
        }

        $(".CONTENEDOR-INICIAL").slideUp()
        $(".CONTENEDOR-CENTRAL").slideUp()
        $(".CONTENEDOR-FINAL").slideUp()
        let ventiladores = false;
        $("#ventiladores").on("click", (e) =>{
            e.stopImmediatePropagation();
            console.log("SE PRECIONO")
            if(ventiladores == false){
                $(".CONTENEDOR-CENTRAL").empty().append(
                    $('<div class="col-12 m-0 w-100 submenu-option text-center buscador-categoria" data-busqueda="ventilador techo">TECHO</div>')
                ).append(
                    $('<div class="col-12 m-0 w-100 submenu-option text-center buscador-categoria" data-busqueda="ventilador pie">PIE</div>')
                ).append(
                    $('<div class="col-12 m-0 w-100 submenu-option text-center buscador-categoria" data-busqueda="ventilador pared">PARED</div>')
                ).append(
                    $('<div class="col-12 m-0 w-100 submenu-option text-center buscador-categoria" data-busqueda="ventilador">VER TODOS</div>')
                )
                $(".CONTENEDOR-CENTRAL").slideDown("fast")
                ventiladores = true;
                ValidarAcciones()
            }else{
                $(".CONTENEDOR-CENTRAL").slideUp()
                $(".CONTENEDOR-CENTRAL").empty()
                ventiladores = false;
            }
        })

        function ValidarAcciones(){
            $(".buscador-categoria").off("click").on("click", (e) =>{
                e.stopImmediatePropagation();
                let busqueda = e.target.getAttribute("data-busqueda");
                RedireccionarVista('category.html?valorbusqueda=' + busqueda)
            })
        }
})