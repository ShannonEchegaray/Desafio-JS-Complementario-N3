class Producto{
    constructor(nombre, categoria, cantidad, precio, costo){
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precio = precio;
        this.costo = costo;
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