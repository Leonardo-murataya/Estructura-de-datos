class Alumnos {
    constructor(nombre, numeroCuenta) {
        this.nombre = nombre;
        this.numeroCuenta = numeroCuenta;
        this.siguiente = null
        this.anterior = null
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

    listado() {
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

        while (aux.siguiente !== null) { aux = aux.siguiente }

        while (aux !== null) {
            resultado += aux.info() + '\n'
            aux = aux.anterior
        }
        return resultado
    }


    agregarAlumno(alumnos) {
        if (this.inicio == null) {
            this.inicio = alumnos;
        } else {
            this._agregateAlumno(alumnos, this.inicio);
        }
    }

    _agregateAlumno(alumno, nodoX) {
        if (nodoX.siguiente === null) {
            nodoX.siguiente = alumno;
            alumno.anterior = nodoX
        } else {
            this._agregateAlumno(alumno, nodoX.siguiente);
        }
    }

    agregarAntesDe(alumno, numeroCuenta) {
        let aux = this.inicio;

        while (aux !== null) {
            if (aux.numeroCuenta === numeroCuenta) {
                alumno.anterior = aux.anterior;
                if (aux.anterior !== null) {
                    aux.anterior.siguiente = alumno;
                } else {
                    this.inicio = alumno;
                }
                alumno.siguiente = aux;
                aux.anterior = alumno;
                return;
            }
            aux = aux.siguiente;
        }
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


}

let g = new Clase()
let a = new Alumnos('A', 122)
let b = new Alumnos('B', 123)
let h = new Alumnos('H', 124)
let r = new Alumnos('R', 125)
let u = new Alumnos('U', 126)
let w = new Alumnos('W', 127)
let k = new Alumnos('K', 128)
let z = new Alumnos('Z', 129)
let t = new Alumnos('t', 130)


g.agregarAlumno(a)
g.agregarAlumno(b)
g.agregarAlumno(h)
g.agregarAlumno(r)
g.agregarAlumno(u)
g.agregarAlumno(w)
g.agregarAlumno(k)
g.agregarAlumno(z)
g.agregarAlumno(t)


let x = new Alumnos('X', 121);
g.agregarAntesDe(x, 122);

console.log(g.listado())
