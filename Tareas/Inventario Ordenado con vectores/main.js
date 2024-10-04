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
        this.ordenar();
    }

    extraerPrimero() {
        if (this.datos.length === 0) {
            return null;
        }
        let temp = [];
        while (this.datos.length > 1) {
            temp.push(this.datos.pop());
        }
        let primero = this.datos.pop();
        while (temp.length > 0) {
            this.datos.push(temp.pop());
        }
        return primero;
    }

    extraerUltimo() {
        if (this.datos.length === 0) {
            return null;
        }
        return this.datos.pop();
    }

    recuperarListado() {
        let listado = '';
        let temp = [];
        while (this.datos.length > 0) {
            let producto = this.datos.pop();
            listado += producto.info() + '<br><br>';
            temp.push(producto);
        }
        while (temp.length > 0) {
            this.datos.push(temp.pop());
        }
        return listado;
    }

    recuperarListadoInverso() {
        let listadoInverso = '';
        let temp = [];
        while (this.datos.length > 0) {
            temp.push(this.datos.pop());
        }
        while (temp.length > 0) {
            let producto = temp.pop();
            listadoInverso += producto.info() + '<br><br>';
            this.datos.push(producto);
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
    const producto = inventario.extraerPrimero();
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
    div.innerHTML = ''; // Limpiar contenido previo
    if (typeof producto === "string") {
        div.innerHTML = `<p>${producto}</p>`;
    } else {
        div.innerHTML = `<p id="producto-${producto.codigo}">${producto.info()}</p>`;
    }
    div.classList.add("activo");
}