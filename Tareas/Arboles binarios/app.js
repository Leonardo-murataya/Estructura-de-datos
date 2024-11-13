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

    // Agregar un nuevo nodo al arbol
    /*
        1. Crear un nuevo nodo con el dato
        2. Si la raiz es nula, asignar el nuevo nodo a la raiz
        3. Si no, llamar a la funcion agregarNodo
     */
    agregar(dato) {
        const nuevo = new Nodo(dato);
        if (this.raiz === null) {
            this.raiz = nuevo;
        } else {
            this.agregarNodo(this.raiz, nuevo);
        }
    }

    // Agregar un nuevo nodo al arbol
    /*
        1. Si el dato del nuevo nodo es menor al dato del nodo actual
            1.1 Si el nodo actual no tiene un nodo a la izquierda, asignar el nuevo nodo a la izquierda
            1.2 Si no, llamar a la funcion agregarNodo con el nodo izquierdo como parametro
     */
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

    // Recorridos
    /*
        1. Si la raiz es nula, retornar nulo
        2. Crear un array vacio para guardar los resultados
        3. Llamar a la funcion preOrdenNodo con la raiz y el array como parametros
        4. Retornar el array con los resultados
     */
    preOrden() {
        if (this.raiz === null) {
            return null;
        } else {
            let resultado = [];
            this.preOdenNodo(this.raiz, resultado);
            return resultado;
        }
    }

    // Recorridos
    /*
        1. Agregar el dato del nodo actual al array de resultados
        2. Si el nodo actual tiene un nodo a la izquierda, llamar a la funcion preOrdenNodo con el nodo izquierdo y el array de resultados
        3. Si el nodo actual tiene un nodo a la derecha, llamar a la funcion preOrdenNodo con el nodo derecho y el array de resultados
     */
    preOdenNodo(nodo, resultado) {
        resultado.push(nodo.dato);
        if (nodo.izquierda !== null){
            this.preOdenNodo(nodo.izquierda, resultado);
        }
        if (nodo.derecha !== null) {
            this.preOdenNodo(nodo.derecha, resultado);
        }
    }

    // Recorridos
    postOrden() {
        if (this.raiz === null) {
            return null;
        } else {
            let resultado = [];
            this.postOrdenNodo(this.raiz, resultado);
            return resultado;
        }
    }

    postOrdenNodo(nodo, resultado) {
        if (nodo.izquierda !== null){
            this.preOdenNodo(nodo.izquierda, resultado);
        }
        if (nodo.derecha !== null) {
            this.preOdenNodo(nodo.derecha, resultado);
        }
        resultado.push(nodo.dato);
    }

    inOrden() {
        if (this.raiz === null) {
            return null;
        } else {
            let resultado = [];
            this.inOrdenNodo(this.raiz, resultado);
            return resultado;
        }
    }

    inOrdenNodo(nodo, resultado) {
        if (nodo.izquierda !== null){
            this.preOdenNodo(nodo.izquierda, resultado);
        }
        resultado.push(nodo.dato);
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

console.log(arbol.postOrden());

console.log(arbol.inOrden());
