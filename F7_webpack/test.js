class A {
    a = 1
}
function B(){
    this.a = 1
}

let myA = new A()


console.log(myA);
console.log(new B());