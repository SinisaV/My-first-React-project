var express = require('express');
// Vključimo multer za file upload
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

var router = express.Router();
var commentController = require('../controllers/commentController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/', commentController.list);
//router.get('/publish', requiresLogin, photoController.publish);
router.get('/:id', commentController.show);
router.get('/byParentPost/:id', commentController.showByParentPost);

router.post('/', requiresLogin, upload.single('image'), commentController.create);

router.put('/:id', commentController.update);

router.delete('/:id', commentController.remove);

module.exports = router;