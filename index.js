const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
const app = express();
const port = process.env.PORT || 5000;


//midlware
app.use(cors());
app.use(express.json());


// mongoDb 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@uttaramotors.4k8ax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
    try {
        await client.connect();
        const productsData = client.db('UttaraMotors').collection('Products');
        

        //get all products
        app.get('/', async (req, res) => {
            const query ={};
            const cursor =  productsData.find(query)
            const products = await cursor.toArray();
             res.send(products);
        })

        // get a single product by ID
        app.get('/:id', async (req, res) => {
            const id = req.params.id;
            const query ={_id:ObjectID(id)};
            const product = await productsData.findOne(query);
            res.send(product);
        }) 
        
        
        // update a product
        app.put('/:id', async (req, res) => {
            const id = req.params.id;
            const filter ={_id:ObjectID(id)};
            const product = req.body;
            const options = { upsert: true };
            const updated = {
                $set: product
            }
           const updatedProduct = await productsData.updateOne(filter, updated, options);
            res.send(updatedProduct);
            
        })
    } 
    finally {
        
    }
 }
 run().catch(console.dir)















app.listen(port , ()=>{
    console.log('listening to the port', port);
})