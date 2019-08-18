const axios = require('axios');
const Dev = require('../models/dev');

module.exports = {
    async store(req, res) {
        const username = req.body.username;
        if (!username) return res.status(400).json({ error: `field 'username' is invalid` });

        const exists = await Dev.findOne({username: username});
        if (exists) return res.json({ok: true, user: exists});

        const userGet = await axios.get(`https://api.github.com/users/${username}`);

        const { avatar_url: avatar, name, bio } = userGet.data;
        const newDev = await Dev.create({
            name,
            username,
            bio,
            avatar
        });

        return res.json({ok: true, user: newDev });
    },

    async list(req, res) {
        const userID = req.params.id;
        if (!userID) return res.status(400).json({ error: `invalid user id: ${userID}` });

        const user = await Dev.findById(userID);
        if (!user) return res.status(400).json({ error: `user not found` });

        const allList = await Dev.find({
            $and: [
                { _id: { $ne : userID } },
                { _id: { $nin: user.likes } },
                { _id: { $nin: user.dislikes } }
            ]
        });

        let listCount = allList.length;
        console.log(allList);
        return res.json({ ok: true, list_count: listCount, list: allList })
    }
};