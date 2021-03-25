const express = require('express');
const router = express.Router();


var one = function data1(callback) {
    setTimeout(() => {
        console.log("some data")
        callback()
    }, 5000)
}


var two = function data2() {
    setTimeout(() => {
        console.log("more data")
    }, 1000)
}

one(two)




// function after(before) {
//     console.log("after")
//     before('before')
// }

// after(function before(data) {
//     console.log(data);
// })







module.exports = router;
