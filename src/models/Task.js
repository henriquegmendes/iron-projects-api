import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String, required: true, minlength: 6, maxlength: 50,
  },
  description: {
    type: String, required: true, minlength: 15, maxlength: 150,
  },
  project: { type: Schema.Types.ObjectId, ref: 'project', required: true }, // One To One
}, {
  timestamps: true,
});

const Task = model('task', taskSchema);

export default Task;
