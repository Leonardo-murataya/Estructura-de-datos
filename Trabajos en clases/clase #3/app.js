class Proceso {
    constructor(ciclos) {
        this.ciclos = ciclos;
        this.siguiente = null;
        this.anterior = null;
    }

    restarCiclo() {
        this.ciclos--;
    }
}

class listaCircular {
    constructor() {
        this.inicio = null
    }

    agregar(Proceso) {
        if (this.inicio === null) {
            this.inicio = Proceso;
            Proceso.siguiente = Proceso;
            Proceso.anterior = Proceso;
            return true;

        } else {
            let aux = this.inicio;
            while (aux.siguiente !== this.inicio) {
                aux = aux.siguiente
            }
            aux.siguiente = Proceso
            Proceso.anterior = aux;
            Proceso.siguiente = this.inicio;
            this.inicio.anterior = Proceso;
            return true;
        }
    }

    extraerInicio() {
        if (this.inicio === null) {
            return null;
        }

        if (this.inicio.siguiente === this.inicio) {
            let temp = this.inicio;
            this.inicio = null;
            return temp;
        }

        let temp = this.inicio;
        temp.anterior.siguiente = temp.siguiente;
        temp.siguiente.anterior = temp.anterior;
        this.inicio = temp.siguiente;
        temp.siguiente = null;
        return temp;
    }

    procesoActual() {
        return this.inicio;
    }

    avanzar() {
        this.inicio = this.inicio.siguiente;
    }
}


tareas = new listaCircular();
let procesos = 0;

for (let i = 1; i <= 300; i++) {
    let probabilidad = Math.ceil(Math.random() * 100);
    procesos = i + ': ';
    if (probabilidad <= 39) {
        let ciclos = Math.ceil(Math.random() * 11) + 4;
        let nuevoProceso = new Proceso(ciclos);
        tareas.agregar(nuevoProceso);
        procesos += 'Proceso nuevo con (' + ciclos + ') ciclos \n';
    }

    let procesoActual = tareas.procesoActual();
    if (procesoActual !== null) {
        procesoActual.restarCiclo();
        procesos += 'Proceso actual (' + procesoActual.ciclos + ') ciclos \n';
        if (procesoActual.ciclos === 0) {
            tareas.extraerInicio();
            procesos += 'Proceso terminado \n';
        } else {
            tareas.avanzar();
        }
        tareas.avanzar();
        procesos += 'Siguiente proceso ' + tareas.procesoActual().ciclos + ' ciclos \n';
        console.log(procesos);
    }
}

