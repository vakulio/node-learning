exports.getPosts = (req, res) => {
    res.status(200).json({ title: 'First', content: 'First post content' });
}

exports.createPosts = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({ message: 'Post was created', post: {
        id: new Date().toISOString(),
        title: title,
        content: content
    } });
}