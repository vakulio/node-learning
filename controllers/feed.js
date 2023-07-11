const { validationResult } = require('express-validator')

exports.getPosts = (req, res) => {
    res.status(200).json({
        posts: [{ _id: 1, title: 'First', content: 'First post content', imageUrl: 'images/1.png', creator: { name: "Vakulio" }, createdAt: new Date() }]
    });
}

exports.createPosts = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Validation failed', errors: errors.array() });
    }
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
        message: 'Post was created', post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: { name: "Vakulio" },
            createdAt: new Date()
        }
    });
}