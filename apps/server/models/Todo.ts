
  import {Schema, model} from 'mongoose';

  const TodoSchema = new Schema({
    title: {
      type: String,
      required: true,
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
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  });

  TodoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  export default model('Todo', TodoSchema);

