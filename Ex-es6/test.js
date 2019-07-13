function test({sum1, sum2, sum3 = 1, sum4 = 2}) {
    console.log((`sum1-- ${sum1}`))
    console.log((`sum2-- ${sum2}`))
    console.log((`sum3-- ${sum3}`))
    console.log((`sum4-- ${sum4}`))
    return sum1 + sum2
}


test({sum1:1,sum2:2,sum3:3})
