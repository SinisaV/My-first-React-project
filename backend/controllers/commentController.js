var CommentModel = require('../models/commentModel.js');


module.exports = {

    /**
     * commentController.list()
     */
    list: function (req, res) {
        CommentModel.find()
            .populate('postedBy')
            .sort({date: -1})
            .exec(function (err, comments) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting comment.',
                        error: err
                    });
                }
                var data = [];
                data.comments = comments;
                //return res.render('photo/list', data);
                return res.json(comments);
            });
    },

    /**
     * commentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    showByParentPost: function (req, res) {
        var id = req.params.id;

        CommentModel.find({parentPost: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    /**
     * commentController.create()
     */
    create: function (req, res) {
        var comment = new CommentModel({
            content : req.body.content,
            postedBy : req.session.userId,
            parentPost : req.body.parentPost,
            date : new Date()
        });

        comment.save(function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }

            return res.status(201).json(comment);
            //return res.redirect('/photos');
        });
    },

    /**
     * commentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CommentModel.findOneAndUpdate(
            {_id: id},
            { $set: {likes: +1}},
            { new: true, upsert: false },
            function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    /**
     * commentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function(req, res){
        return res.render('comment/publish');
    }
};