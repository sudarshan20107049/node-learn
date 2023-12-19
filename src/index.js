import htpp from 'http';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import connectDb from './db/index.js';
import createTodo,{deleteTodo, getTodos,getTodo,updateTodo} from './controller/todo.js';

config();

const parser = bodyParser.json()
const server = async (req, res) => {
    
    const method = req.method
    const path = req.url
    const id = path.split('/')[2]
    try {
        switch (true) {
            case path.startsWith('/todo') : {
                
                if (id) {

                    if (method === "PUT") {
                        parser(req,res,async () => {
                            const response = await updateTodo(id, req.body)
                            if (response.typeOf !== "String") {
                                res.statusCode = 202
                                res.write(JSON.stringify(response))
                                return res.end()
                            }
                            else {
                                res.statusCode = 404
                                res.write(`Cannot find this id:${id}`)
                                return res.end()
                            }
                        })
                        
                    }

                    if (method === "GET") {
                        const response = await getTodo(id)
                        if (response.typeOf  !== "String") {
                            res.statusCode = 200
                            res.write(JSON.stringify(response))
                            return res.end()
                        }
                        res.statusCode = 404
                        res.write(`Cannot find this id:${id}`)
                        return res.end()
                    }

                  if (method === "DELETE") {
                    const response = await deleteTodo(id)
                    if (response.typeOf !== "String") {
                        res.statusCode = 200
                        res.write(`while successfully deleted ${id}`)
                        return res.end()
                    }
                    res.statusCode = 404
                    res.write(response)
                    return res.end()
                }
                 
             }

             
                 if (method === "GET") {
                    const response = await getTodos()
                    if (response.typeOf !== "String") {
                        res.statusCode = 200
                        res.write(JSON.stringify(response))
                         return res.end()
                    }
                    res.statusCode = 500
                    res.write(response)
                    return res.end()
                }
                else if (method === "POST") {
                     parser(req, res, async () => {
                        
                    const response = await createTodo(req.body)
                    if (response.typeOf !== "String") {
                        res.statusCode = 201
                        res.write(JSON.stringify(response))
                        return res.end()
                    }

                    res.write(response)
                    res.statusCode = 500
                    return res.end
                    })

                }
                break
            }
          
            
            default: {
                res.statusCode = 404
                res.write('invalid Endpoint')
                return res.end()
            }
        }
       
        
    } catch (error) {
        console.log(`while error ${error.message}`)
        res.statusCode = 500
        return res.end()

        
    }
}

htpp.createServer(server).listen(8080, () => {
    connectDb().then(() => {
    console.log("server is running")
    })

})