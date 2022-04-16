//Variables generales
const categorias = ["Carne", "Verdura"];
const productos = [];
const historialCompras = [];
const historialVentas = [];
// Funciones generales
const verificarNumero = (texto) => {
    let dato = parseInt(prompt(texto));
    while(isNaN(dato)){
        dato = parseInt(prompt(`El dato introducido es incorrecto.\n${texto}`));
    }
    return dato;
}

const verificarTexto = (texto) => {
    let dato = prompt(texto);
    while(dato == null || dato.trim() == ""){
        dato = prompt(`El dato introducido es incorrecto.\n${texto}`)
    }
    return dato;
}

//Funciones para Listar en alertas
//Funcion para listar el Array con numeros
const listarArray = (array, fn, opcionAlterna, sinNumeros) => {
    data = "";
    let i;
    if(sinNumeros == "sinNumeros"){
        for(i = 0; i < array.length ; i++){
            data = data + fn(array[i]) + "\n";
        }     
    } else {
        for(i = 0; i < array.length ; i++){
            data = data + (i+1) + ". " + fn(array[i]) + "\n";
        }
    }

   
    if(opcionAlterna == "noSalir") {
        return data;
    } else if(!(opcionAlterna == undefined)){
        data = data + (i + 1) + ". " + opcionAlterna + " \n";
        data = data + (i + 2) + ". Salir";
    } else {
        data = data + (i + 1) + ". Salir"
    }
    
    return data;
}

const expresarLista = (objeto) => {
    let dato = "";
    dato += objeto.fecha + "\n";
    dato += "Nombre        Cantidad        Precio\n" // Se utilizan 8 Espacios.
    for(let i = 0; i < objeto.cantidad.length; i++){
        //Se Calcula el espacio entre Textos para que la lista se vea bien, lamentablemente el tipo de letra usado no tiene el mismo tamaño y no queda bien, en console.log() se puede apreciar la idea
        let cantidadEspaciado1 = " ";
        let cantidadEspaciado2 = " ";
        cantidadEspaciado1 = cantidadEspaciado1.repeat(14 - objeto.nombre[i].length);
        cantidadEspaciado2 = cantidadEspaciado2.repeat(16 - objeto.cantidad[i].toString().length);
        dato += `${objeto.nombre[i]}${cantidadEspaciado1}${objeto.cantidad[i]}${cantidadEspaciado2}${objeto.precio[i]}\n`;
    }
    dato += "Total:          " + objeto.precioFinal;
    console.log(dato);
    return dato;
}

const expresarProducto = (producto) => {
    let dato = "";
    let claves = Object.keys(producto);
    let valores = Object.values(producto);
    let i;
    for(i = 0; i < claves.length; i++){
        dato = dato + claves[i] + "\: " + valores[i] + "\n";
    }
    return dato;
}

//Clases usadas en el programa
class Producto{
    constructor(id, nombre, categoria, cantidad, precio, costo){
        this.id = id;
        let existe = false;
        this.nombre = nombre;
        for(let i = 0; i < categorias.length; i++){
            if(categoria == categorias[i]){
                existe = true;
            }
        }
        if(existe == true){            
            this.categoria = categoria;
        } else {
            if(confirm("La categoria no existe, ¿Desea agregarla?")){
                categorias.push(categoria);
                this.categoria = categoria;
            } else {
                alert("Este producto no tendra categoria");
            }
        }

        while(cantidad < 0){
            alert("La cantidad introducida es menor a 0");
            cantidad = verificarNumero("Por favor ingrese una cantidad inicial");
        }
        this.cantidad = cantidad;
        while(precio < 0){
            alert("El precio introducido es menor a 0");
            precio = verificarNumero("Por favor ingrese un precio inicial");
        }
        this.precio = precio;
        while(costo < 0){
            alert("El costo introducido es menor a 0");
            costo = verificarNumero("Por favor ingrese un costo inicial");
        }
        this.costo = costo;
        this.moneda = "ARS"
    }

    agregarStock(cantidad){
        this.cantidad += cantidad;
    }

    venderProducto(cantidad){
        this.cantidad -= cantidad;
    }
}

class Lista{
    constructor(){
        this.fecha = new Date();
        this.fecha = this.fecha.toLocaleDateString() + " " + this.fecha.toTimeString();
        this.id = [];
        this.nombre = [];
        this.categoria = [];
        this.precio = [];
        this.cantidad = [];
        this.precioFinal = 0;
    }
}


const crearProducto = () => {
    let id = 1;
    while(productos.find(el => el.id == id)){
        id++;
    }
    console.log(id);
}
// Pusheo algunos productos en la lista.

productos.push(new Producto(1,"Lechuga", "Verdura", 0, 50, 20));
productos.push(new Producto(2,"Pollo", "Carne", 0, 120, 50));
productos.push(new Producto(3,"Res", "Carne", 0, 180, 80));

let darkMode = false;

    // Funcion para verificar si usar la clase oscura o no
    const verificarModo = (clase) => {
        if(darkMode){
            clase += "--dark"
            return clase;
        }
        return clase;
    }

function renderProductos(){

    let volcar = document.getElementById("volcar");
    while(volcar.firstChild) {
        volcar.removeChild(volcar.firstChild);
    }
    
    for(const producto of productos){
        let nodo = document.createElement("div");
        nodo.setAttribute("class", verificarModo("card"));
        nodo.innerHTML = `<div class='card__body'>
        <h5 class='card__title'>${producto.nombre}</h5>
        <p class='card__text'>Categoria: ${producto.categoria}<br>
        Cantidad: ${producto.cantidad}<br>
        Precio: ${producto.precio}<br>
        Costo: ${producto.costo}
        </p>
        </div>`;

        volcar.appendChild(nodo);
    }    
}

function setDark(){
    const body = document.querySelector("body");
    body.classList.remove("body");
    body.classList.add("body--dark");
    const header = document.querySelector("header");
    header.classList.remove("header");
    header.classList.add("header--dark");
    const footer = document.querySelector("footer");
    footer.classList.remove("footer");
    footer.classList.add("footer--dark");
    darkMode = true;
    renderProductos()
}

function setLight(){
    const body = document.querySelector("body");
    body.classList.remove("body--dark");
    body.classList.add("body");
    const header = document.querySelector("header");
    header.classList.remove("header--dark");
    header.classList.add("header");
    const footer = document.querySelector("footer");
    footer.classList.remove("footer--dark");
    footer.classList.add("footer");
    darkMode = false;
    renderProductos()
}

renderProductos();
document.querySelector("#modoPagina").onclick = () => {
    if(darkMode){
        setLight();
    } else {
        setDark();
    }
}

const crearAlerta = (comprar) => {
    const cerrarAlerta = () =>{
        for(let i = 0 ; i < 2 ; i++){
            document.body.lastChild.remove();
        }
    }

    //Verificando que no exista mas de 1 alerta;
    if(document.querySelector(".alert") || document.querySelector(".alert--dark")){
        cerrarAlerta();
    }

    const alerta__fondo = document.createElement("div");
    alerta__fondo.classList.add("alert__background");
    alerta__fondo.onclick = () => {
        cerrarAlerta();
    }
    //Agregando Alerta al fondo de la alerta
    let alerta = document.createElement("div");
    alerta.classList.add(verificarModo("alert"));
    
    //Agregando Titulo a la alerta
    let alerta__title = document.createElement("div");
    alerta__title.classList.add(verificarModo("alert__title"));
    alerta.appendChild(alerta__title);

    //Agregando Parrafo y Boton al Titulo
    let alerta__title__parrafo = document.createElement("p");
    if(comprar){
        alerta__title__parrafo.innerText = "Comprar Productos";
    } else {
        alerta__title__parrafo.innerText = "Vender Productos";
    }

    let alerta__title__closeButton = document.createElement("a");
    if(darkMode){
        alerta__title__closeButton.innerHTML = `<svg class="alert__button--closeDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>`
    } else {
        alerta__title__closeButton.innerHTML = `<svg class="alert__button--close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>`
    }
    alerta__title__closeButton.setAttribute("href", "#");
    alerta__title__closeButton.onclick = (e) => {
        e.preventDefault();
        cerrarAlerta();
    }
    alerta__title.appendChild(alerta__title__parrafo);
    alerta__title.appendChild(alerta__title__closeButton);

    //Agregando Body a la alerta

    let alerta__body = document.createElement("div");
    alerta__body.classList.add("alert__body");
    alerta.appendChild(alerta__body);

    //Agregando Tabla al Body

    let alerta__tabla = document.createElement("div");
    alerta__tabla.classList.add(verificarModo("alert__table"));
    alerta__body.appendChild(alerta__tabla);

    //Agregando Encabezado a la tabla

    alerta__tabla__encabezado = document.createElement("div");
    alerta__tabla__encabezado.classList.add("alert__table__enc")
    alerta__tabla.appendChild(alerta__tabla__encabezado);

    encabezado1 = document.createElement("p");
    encabezado2 = document.createElement("p");
    encabezado3 = document.createElement("p");
    encabezado4 = document.createElement("p");
    encabezado5 = document.createElement("p");
    encabezado1.classList.add("alert__table__enc__text");
    encabezado2.classList.add("alert__table__enc__text");
    encabezado3.classList.add("alert__table__enc__text");
    encabezado4.classList.add("alert__table__enc__text");
    encabezado5.classList.add("alert__table__enc__text");
    encabezado1.innerText = "Cantidad";
    encabezado2.innerText = "ID";
    encabezado3.innerText = "Nombre";
    encabezado4.innerText = "Precio";
    encabezado5.innerText = "Subtotal";

    alerta__tabla__encabezado.appendChild(encabezado1);
    alerta__tabla__encabezado.appendChild(encabezado2);
    alerta__tabla__encabezado.appendChild(encabezado3);
    alerta__tabla__encabezado.appendChild(encabezado4);
    alerta__tabla__encabezado.appendChild(encabezado5);

    //Agregando productos a la tabla
    for(const producto of productos){
        let subtotal = 0;
        let alerta__tabla__producto = document.createElement("div");
        alerta__tabla__producto.classList.add("alert__table__product");
        alerta__tabla.appendChild(alerta__tabla__producto);

        let columna1 = document.createElement("div");
        let columna1__input = document.createElement("input");
        columna1__input.setAttribute("type", "number");
        columna1__input.setAttribute("pattern", "[^0-9+]");
        columna1__input.oninput = () => {
            if(columna1__input.value < 0){
                columna1__input.value = 0;
            }
            subtotal = producto.costo * columna1__input.value;
            columna5.innerText = subtotal;
        }
        
        let columna2 = document.createElement("p");
        let columna3 = document.createElement("p");
        let columna4 = document.createElement("p");
        let columna5 = document.createElement("p");
        columna1.classList.add("alert__table__product__text");        
        columna2.classList.add("alert__table__product__text");        
        columna3.classList.add("alert__table__product__text");        
        columna4.classList.add("alert__table__product__text");        
        columna5.classList.add("alert__table__product__subtotal");   
        
        columna2.innerText = producto.id;
        columna3.innerText = producto.nombre;
        columna4.innerText = producto.precio;
        columna5.innerText = subtotal;

        columna1.appendChild(columna1__input);
        alerta__tabla__producto.appendChild(columna1);
        alerta__tabla__producto.appendChild(columna2);
        alerta__tabla__producto.appendChild(columna3);
        alerta__tabla__producto.appendChild(columna4);
        alerta__tabla__producto.appendChild(columna5);
    }

    let alerta__boton__comprar = document.createElement("a");
    alerta__boton__comprar.classList.add("alert__boton");
    alerta__boton__comprar.innerText = "Comprar";
    alerta__boton__comprar.onclick = () => {
        let tabla = document.getElementsByClassName("alert__table__product");
        let precioFinal = 0;
        for(const filas of tabla){
            if(filas.lastChild.innerText != 0){
                precioFinal += parseInt(filas.lastChild.innerText);
            }
        }
        if(precioFinal == 0){
            cerrarAlerta();
        } else {
            let nuevaLista = new Lista();
            for(const filas of tabla){
                if(filas.lastChild.innerText != 0){
                    let id = filas.childNodes[1].innerText;
                    let nombre = filas.childNodes[2].innerText;
                    let cantidad = parseInt(filas.childNodes[0].firstChild.value);
                    let precio = parseInt(filas.childNodes[3].innerText)

                    nuevaLista.id.push(id)
                    nuevaLista.nombre.push(nombre);
                    nuevaLista.cantidad.push(cantidad);
                    nuevaLista.precio.push(precio);
                    nuevaLista.precioFinal = precioFinal;

                    productos.find(el => el.nombre.toLowerCase() == nombre.toLowerCase()).agregarStock(cantidad);
                }
            }
            historialCompras.push(nuevaLista);
            cerrarAlerta();
            renderProductos();
        }
    }
    alerta.appendChild(alerta__boton__comprar);

    document.body.appendChild(alerta__fondo);
    document.body.appendChild(alerta);
}

document.querySelector("#comprar").onclick = () => {
    crearAlerta(true);
}

document.querySelector("#vender").onclick = () => {
    crearAlerta();
}