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
        if (this.buscar(producto.codigo) !== null) {
            return false;
        }
        this.datos.push(producto);
        this.ordenar();
        return true;
    }

    buscar(codigo) {
        let inicio = 0;
        let fin = this.datos.length - 1;
        while (inicio <= fin) {
            let medio = Math.floor((inicio + fin) / 2);
            if (this.datos[medio].codigo === codigo) {
                return this.datos[medio];
            } else if (this.datos[medio].codigo < codigo) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }
        return null;
    }

    eliminar(codigo) {
        let posicion = this.buscar(codigo)
        if (posicion != null) {
            for (let i = posicion; i < this.datos.length; i++){
                this.datos[i] = this.datos[i + 1]
            }
            this.datos.pop()
        } else {
            return null
        }
    }

    extraerPrimero() {
        if (this.datos.length === 0) {
            return null;
        } else {
            let posicion = this.datos[0]

            for (let i = 0; i < this.datos.length-1; i++){
                this.datos[i] = this.datos[i + 1]
            }

            this.datos.length = this.datos.length - 1

            return primero;
        }
    }

    extraerUltimo() {
        if (this.datos.length === 0) {
            return null;
        }
        return this.datos.pop();
    }

    recuperarListado() {
        let listado = '';
        for (let i = 0; i < this.datos.length; i++) {
            listado += this.datos[i].info() + '<br><br>';
        }
        return listado;
    }

    recuperarListadoInverso() {
        let listadoInverso = '';
        for (let i = this.datos.length - 1; i >= 0; i--) {
            listadoInverso += this.datos[i].info() + '<br><br>';
        }
        return listadoInverso;
    }

    ordenar() {
        for (let i = 1; i < this.datos.length; i++) {
            let key = this.datos[i];
            let j = i - 1;
            while (j >= 0 && this.datos[j].codigo > key.codigo) {
                this.datos[j + 1] = this.datos[j];
                j = j - 1;
            }
            this.datos[j + 1] = key;
        }
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
        let producto = new Producto(nombre, precio, cantidad, codigo);
        if (inventario.agregar(producto)) {
            mostrarDetalles(producto);
        } else {
            mostrarAlerta("El código ingresado ya existe");
        }
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
    mostrarDetalles(`Producto con código ${codigo} eliminado`);
});

document.getElementById("btnListar").addEventListener("click", () => {
    mostrarDetalles(inventario.recuperarListado());
});

document.getElementById("btnExtraerPrimero").addEventListener("click", () => {
    const producto = inventario.extraerUltimo();
    if (producto) {
        mostrarDetalles(`Producto extraído: ${producto.info()}`);
    } else {
        mostrarAlerta("No hay productos para extraer");
    }
});

document.getElementById("btnExtraerUltimo").addEventListener("click", () => {
    const producto = inventario.extraerUltimo();
    if (producto) {
        mostrarDetalles(`Producto extraído: ${producto.info()}`);
    } else {
        mostrarAlerta("No hay productos para extraer");
    }
});

document.getElementById("btnListarInverso").addEventListener("click", () => {
    mostrarDetalles(inventario.recuperarListadoInverso());
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
    div.innerHTML = '';
    if (typeof producto === "string") {
        div.innerHTML = `<p>${producto}</p>`;
    } else {
        div.innerHTML = `<p id="producto-${producto.codigo}">${producto.info()}</p>`;
    }
    div.classList.add("activo");
}