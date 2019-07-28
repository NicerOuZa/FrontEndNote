
var dog = null
function Dog() {
    this.name = "dog"
    this.tem = null
}
function Par() {
    this.name = 'Par'

    this.say = () => {
        console.log("say");
        dog = new Dog()

        dog.tem = () => {
            console.log(this.name);
        }
    }
}


var a = new Par()
a.say()

dog.tem()