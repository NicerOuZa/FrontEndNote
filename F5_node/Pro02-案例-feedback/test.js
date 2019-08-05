var p = {
  a: 12,
  fun1() {
    console.log(this.a);
  },
  fun2() {
    console.log("aa");
  },
  fun3: function() {
    console.log(this.a);
  },
  fun4: () => {
    console.log(this.a);
  }
};

function Dog() {
  this.dd = "zt";
  this.info = {
    msg: 123,
    methods: {
      a: this.dd,
      fun1() {
        console.log(this.a);
      }
    }
  };
}

var d = new Dog();
d.info.methods.fun1();

p.fun3();
p.fun4();
