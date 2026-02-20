const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded', () => {
    eventos();
    platillos();
});

const eventos = () => {
    menu.addEventListener('click', abrirMenu);
}

const abrirMenu = () => {
    navegacion.classList.remove('ocultar');
    botonCerrar();
}

const botonCerrar = () => {
    // Evitar crear múltiples overlays
    if (document.querySelector('.pantalla-completa')) return;
 
    // Si ya existe un botón de cerrar, lo eliminamos
    const btnExistente = document.querySelector('.btn-cerrar');
    if (btnExistente) btnExistente.remove();
 
    const btnCerrar = document.createElement('p');
    btnCerrar.textContent = 'X';
    btnCerrar.classList.add('btn-cerrar');
 
    const overlay = document.createElement('div');
    overlay.classList.add('pantalla-completa');
 
    const body = document.querySelector('body');
    body.appendChild(overlay);
    navegacion.appendChild(btnCerrar);
 
    cerrarMenu(btnCerrar, overlay);
 };
 const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    });
});  



 imagenes.forEach(imagen =>{
    
    observer.observe(imagen);
 })

const cerrarMenu = (boton, overlay) => {
   boton.addEventListener('click', () =>{
    navegacion.classList.add('ocultar');
    overlay.remove();
   })
   overlay.onclick = function(){
    overlay.remove();
    navegacion.classList.add('ocultar');
   }
}
const platillos = () => {
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo => platillosArreglo.push(platillo));

    const ensaladas = platillosArreglo.filter(ensalada => ensalada.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter(postre => postre.getAttribute('data-platillo') === 'postre');

    mostrarPlatillos(ensaladas, pastas, pizzas, postres);
};

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres) => {
    const contenedorPlatillos = document.querySelector('.platillos');
    
    const renderPlatillos = (platillos) => {
        limpiarHtml(contenedorPlatillos); // Limpia el contenedor antes de renderizar nuevos platillos
        platillos.forEach(platillo => contenedorPlatillos.appendChild(platillo));
    };

    // Funciones para manejar el clic en cada botón
    const botones = {
        btnTodos: document.querySelector('.todos'),
        btnEnsaladas: document.querySelector('.ensaladas'),
        btnPasta: document.querySelector('.pasta'),
        btnPizza: document.querySelector('.pizza'),
        btnPostres: document.querySelector('.postres')
    };

    botones.btnTodos.addEventListener('click', () => renderPlatillos([...ensaladas, ...pastas, ...pizzas, ...postres]));
    botones.btnEnsaladas.addEventListener('click', () => renderPlatillos(ensaladas));
    botones.btnPasta.addEventListener('click', () => renderPlatillos(pastas));
    botones.btnPizza.addEventListener('click', () => renderPlatillos(pizzas));
    botones.btnPostres.addEventListener('click', () => renderPlatillos(postres));
    
    // Llama por defecto a 'Todos' para que al cargar la página se muestren todos los platillos.
    renderPlatillos([...ensaladas, ...pastas, ...pizzas, ...postres]);
};

const limpiarHtml = (contenedor) => {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
};
