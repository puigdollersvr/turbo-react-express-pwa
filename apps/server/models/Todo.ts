
  import {Schema, model} from 'mongoose';

  const TodoSchema = new Schema({
    title: {
      type: String,
      require: true,
    },
    notes: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    done: {
      type: Boolean,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  export default model('Todo', TodoSchema);

