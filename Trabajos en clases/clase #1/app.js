class Alumnos {
    constructor(nombre, numeroCuenta) {
        this.nombre = nombre;
        this.numeroCuenta = numeroCuenta;
        this.siguiente = null
    }
    info() {
        return `Nombre: ${this.nombre}, Numero de cuenta: ${this.numeroCuenta}`
    }
}

class Clase {
    constructor() {
        this.inicio = null;
        this.final = null;
    }

    _agregateAlumno(alumno, nodoX) {
        if (nodoX.siguiente === null) {
            nodoX.siguiente = alumno;
        } else {
            this._agregateAlumno(alumno, nodoX.siguiente);
        }
    }

    agregarAlumno(alumnos) {
        if (this.inicio == null) {
            this.inicio = alumnos;
        } else {
            this._agregateAlumno(alumnos, this.inicio);
        }
    }



    listado() {
        let resultado = '';
        let actual = this.inicio;
        while (actual !== null) {
            resultado += actual.info() + '\n';
            actual = actual.siguiente;
        }
        return resultado;
    }

    listado2() {
        let aux = this.inicio

        if (aux.siguiente !== null) {
            return this._listate(aux)
        } else {
            return aux.info()
        }
    }

    _listate(aux) {
        let resultado = ''

        if (aux !== null) {
            resultado += aux.info() + '\n'
            return resultado + this._listate(aux.siguiente)
        }
        return resultado
    }

    listarInverso() {
        let aux = this.inicio

        if (aux.siguiente !== null) {
            return  this._listateAlreves(aux)
        } else {
            return aux.info()
        }
    }

    _listateAlreves(aux) {
        let resultado = ''

        if (aux !== null) {
            resultado += aux.info() + '\n'
            return this._listateAlreves(aux.siguiente) + resultado
        }
        return resultado
    }

    buscar(numeroCuenta) {
        let aux = this.inicio

        while (aux.siguiente !== null) {
            if (aux.numeroCuenta === numeroCuenta) {
                return aux
            }
            aux = aux.siguiente
        }
    }

    extraerPirmero() {
        let aux = this.inicio
        this.inicio = this.inicio.siguiente
        return aux
    }

    extraerUltimo() {
        let aux = this.inicio
        while (aux.siguiente.siguiente !== null) {
            aux = aux.siguiente
        }
        let ultimo = aux.siguiente
        aux.siguiente = null
        return ultimo
    }

}

let g = new Clase()
let a = new Alumnos('Juan', 123)
let b = new Alumnos('Pedro', 124)
let c = new Alumnos('Maria', 125)

g.agregarAlumno(a)
g.agregarAlumno(b)
g.agregarAlumno(c)

console.log(g.listado2())
console.log(g.listarInverso())