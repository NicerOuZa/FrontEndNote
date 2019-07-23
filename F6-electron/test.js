var a = 1
var b = "asd"
var t = null


function test1(){
    console.log(a);
    var c = 2
    t = function (){
        console.log(c);
    }
}

test1()
t()