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
        // if (this.inicio == null) {
        //     this.inicio = alumnos;
        //     this.final = this.inicio;
        // } else {
        //     this.final.siguiente = alumnos;
        //     this.final = alumnos;
        // }
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

    // buscar(numeroCuenta) {
    //     let aux = this.inicio
    //
    //     while (aux.numeroCuenta ==)
    // }
}

let a = new Alumnos('Juan', 123);
let b = new Alumnos('Pedro', 456);
let c = new Alumnos('Maria', 789);
let e = new Clase()
e.agregarAlumno(a);
e.agregarAlumno(b);
e.agregarAlumno(c);
console.log(e.listado());