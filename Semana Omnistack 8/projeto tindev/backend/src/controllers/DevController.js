const axios = require('axios');
const Dev = require('../model/Dev');

module.exports = {
    async index(req, res) {
        const { user } = req.headers;

        // pegar a instancia do usuario no banco de dados
        const loggedDev = await Dev.findById(user);

        // buscando os usuarios da base de dados, sem ser o que ta logado, o que ja deu like e o que ja deu dislike
        const users = await Dev.find({
            // aplica os tres filtro de uma vez so
            $and: [
                // o id nao pode ser igual o que ta logado
                { _id: { $ne: user } },
                { _id:{ $nin: loggedDev.likes } },
                { _id:{ $nin: loggedDev.dislikes } }
            ]
        })

        return res.json(users);
    },

    // metodo store é o metodo de criacao
    async store(req, res) {
        const { username } = req.body;

        // verificando se o usuario ja existe no banco
        const userExists = await Dev.findOne({ user: username });

        // se ele encontrou um usuario que ja existe ele retorna esse mesmo usuario e nao cria de novo
        if (userExists) {
            return res.json(userExists);
        }

        // coloca se o await para falar que é pra esperar essa linha execultar (o que pode demorar um pouco) 
        // pra depois ir pro resto do codigo, e quando usa o await tem que colocar o async na funcao
        const response = await axios.get(`https://api.github.com/users/${username}`); 

        // importando as informacoes da resposta do axios por meio de desinstruturacao
        const { name, bio, avatar_url: avatar } = response.data;
        
        const dev = await Dev.create({ 
            name,
            user: username,
            bio,
            avatar
        })

        return res.json(dev);
    }
};

/* Boas praticas
    uma controller nao deve ter 
    mais do que os 5 metodos fundamentais
    que sao: 
    INDEX (lista do recurso)
    SHOW (retornar um unico do do recurso)
    STORE (criacao de um recurso)
    UPDATE
    DELETE 
 */