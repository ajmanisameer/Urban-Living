const apartment = require('../models/apartments')


exports.registerFlat = (req, res, next) => {
    let obj = {
        flatNo: 100,
        status: true
    }

    for (let i = 100; i < 200; i++) {
       obj.flatNo = i
        console.log(obj)
        const flat = new apartment(obj);
        flat.save();

    }

}
