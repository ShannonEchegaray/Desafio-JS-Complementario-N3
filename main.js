const categorias = ["Carne", "Verdura"];
const productos = [];

function verificarNumero(texto){
    let dato = parseInt(prompt(texto));
    while(isNaN(dato)){
        dato = parseInt(prompt(`El dato introducido es incorrecto. ${texto}`));
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

function listarArray(array, fn, opcionAlterna){
    data = "";
    let i;
    for(i = 0; i < array.length ; i++){
        data = data + (i+1) + ". " + fn(array[i]) + "\n";
    }
    if(!(opcionAlterna == undefined)){
        data = data + (i + 1) + ". " + opcionAlterna + " \n";
        data = data + (i + 2) + ". Salir";
    } else {
        data = data + (i + 1) + ". Salir"
    }
    
    return data;
}

class Producto{
    constructor(nombre, categoria, cantidad, precio, costo){
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

    calcularBeneficio(){
        alert(`El beneficio costo-precio de ${this.nombre} es de ${this.precio - this.costo}`);
        return this.precio - this.costo;
    }

    agregarStock(cantidad){
        this.cantidad += cantidad;
        alert(`Se ha agregado la cantidad de ${cantidad}. Tu cantidad actual de ${this.nombre} es de ${this.cantidad}`);
    }

    venderProducto(cantidad){
        while(this.cantidad - cantidad < 0){
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

    productos.push(new Producto(nombre, categoria, cantidad, precio, costo));
}

const comprar = () => {
    while(true){
        seleccion = verificarNumero(`Que desea comprar.\n${listarArray(productos, el => el.nombre, "Agregar otro producto")}`) - 1;
        if(productos[seleccion]){
            let cantidad = verificarNumero(`Acaba de seleccionar ${productos[seleccion].nombre}, su cantidad actual es de ${productos[seleccion].cantidad} y su precio es de ${productos[seleccion].costo}, ¿Cuanto comprará?`)
            while(cantidad < 0){
                alert("Eligio una cantidad negativa, por favor vuelva a introducir la cantidad");
                cantidad = verificarNumero(`Acaba de seleccionar ${productos[seleccion].nombre}, su cantidad actual es de ${productos[seleccion].cantidad} y su precio es de ${productos[seleccion].costo}, ¿Cuanto comprará?`)
            }
            productos[seleccion].agregarStock(cantidad);
        } else if (seleccion == productos.length){
            crearProducto();
        } else if (seleccion == productos.length + 1){
            break;
        } else {
            alert("Selecciono un codigo erroneo, vuelva a intentarlo.");
            continue;
        }
    }
}

const vender = () => {
    while(true){
        seleccion = verificarNumero(`Que desea vender.\n${listarArray(productos, el => el.nombre)}`) - 1;
        if(productos[seleccion]){
            let cantidad = verificarNumero(`Acaba de seleccionar ${productos[seleccion].nombre}, su cantidad actual es de ${productos[seleccion].cantidad} y su precio es de ${productos[seleccion].costo}, ¿Cuanto venderá?`)
            while(cantidad < 0){
                alert("Eligio una cantidad negativa, por favor vuelva a introducir la cantidad");
                cantidad = verificarNumero(`Acaba de seleccionar ${productos[seleccion].nombre}, su cantidad actual es de ${productos[seleccion].cantidad} y su precio es de ${productos[seleccion].costo}, ¿Cuanto venderá?`)
            }
            productos[seleccion].venderProducto(cantidad);
        } else if (seleccion == productos.length){
            break;
        } else {
            alert("Selecciono un codigo erroneo, vuelva a intentarlo.");
            continue;
        }
    }
}

productos.push(new Producto("Lechuga", "Verdura", 0, 50, 20));
productos.push(new Producto("Pollo", "Carne", 0, 120, 50));
productos.push(new Producto("Res", "Carne", 0, 180, 80));


let seleccion = true
while(seleccion){
    switch(prompt("Buenos dias.\n¿Que desea hacer hoy?\n1.Comprar\n2.Vender\n3.Agregar Producto\n4.Salir")){
        case "1":
            alert("Ha seleccionado Comprar.");
            comprar();
            break;
        case "2":
            alert("Ha seleccionado Vender.");
            vender();
            break;
        case "3":
            alert("Ha seleccionado Agregar Producto.");
            crearProducto();
            break;
        case "4":
            alert("Ha seleccionado Salir.");
            seleccion = false;
            break;
        case null:
            alert("Ha seleccionado Salir.");
            seleccion = false;
            break;
        default:
            alert("Ha seleccionado cualquier cosa señor/a.");
            break;
    }
}