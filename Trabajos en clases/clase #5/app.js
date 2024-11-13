// Arlbol binario con clases

class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.izquierda = null;
        this.derecha = null;
    }
}

class Arbol {
    constructor() {
        this.raiz = null;
    }

    agregar(dato) {
        const nuevo = new Nodo(dato);
        if (this.raiz === null) {
            this.raiz = nuevo;
        } else {
            this.agregarNodo(this.raiz, nuevo);
        }
    }

    agregarNodo(nodo, nuevo) {
        if (nuevo.dato < nodo.dato) {
            if (nodo.izquierda === null) {
                nodo.izquierda = nuevo;
            } else {
                this.agregarNodo(nodo.izquierda, nuevo);
            }
        } else {
            if (nodo.derecha === null) {
                nodo.derecha = nuevo;
            } else {
                this.agregarNodo(nodo.derecha, nuevo);
            }
        }
    }

preOrden() {
    if (this.raiz === null) {
        return null;
    } else {
        let resultado = [];
        this.preOdenNodo(this.raiz, resultado);
        return resultado;
    }
}

preOdenNodo(nodo, resultado) {
    resultado.push(nodo.dato);
    if (nodo.izquierda !== null){
        this.preOdenNodo(nodo.izquierda, resultado);
    }
    if (nodo.derecha !== null) {
        this.preOdenNodo(nodo.derecha, resultado);
    }
}


}

const arbol = new Arbol();
arbol.agregar(10);
arbol.agregar(5);
arbol.agregar(15);
arbol.agregar(3);
arbol.agregar(7);
arbol.agregar(12);
arbol.agregar(18);

console.log(arbol); 

console.log(arbol.preOrden());

