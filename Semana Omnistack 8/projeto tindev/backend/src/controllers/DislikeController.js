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

        // add o id do dev que recebeu o like
        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};