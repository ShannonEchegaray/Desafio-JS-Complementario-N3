
function verificarNumero(texto){
    let dato = parseInt(prompt(texto));
    while(isNaN(dato)){
        dato = prompt(`El dato introducido es incorrecto. ${texto}`)
    }
    return dato;
}

function verificarTexto(texto){
    let dato = prompt(texto);
    while(dato == null || dato.trim() == ""){
        dato = prompt(`El dato introducido es incorrecto. ${texto}`)
    }
    return dato;
}

class Producto{
    constructor(nombre, categoria, cantidad, precio, costo){
        this.nombre = nombre;
        this.categoria = categoria;

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

    calcularBeneficio(){
        alert(`El beneficio costo-precio de ${this.nombre} es de ${this.precio - this.costo}`);
        return this.precio - this.costo;
    }

    agregarStock(){
        let cantidad = verificarNumero("Ingrese la cantidad a agregar.");
        while(cantidad < 0){
            alert("La cantidad fue menor a 0. Por favor introducir nuevamente")
            cantidad = verificarNumero("Ingrese la cantidad a agregar.")
        }
        this.cantidad += cantidad;
        alert(`Se ha agregado la cantidad de ${cantidad}. Tu cantidad actual de ${this.nombre} es de ${this.cantidad}`);
    }

    venderProducto(){
        let cantidad = verificarNumero("Ingrese la cantidad a vender.");
        while(cantidad < 0){
            alert("La cantidad fue menor a 0. Por favor introducir nuevamente")
            cantidad = verificarNumero("Ingrese la cantidad a vender.")
        }
        alert(`Vendiste ${this.nombre} por ${this.precio * cantidad}${this.moneda}.\nTe quedan ${this.cantidad - cantidad}`);
        this.cantidad -= cantidad;
    }
}

const crearProducto = () => {
    let nombre = verificarTexto("Ingrese el nombre del producto");
    let categoria = verificarTexto("Ingrese la categoria del producto");
    let cantidad = verificarNumero("Ingrese la cantidad inicial del producto");
    let precio = verificarNumero("Ingrese el precio inicial del producto");
    let costo = verificarNumero("Ingrese el costo inicial del producto"); 

    return new Producto(nombre, categoria, cantidad, precio, costo);
}

let lechuga = new Producto("Lechuga", "Verdura", 0, 50, 20);
let pollo = new Producto("Pollo", "Carne", 0, 120, 50);
let res = new Producto("Res", "Carne", 0, 180, 80);

console.log("Buenos dias, acabo de crearte 3 objetos para que puedas usar sus metodos.");
console.log("Intenta con lechuga.calcularBeneficio()");
console.log("Para crear nuevos productos escribe: let 'Nombre de producto' = crearProducto()");