const Dev = require('../model/Dev');

module.exports = {
    async store(req, res) {
        // ta pegando o id pelo paramentro da url
        console.log(req.params.devId);

        // ta pegando o parametro do header 
        console.log(req.headers.user);

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        // verificando se o dev que a pessoa quer dar like existe
        if (!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        // pra dizer que deu match
        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            // aqui avisa pra pessoa que ta dando like na hora
            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            // aqui avisa pra pessoa que ja tinha dado o like e que agora eles deram metch
            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }
            
        }

        // add o id do dev que recebeu o like
        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();
        
        return res.json(loggedDev);
    }
};