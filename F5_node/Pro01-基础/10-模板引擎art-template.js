var fs = require("fs")
var template = require("art-template")

fs.readFile("./resource/index.html", function (err, data) {
    if (err) {
        return
    }
    var temStr = template.render(data.toString(),{
        name: "zt",
        age:19
    })

    console.log(temStr)
})