//VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners(){
    //agregamos cuando hacemos click ' agregar al Carrito' 
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHtml
    })

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];// reseteando el arreglo
        
        limpiarHtml(); // limpiamos todo el carrito del html
    })


}
// FUNCIONES
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado )
    }
}

function eliminarCurso(e) {
     e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

         console.log(articulosCarrito);
        carritoHtml()// iteramos sobre el carrito para que elimine los cursos y muestre solo los que quedan sin eliminar

    }
}



// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
   // console.log(curso)
// CREAR UN OBJETO CON EL CONTENIDO DE CURSO ACTUAL
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id:     curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

// revisa si un elemento ya exixte en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
if(existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map( curso =>  {
        if(curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso;// retorna el objeto actualizado

        }else{
            return curso;// retorna los objetos que no son los duplicados
        }
    })
    articulosCarrito = [...cursos]
}else {
        //agregar elementos al arreglo de carrito //aplicamos spreadOperator
        articulosCarrito = [...articulosCarrito , infoCurso]
}
console.log(articulosCarrito)
carritoHtml();
}
// muestra el carrito de compras en el html
function carritoHtml() {
    //limpiar el html
    limpiarHtml()
    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id } = curso /// aplicamos destructurin para simplificar erl codigo
        //console.log(curso)
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>  
            <img src = "${imagen}" width = "100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        //agregar el html al carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

    // agregamos funcion localStorage al carrito de comparas sincroniazamos+
    sincronizarStorage()

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}




// elimina los cursos del tbody
function limpiarHtml() {
    //forma lenta de eliminar 
    // contenedorCarrito.innerHTML ='';
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



