import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true
    },
    completed: {
        type: Boolean,
        required: true,
      default:false
    }
}, {
    timestamps:true
})

const Todo = model('Todo', todoSchema)

export default Todo