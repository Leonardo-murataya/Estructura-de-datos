// Clase nodo en el árbol binario
class Nodo {
    constructor(dato) {
        this.dato = dato; // Valor del nodo
        this.izquierda = null; // Hijo izquierdo
        this.derecha = null; // Hijo derecho
    }
}

// Clase de árbol binario
class Arbol {
    // Constructor que inicializa la raíz del árbol
    constructor() {
        this.raiz = null; // Raíz del árbol
    }

    construir(expresion) {
        const salida = []; // Pila
        const operadores = []; // Pila de operadores
        const precedencia = { '+': 1, '-': 1, '*': 2, '/': 2 }; // operadores

        // Recorrer cada token de la expresión o nodo
        for (const token of expresion) {
            if (!isNaN(token)) {
                // si el token es un numero, se agrega a la pila de salida
                salida.push(new Nodo(token));
            } else {
                // si el token es un operador, se maneja según su precedencia
                while (operadores.length && precedencia[operadores[operadores.length - 1].dato] >= precedencia[token]) {
                    salida.push(operadores.pop());
                }
                operadores.push(new Nodo(token));
            }
        }

        // Vaciar la pila de operadores
        while (operadores.length) {
            salida.push(operadores.pop());
        }

        const pila = []; // Pila para construir el árbol
        for (const token of salida) {
            if (!isNaN(token.dato)) {
                // Si el token es un numero, se agrega a la pila
                pila.push(token);
            } else {
                // Si el token es un operador, se crean los nodos hijos
                token.derecha = pila.pop();
                token.izquierda = pila.pop();
                pila.push(token);
            }
        }

        // La raíz del árbol es el último nodo en la pila
        this.raiz = pila.pop();
    }

    // Metodo para realizar el recorrido preorder del árbol
    preorder(nodo, resultado = []) {
        if (nodo !== null) {
            resultado.push(nodo.dato);
            this.preorder(nodo.izquierda, resultado);
            this.preorder(nodo.derecha, resultado);
        }
        return resultado;
    }

    // Metodo para realizar el recorrido postorder del árbol
    postorder(nodo, resultado = []) {
        if (nodo !== null) {
            this.postorder(nodo.izquierda, resultado);
            this.postorder(nodo.derecha, resultado);
            resultado.push(nodo.dato);
        }
        return resultado;
    }
}

// Función para preorder
function resolverPreorder(expresion) {
    const pila = []; // Pila para evaluar la expresión
    for (let i = expresion.length - 1; i >= 0; i--) {
        const token = expresion[i];
        if (!isNaN(token)) {
            // Si el token es un número, se agrega a la pila
            pila.push(parseInt(token));
        } else {
            // Si el token es un operador, se aplican los operandos
            const operando1 = pila.pop();
            const operando2 = pila.pop();
            switch (token) {
                case '+':
                    pila.push(operando1 + operando2);
                    break;
                case '-':
                    pila.push(operando1 - operando2);
                    break;
                case '*':
                    pila.push(operando1 * operando2);
                    break;
                case '/':
                    pila.push(operando1 / operando2);
                    break;
            }
        }
    }
    return pila.pop(); // El resultado final
}

// Función para postorder
function resolverPostorder(expresion) {
    const pila = []; // Pila para evaluar la expresión
    for (const token of expresion) {
        if (!isNaN(token)) {
            // Si el token es un número, se agrega a la pila
            pila.push(parseInt(token));
        } else {
            // Si el token es un operador, se aplican los operandos
            const operando2 = pila.pop();
            const operando1 = pila.pop();
            switch (token) {
                case '+':
                    pila.push(operando1 + operando2);
                    break;
                case '-':
                    pila.push(operando1 - operando2);
                    break;
                case '*':
                    pila.push(operando1 * operando2);
                    break;
                case '/':
                    pila.push(operando1 / operando2);
                    break;
            }
        }
    }
    return pila.pop(); // El resultado final
}


const expresion = "3+8-6*3+4*4/2";


const arbol = new Arbol();
arbol.construir(expresion);

const preorder = arbol.preorder(arbol.raiz);
const postorder = arbol.postorder(arbol.raiz);
console.log("Preorder:", preorder.join(", "));
console.log("Postorder:", postorder.join(", "));

const resultadoPreorder = resolverPreorder(preorder);
const resultadoPostorder = resolverPostorder(postorder);
console.log("Resultado Preorder:", resultadoPreorder);
console.log("Resultado Postorder:", resultadoPostorder);