const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
        timestamps: true, // ele cria uma colula createdAt e outra updatedAt, que vai armazenar de forma altomatica a data de criacao e atualizacao
});

// pra exportar o model
module.exports = model('Dev', DevSchema);