var PhotoModel = require('../models/photoModel.js');
var CommentModel = require('../models/commentModel.js')

/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find()
        .populate('postedBy')
        .sort({date: -1})
        .exec(function (err, photos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
            var data = [];
            data.photos = photos;
            //return res.render('photo/list', data);
            return res.json(photos);
        });
    },

    /**
     * photoController.show()
     */
    show: function(req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id})
            .populate('postedBy')
            .exec(function(err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }

                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }
                return res.json(photo);
            });
    },

    showByUserId: function(req, res) {
        var id = req.params.id;

        PhotoModel.find({postedBy: id})
            .populate('postedBy')
            .exec(function(err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }

                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }
                return res.json(photo);
            });
    },

    like: function (req, res)
    {
        var photoId = req.params.id;

        PhotoModel.findById(photoId, function(err, photo) {
            if (err) {
                res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
                return;
            }

            if (!photo) {
                res.status(404).json({
                    message: 'No such photo'
                });
                return;
            }

            photo.likes++;

            photo.save(function(err, updatedPhoto) {
                if (err) {
                    res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                    return;
                }

                res.json(updatedPhoto);
            });
        });
    },

    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
			name : req.body.name,
			path : "/images/"+req.file.filename,
			postedBy : req.session.userId,
			views : 0,
			likes : 0,
            date : new Date()
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
			photo.path = req.body.path ? req.body.path : photo.path;
			photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
			photo.views = req.body.views ? req.body.views : photo.views;
			photo.likes = req.body.likes ? req.body.likes : photo.likes;
			
            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            CommentModel.deleteMany({ parentPost: id }, function (err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when deleting comments for the photo.',
                        error: err
                    });
                }

                return res.status(204).json();
            });
        });
    },
};
