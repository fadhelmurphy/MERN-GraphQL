import express from 'express'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'
import schema from './lib/graphql'

mongoose.connect('mongodb://localhost:27017/football')

const db = mongoose.connection
db.on('error',()=>{
    console.log("error connect to database")
}).once('open',()=>{
    console.log("connected to database")
})

const app = express()
app.use(cors())

app.get('/',(req,res,next)=>{
res.send('Hello graphql')
})


app.use('/graphql',graphqlHTTP(()=>({
    schema,
    graphiql:true,
    pretty:true
})))

const port = 4000
app.listen(port,()=>{
    console.log('Graphql server is running on port',port)
})