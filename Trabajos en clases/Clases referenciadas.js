class persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.padre = null;
    }
}

let p1 = new persona("Juan", 30);
let p2 = new persona("Pedro", 40);
let p3 = new persona("Ana", 50);
let p4 = new persona("Maria", 60);


p2.padre = p1;
p3.padre = p2;
p4.padre = p3;

let aux = p4;

while (aux != null) {
    console.log(aux.nombre);
    aux = aux.padre;
}

/*
* Maria
* Ana
* Pedro
* Juan
* */