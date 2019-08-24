const Dev = require('../models/dev');

module.exports = {
    async store(req, res) {
        const likeOriginID = req.body.origin.toString();
        const likeDestID = req.body.dest.toString();
        
        if (!likeOriginID || !likeDestID) return res.status(400).json({ error: `field 'origin' or 'dest' is not valid`});

        const originUser = await Dev.findById(likeOriginID);
        const destUser = await Dev.findById(likeDestID);

        if (!originUser) return res.status(400).json({ error: `user with id:${likeOriginID} does not exists`});
        if (!destUser) return res.status(400).json({ error: `user with id:${likeDestID} does not exists`});

        if (!originUser.likes.includes(destUser._id)) {
            originUser.likes.push(destUser._id);    
            originUser.save();
        }

        var match = false;
        if (destUser.likes.includes(originUser._id)) {
            match = true;
            
            const loggedUserSocketId = req.connections[likeOriginID];
            const targetUserSocketId = req.connections[likeDestID];
            const socket = req.socket;
            
            if (loggedUserSocketId) {
                socket.to(loggedUserSocketId).emit('match', { name: destUser.name, avatar: destUser.avatar });
            }

            if (targetUserSocketId) {
                socket.to(targetUserSocketId).emit('match', { name: originUser.name, avatar: originUser.avatar  });
            }
            
            console.log('MATCH!' + originUser.name + '<-->' + destUser.name);
        }
        return res.json({ ok: true, data: { likeOriginID, likeDestID , match }})
    }
};