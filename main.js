
function verificarNumero(){

}

function verificarTexto(){

}

class Producto{
    constructor(nombre, categoria, cantidad, precio, costo){
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
        this.costo = costo;
        this.moneda = "ARS"
    }

    calcularBeneficio(){
        return this.precio - this.costo;
    }

    agregarStock(cantidad){
        this.cantidad += cantidad;
    }

    venderProducto(){
        console.log(`Vendiste ${this.nombre} por ${this.precio}`);
        this.precio--;
    }
}

const crearProducto = () => {
    let nombre = prompt("Ingrese el nombre del nuevo producto");
    let categoria = prompt("Ingrese la categoria del producto");
    let cantidad = prompt("Ingrese la cantidad inicial del producto");
    let precio = prompt("Ingrese el precio inicial del producto");
    let costo = prompt("Ingrese el costo inicial del producto"); 

    return new Producto(nombre, categoria, cantidad, precio, costo);
}

