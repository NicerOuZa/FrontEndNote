function Person(info) {
  this.id = 000;
  this.name = "zt";
  this.a = {
    name: "aa",
    next() {
      console.log(this.name);
    }
  };
  this.info = info;
  this.create = this.a.next
}
var p = new Person({
    test:{
        hh(){
            console.log(this.name);
        }
    }
})


console.log(p.create === p.a.next)