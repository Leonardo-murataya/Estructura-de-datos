class transporte {
    constructor(nombre, minutos) {
        this.nombre = nombre;
        this.minutos = minutos;
        this.siguiente = null;
        this.anterior = null;
    }
}

class listaCircular {
    constructor() {
        this.inicio = null;
        this.fin = null;
    }

    agregar(base) {
        if (this.inicio === null) {
            this.inicio = base;
            this.fin = base;
            this.fin.siguiente = this.inicio;
            this.inicio.anterior = this.fin;
        } else {
            this.fin.siguiente = base;
            base.anterior = this.fin;
            base.siguiente = this.inicio;
            this.inicio.anterior = base;
            this.fin = base;
        }
    }

    buscar(base) {
        let actual = this.inicio;
        let encontrado = false;
        do {
            if (actual.nombre === base) {
                encontrado = true;
            }
            actual = actual.siguiente;
        } while (actual !== this.inicio && !encontrado);
        return encontrado;
    }

    eliminar(base) {
        let actual = this.inicio;
        let anterior = null;
        let encontrado = false;
        do {
            if (actual.nombre === base) {
                if (actual === this.inicio) {
                    this.inicio = this.inicio.siguiente;
                    this.inicio.anterior = this.fin;
                    this.fin.siguiente = this.inicio;
                } else if (actual === this.fin) {
                    this.fin = anterior;
                    this.fin.siguiente = this.inicio;
                    this.inicio.anterior = this.fin;
                } else {
                    anterior.siguiente = actual.siguiente;
                    actual.siguiente.anterior = anterior;
                }
                encontrado = true;
            }
            anterior = actual;
            actual = actual.siguiente;
        } while (actual !== this.inicio && !encontrado);
    }

    listar() {
        let actual = this.inicio;
        let resultado = '';
        do {
            resultado += actual.nombre + ' -> ';
            actual = actual.siguiente;
        } while (actual !== this.inicio);
        return resultado;
    }

    agregarInicio(base) {
        this.inicio.anterior = base;
        base.siguiente = this.inicio;
        base.anterior = this.fin;
        this.fin.siguiente = base;
        this.inicio = base;
    }

    crearRuta(baseInicio, minutosAtrabajar) {
        let actual = this.inicio;
        let encontrado = false;
        let minutosAcumulados = 0;
        let resultado = '';

        // Buscar la base de inicio
        do {
            if (actual.nombre === baseInicio) {
                encontrado = true;
                break;
            }
            actual = actual.siguiente;
        } while (actual !== this.inicio);

        if (!encontrado) {
            return 'Base de inicio no encontrada';
        }

        // Recorrer las bases acumulando minutos
        do {
            resultado += `${actual.nombre} (${minutosAcumulados} min) -> `;
            minutosAcumulados += actual.minutos;
            actual = actual.siguiente;
        } while (minutosAcumulados < minutosAtrabajar);

        return resultado + `Total: ${minutosAcumulados} min`;
    }
}

let base1 = new transporte('Base 1', 10);
let base2 = new transporte('Base 2', 20);
let base3 = new transporte('Base 3', 30);
let base4 = new transporte('Base 4', 40);
let base5 = new transporte('Base 5', 50);

let lista = new listaCircular();
lista.agregar(base1);
lista.agregar(base2);
lista.agregar(base3);
lista.agregar(base4);
lista.agregar(base5);

console.log(lista.listar());
console.log(lista.buscar('Base 3'));
lista.eliminar('Base 3');
console.log(lista.listar());
console.log(lista.crearRuta('Base 2', 200));
console.log(lista.listar());
console.log(lista.crearRuta('Base 4', 200));
console.log(lista.crearRuta('Base 6', 200));
