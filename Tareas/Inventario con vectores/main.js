class Producto {
    constructor(nombre, precio, cantidad, codigo) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.codigo = codigo;
    }

    info() {
        return `Producto: ${this.nombre}, Precio: $${this.precio}, Cantidad: ${this.cantidad}, Código: ${this.codigo}`;
    }
}

class Inventario {
    constructor() {
        this.datos = [];
    }

    agregar(producto) {
        this.datos.push(producto);
    }

    buscar(codigo) {
        for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i].codigo === codigo) {
                return this.datos[i];
            }
        }
        return null;
    }

    eliminar(codigo) {
        let temp = [];
        while (this.datos.length > 0) {
            let producto = this.datos.pop();
            if (producto.codigo !== codigo) {
                temp.push(producto);
            }
        }
        while (temp.length > 0) {
            this.datos.push(temp.pop());
        }
    }

    insertarEnPosicion(producto, posicion) {
        if (posicion < 0 || posicion > this.datos.length) {
            return false;
        }
        for (let i = this.datos.length; i > posicion; i--) {
            this.datos[i] = this.datos[i - 1];
        }
        this.datos[posicion] = producto;
        return true;
    }

   recuperarListado() {
    let listado = '';
    for (let i = 0; i < this.datos.length; i++) {
        listado += this.datos[i].info();
        if (i < this.datos.length - 1) {
            listado += '<br><br>';
        }
    }
    return listado;
}

extraerPrimero() {
    if (this.datos.length === 0) {
        return null;
    }
    let primero = this.datos[0];
    for (let i = 1; i < this.datos.length; i++) {
        this.datos[i - 1] = this.datos[i];
    }
    this.datos.pop();
    return primero;
    }
}

let inventario = new Inventario();

document.getElementById("btnAgregar").addEventListener("click", () => {
    let nombre = document.getElementById("nombre").value.trim();
    let cantidad = document.getElementById("cantidad").value.trim();
    let precio = document.getElementById("costo").value.trim();
    let codigo = document.getElementById("codigo").value.trim();

    if (!nombre || !cantidad || !precio || !codigo) {
        mostrarAlerta("Por favor ingrese valores a los inputs");
    } else {
        if (inventario.buscar(codigo) != null) {
            mostrarAlerta("El código ingresado ya existe");
            return;
        }

        let producto = new Producto(nombre, precio, cantidad, codigo);
        inventario.agregar(producto);
        mostrarDetalles(producto);
    }
});

document.getElementById("btnBuscar").addEventListener("click", () => {
    let codigo = document.getElementById("codigo").value;
    let producto = inventario.buscar(codigo);

    if (producto === null) {
        mostrarDetalles("Producto no encontrado");
    } else {
        mostrarDetalles(producto);
    }
});

document.getElementById("btnEliminar").addEventListener("click", () => {
    let codigo = document.getElementById("codigo").value;
    inventario.eliminar(codigo);
    let producto = document.querySelectorAll(`#producto-${codigo}`);
    producto.forEach((element) => {
        element.remove();
    });

    mostrarDetalles(`Producto con código ${codigo} eliminado`);
});

document.getElementById("btnInsertar").addEventListener("click", () => {
    let nombre = document.getElementById("nombre").value.trim();
    let cantidad = document.getElementById("cantidad").value.trim();
    let precio = document.getElementById("costo").value.trim();
    let codigo = document.getElementById("codigo").value.trim();
    let posicion = parseInt(document.getElementById("posicion").value.trim(), 10);

    if (isNaN(posicion) || posicion < 0 || posicion > inventario.datos.length) {
        mostrarAlerta("Posición no válida");
        return;
    }

    const producto = new Producto(nombre, precio, cantidad, codigo);
    const resultado = inventario.insertarEnPosicion(producto, posicion);
    if (resultado) {
        mostrarAlerta(`Producto insertado en posición ${posicion}: ${producto.info()}`);
    } else {
        mostrarAlerta(`Posición ${posicion} no válida`);
    }
});

document.getElementById("btnListar").addEventListener("click", () => {
    mostrarDetalles(inventario.recuperarListado());
});

document.getElementById("btnExtraer").addEventListener("click", () => {
    const producto = inventario.extraerPrimero();
    if (producto) {
        mostrarDetalles(`Producto extraído: ${producto.info()}`);
    } else {
        mostrarAlerta("No hay productos para extraer");
    }
});

function mostrarAlerta(mensaje) {
    let div = document.createElement("div");
    div.classList.add("alerta");
    div.innerHTML = `<p>${mensaje}</p>`;
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 3500);
}

function mostrarDetalles(producto) {
    let div = document.getElementById("detalles");
    div.innerHTML = ''; // Limpiar contenido previo
    if (typeof producto === "string") {
        div.innerHTML = `<p>${producto}</p>`;
    } else {
        div.innerHTML = `<p id="producto-${producto.codigo}">${producto.info()}</p>`;
    }
    div.classList.add("activo");
}