class persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.padre = null;
    }
}

let p1 = new persona("Juan", 30);
let p2 = new persona("Pedro", 40);

p1.padre = p2;
console.log(p1);