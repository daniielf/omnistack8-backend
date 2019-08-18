const Dev = require('../models/dev');

module.exports = {
    async store(req, res) {
        const dislikeOriginID = req.body.origin.toString();
        const dislikeDestID = req.body.dest.toString();
        
        if (!dislikeOriginID || !dislikeDestID) return res.status(400).json({ error: `field 'origin' or 'dest' is not valid`});

        const originUser = await Dev.findById(dislikeOriginID);
        const destUser = await Dev.findById(dislikeDestID);

        if (!originUser) return res.status(400).json({ error: `user with id:${dislikeOriginID} does not exists`});
        if (!destUser) return res.status(400).json({ error: `user with id:${dislikeDestID} does not exists`});

        if (!originUser.dislikes.includes(destUser._id)) {
            originUser.dislikes.push(destUser._id);    
            originUser.save();
        }
        return res.json({ ok: true, data: { dislikeOriginID, dislikeDestID }})
    }
};