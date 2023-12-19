import Todo from "../models/todo.js";


export const getTodos = async () => {
    try {
        const getTodos = await Todo.find()
       return getTodos
        
    } catch (error) {
        return error.message || "Something Went Wrong"
    }
}

export const getTodo = async (id) => {
    try {
        const todo = await Todo.findById(id)
        return todo
        
    }
    catch (err) {
        return  "while error on get todo"
    }
}

export const deleteTodo = async (id) => {
    try {
        const deleteTodo = await Todo.findByIdAndDelete(id)
        return deleteTodo     
    } catch (error) {
        return error.message ||"While error on deleting todo "
    }
}

const createTodo = async (body) => {
    try {
        const addTodo = new Todo({...body})

        await addTodo.save()

        return addTodo
        
    } catch (error) {
        return error.message || "Something Went Wrong"
    }
}

export const updateTodo = async (id,body) => {
    try {
        const todo = await Todo.findByIdAndUpdate(id, { ...body }, {
            new:true
        })

        return todo
        
    } catch (error) {
        return error.message || "something went Wrong in Updateing Todo"
    }

}

export default createTodo