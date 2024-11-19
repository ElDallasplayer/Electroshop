export const CambiarImagenClick = () => {

    $(".contenedor-imagen-minima-popup").on("click", (e) =>{
        e.stopImmediatePropagation();

        let source = e.target.getAttribute("src");
        $(".contenedor-imagen-principal-producto").attr("src", source);
    })
}
