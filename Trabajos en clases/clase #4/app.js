class trabajador {
    constructor(clicos) {
        this.clicos = clicos;
        this.siguiente = null;
    }

    info(){
        console.log(this.clicos);
    }
    restarCiclo() {
        this.clicos--;
    }
}

class FIFO {
    constructor() {
        this.inicio = null;
    }

    enqueue(nuevo) {
        if (this.inicio === null) {
            this.inicio = nuevo;
        } else {
            let aux = this.inicio;
            this.inicio = nuevo;
            nuevo.siguiente = aux;
        }
    }

    dequeue() {
        if (this.inicio === null) {
            return null;
        }

        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        return aux;
    }

    peek() {
        return this.inicio;
    }

}

let fifo = new FIFO();

let proceso = 0;
let ciclosVacios = 0;
let procesosCompletados = 0;

for (let i = 1; i <= 300; i++){
    let probabilidad = Math.random() * 100;
    proceso = i + ":"

    if (probabilidad <= 30){
        let ciclos = Math.ceil(Math.random() * 11) + 4;
        let nuevoProceso = new trabajador(ciclos);
        fifo.enqueue(nuevoProceso);
        proceso += "Proceso nuevo con (" + ciclos + ") ciclos \n";
    }

    let procesoActual = fifo.peek();

    if (procesoActual !== null) {
        procesoActual.restarCiclo();
        proceso += "Proceso actual (" + procesoActual.clicos + ") ciclos \n";
        if (procesoActual.clicos === 0) {
            fifo.dequeue();
            procesosCompletados++;
            proceso += "Proceso terminado \n";
        }
    } else {
        ciclosVacios++;
    }

    console.log(proceso);
}

console.log("Ciclos vacíos: " + ciclosVacios);
console.log("Procesos completados: " + procesosCompletados);