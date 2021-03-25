const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


// const uno = () => {
//     return "Uno"
// }
// const dos = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("MOcking bird")
//         }, 3000)
//     })
// }
// const tres = () => {
//     return "Tres"
// }


// const callme = async () => {
//     var one = uno()
//     console.log(one)

//     var two = await dos()
//     console.log(two)

//     var three = tres()
//     console.log(three)
// }
// // callme()




var two = function data2() {
    setTimeout(() => {
        console.log("more data")
    }, 1000)
}


var one = function data1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("some data")
            const error = false
            if (!error) {
                resolve()
            } else {
                reject('Error')
            }
        }, 5000)
    })

}


// one().then(two).catch(err => console.log(err))
//--------------------------------------------


//Async and Await
async function init(){
    await one()
    two()
}

init()


//--------------------------------------------
//promise.all

const promise1 = Promise.resolve('hello world 1')
const promise2 = ('123')
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Goodbye')
})

const promise4 = fetch('https://jsonplaceholder.typicode.com/todos/1').then(res =>
    res.json()
)


// Promise.all([promise1, promise2, promise3, promise4]).then(values => {
//     console.log(values)
// })




module.exports = router;
