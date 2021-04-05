const express = require('express');
const router = express.Router();
const flatController = require('../controllers/flat')



router.post('/', flatController.registerFlat, (req, res) => {
    res.status(200).json({ 'status': true, 'msg': 'Folder Created' });
})


module.exports = router;