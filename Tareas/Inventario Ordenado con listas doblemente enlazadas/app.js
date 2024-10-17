class producto {
    constructor(codigo, nombre, cantidad, costo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.siguiente = null;
        this.anterior = null;
    }

    info() {
        return `Codigo: ${this.codigo} Cantidad: ${this.cantidad} Nombre: ${this.nombre} Costo: ${this.costo}`;
    }
}

class inventario {
    constructor() {
        this.inicio = null;
        this.fin = null;
    }

    ordenar() {
        if (this.inicio != null) {
            let actual = this.inicio;
            while (actual != null) {
                let siguiente = actual.siguiente;
                while (siguiente != null) {
                    if (actual.codigo > siguiente.codigo) {
                        let temp = actual.codigo;
                        actual.codigo = siguiente.codigo;
                        siguiente.codigo = temp;
                    }
                    siguiente = siguiente.siguiente;
                }
                actual = actual.siguiente;
            }
        }
    }

    agregar(producto) {
        if (this.buscar(producto.codigo) !== null) {
            return 'Error: El código ingresado ya existe.';
        }

        if (this.inicio == null) {
            this.inicio = producto;
            this.fin = producto;
        } else {
            this.fin.siguiente = producto;
            producto.anterior = this.fin;
            this.fin = producto;
        }
        this.ordenar();
        return 'Producto agregado correctamente.';
    }

    buscar(codigo) {
        let aux = this.inicio;

        while (aux !== null) {
            if (aux.codigo === codigo) {
                return aux;
            }
            aux = aux.siguiente;
        }
        return null;
    }

    eliminar(codigo) {
        if (this.inicio === null) {
            return null;
        }

        if (this.inicio.codigo === codigo) {
            let eliminado = this.inicio;
            this.inicio = this.inicio.siguiente;
            if (this.inicio !== null) {
                this.inicio.anterior = null;
            } else {
                this.fin = null;
            }
            eliminado.siguiente = null;
            return eliminado;
        }

        let aux = this.inicio;
        while (aux.siguiente !== null && aux.siguiente.codigo !== codigo) {
            aux = aux.siguiente;
        }

        if (aux.siguiente !== null) {
            let eliminado = aux.siguiente;
            aux.siguiente = aux.siguiente.siguiente;
            if (aux.siguiente !== null) {
                aux.siguiente.anterior = aux;
            } else {
                this.fin = aux;
            }
            eliminado.siguiente = null;
            return eliminado;
        }
        return null;
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
        return this._listadoInversoRecursivo(this.fin);
    }

    _listadoInversoRecursivo(nodo) {
        if (nodo === null) {
            return '';
        }
        let res = nodo.info() + '<br><br>';
        res += this._listadoInversoRecursivo(nodo.anterior);
        return res;
    }

    extraerPrimerElemento() {
        if (this.inicio === null) {
            return null;
        }
        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        if (this.inicio !== null) {
            this.inicio.anterior = null;
        } else {
            this.fin = null;
        }
        aux.siguiente = null;
        return aux;
    }

    extraerUltimoElemento() {
        if (this.inicio === null) {
            return null;
        }
        let aux = this.fin;
        this.fin = this.fin.anterior;
        if (this.fin !== null) {
            this.fin.siguiente = null;
        } else {
            this.inicio = null;
        }
        aux.anterior = null;
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
    mostrarDetalles(resultado ? 'Producto encontrado:\n' + resultado.info() : 'Producto no encontrado.');
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
    mostrarDetalles('Inventario Inverso: <br>' + inventarioInstance.listadoInverso());
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