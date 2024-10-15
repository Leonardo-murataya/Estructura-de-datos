class producto {
    constructor(codigo, nombre, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.siguiente = null;
    }

    info() {
        return `Nombre: ${this.nombre}, Cantidad: ${this.cantidad}, Precio: ${this.costo}, Codigo: ${this.codigo}`;
    }
}

class inventario {
    constructor() {
        this.inicio = null;
    }

    agregar(producto) {
        if (this.buscar(producto.codigo) !== null) {
            return 'Error: El código ingresado ya existe.';
        }

        if (this.inicio === null) {
            this.inicio = producto;
        } else {
            let aux = this.inicio;
            while (aux.siguiente !== null) {
                aux = aux.siguiente;
            }
            aux.siguiente = producto;
        }
        return 'Producto agregado exitosamente.';
    }

    buscar(codigo) {
        let aux = this.inicio;
        while (aux !== null) {
            if (aux.codigo === codigo) {
                return aux.info();
            }
            aux = aux.siguiente;
        }
        return null; // No se encontró el producto
    }

    eliminar(codigo) {
        if (this.inicio === null) {
            return null; // Lista vacía
        }

        if (this.inicio.codigo === codigo) {
            let eliminado = this.inicio;
            this.inicio = this.inicio.siguiente;
            eliminado.siguiente = null;
            return eliminado;
        }

        return null; // No se encontró el producto
    }

    listar() {
        let actual = this.inicio;
        let res = '';
        while (actual) {
            res += actual.info() + '<br><br>';
            actual = actual.siguiente;
        }
        return res;
    }

    listadoInverso() {
        return this._listadoInversoRecursivo(this.inicio);
    }

    _listadoInversoRecursivo(nodo) {
        if (nodo === null) {
            return '';
        }
        let res = this._listadoInversoRecursivo(nodo.siguiente);
        res += nodo.info() + '<br><br>';
        return res;
    }

    extraerPrimerElemento() {
        if (this.inicio === null) {
            return null; // Lista vacía
        }
        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        aux.siguiente = null; // Desconectar el nodo
        return aux;
    }

    extraerUltimoElemento() {
        if (this.inicio === null) {
            return null; // Lista vacía
        }
        if (this.inicio.siguiente === null) {
            let aux = this.inicio;
            this.inicio = null;
            return aux;
        }
        let actual = this.inicio;
        while (actual.siguiente.siguiente !== null) {
            actual = actual.siguiente;
        }
        let aux = actual.siguiente;
        actual.siguiente = null;
        return aux;
    }
}

const inventarioInstance = new inventario();

document.getElementById('btnAgregar').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const cantidad = document.getElementById('cantidad').value;
    const costo = document.getElementById('costo').value;
    const codigo = document.getElementById('codigo').value;

    if (nombre && cantidad && costo && codigo) {
        const nuevoProducto = new producto(codigo, nombre, cantidad, costo);
        const resultado = inventarioInstance.agregar(nuevoProducto);
        if (resultado.startsWith('Error')) {
            mostrarAlerta(resultado);
        } else {
            mostrarDetalles(resultado + '\n' + nuevoProducto.info());
        }
    } else {
        mostrarAlerta('Por favor, complete todos los campos.');
    }
});

document.getElementById('btnBuscar').addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value;
    const resultado = inventarioInstance.buscar(codigo);
    mostrarDetalles(resultado ? 'Producto encontrado:\n' + resultado : 'Producto no encontrado.');
});

document.getElementById('btnEliminar').addEventListener('click', () => {
    const codigo = document.getElementById('codigo').value;
    const eliminado = inventarioInstance.eliminar(codigo);
    mostrarDetalles(eliminado ? 'Producto eliminado:\n' + eliminado.info() : 'Producto no encontrado.');
});

document.getElementById('btnListar').addEventListener('click', () => {
    mostrarDetalles('Inventario:\n' + inventarioInstance.listar());
});

document.getElementById('btnListarInverso').addEventListener('click', () => {
    mostrarDetalles('Inventario Inverso:\n' + inventarioInstance.listadoInverso());
});

document.getElementById('btnExtraerPrimero').addEventListener('click', () => {
    const extraido = inventarioInstance.extraerPrimerElemento();
    mostrarDetalles(extraido ? 'Primer producto extraído:\n' + extraido.info() : 'No hay productos en el inventario.');
});

document.getElementById('btnExtraerUltimo').addEventListener('click', () => {
    const extraido = inventarioInstance.extraerUltimoElemento();
    mostrarDetalles(extraido ? 'Último producto extraído:\n' + extraido.info() : 'No hay productos en el inventario.');
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
    const div = document.getElementById("detalles");
    div.innerHTML = '';
    if (typeof producto === "string") {
        div.innerHTML = `<p>${producto}</p>`;
    } else {
        div.innerHTML = `<p>${producto.info()}</p>`;
    }
    div.classList.add("activo");
}