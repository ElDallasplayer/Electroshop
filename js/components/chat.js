$(document).ready( function (){
    
    $(".chat-container").slideToggle();

    $(".chat-principal-icon").on("click", (e) => {
        e.stopImmediatePropagation();

        if($(".chat-container").hasClass("d-none")){
            $(".chat-container").removeClass("d-none")
            $(".chat-container").slideDown();

            $("#text-message").focus();
        }else{
            $(".chat-container").slideUp();
            $(".chat-container").addClass("d-none")
        }
        
    })

    $(".send-message-button").on("click", (e) =>{
        e.stopImmediatePropagation();
        EnviarMensaje();
    })

    $("#text-message").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code==13){
            let mensaje = $("#text-message").val();

            if(mensaje != ""){
                ConstruirMensaje(mensaje,true);
            }
        }
    });

    $(document).bind('keydown',function(e){
        if ( e.which == 27 ) {
            $(".chat-container").slideUp();
            $(".chat-container").addClass("d-none")
        };
    });

    $(".title-container-chat").on("click", () => {
        $(".chat-container").slideUp();
        $(".chat-container").addClass("d-none")
    })

    $(".go_whatsapp").on("click", () =>{
        LlevarAWhatsapp()
    })

    function EnviarMensaje(){
        let mensaje = $("#text-message").val();
        if(mensaje != ""){
            ConstruirMensaje(mensaje,true)
        }else{
            alert("No se puede enviar un mensaje vacio.")
        }
    }

    function ObtenerMensajes(){
        $.get(DireccionPeticiones() + "/Mensajes/ObtenerMensajes", (data) =>{
            let mensajesRespueta = data.mensajes;
            for(let i = 0; i < mensajesRespueta.length; i++){
                if(mensajesRespueta[i].esRespuesta){
                    ConstruirMensajeRecibido(mensajesRespueta[i].mensajeAdjunto)
                }else{
                    ConstruirMensaje(mensajesRespueta[i].mensajeAdjunto,false)
                }
            }
        })
    }
    ObtenerMensajes()

    function ConstruirMensaje(mensaje,enviar){
        $("#lista_mensajes_enviadosyrecibidos").append(
            $('<div class="row p-0 m-0 mensaje-enviado">').append(
                $('<p class="text-mensaje-enviado shadow-short">' + mensaje + '</p>')
            )
        )
        $("#text-message").val("");

        if(enviar){
            $.get(DireccionPeticiones() + "/Mensajes/InsertarMensajeCliente?idmensajes=1&usuario=1&mensaje=" + mensaje , (data) =>{
                if(data.result != "OK"){
                    console.log(data)
                }
            })
        }
    }

    function ConstruirMensajeRecibido(mensaje){
        $("#lista_mensajes_enviadosyrecibidos").append(
            $('<div class=""row m-0 p-0 mensaje-recibido" style="height: auto !important;">').append(
                $('<p class="text-mensaje-recibido shadow-short">' + mensaje + '</p>')
            )
        )
        $("#text-message").val("");
    }

    function LlevarAWhatsapp(){
        window.open("https://wa.me/1165526617","_blank");
    }
})