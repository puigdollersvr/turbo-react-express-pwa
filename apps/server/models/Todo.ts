namespace TodoModel {
    const { Schema, model } = require('mongoose');

    const TodoSchema = Schema({
        title: {
            type: String,
            require: true
        },
        notes: {
            type: String,
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        },
        done: {
            type: Boolean,
            require: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    })
    
    module.exports = model('Todo', TodoSchema);
}