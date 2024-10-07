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

    buscar(numeroCuenta) {
        let aux = this.inicio

        while (aux.siguiente !== null) {
            if (aux.numeroCuenta === numeroCuenta) {
                return aux
            }
            aux = aux.siguiente
        }
    }

    extraerPirmero(numeroCuenta) {
        let aux = this.inicio
        this.inicio = this.inicio.siguiente
        return aux
    }

    extraerUltimo(numeroCuenta) {
        let aux = this.inicio
        while (aux.siguiente.siguiente !== null) {
            aux = aux.siguiente
        }
        let ultimo = aux.siguiente
        aux.siguiente = null
        return ultimo
    }

}
