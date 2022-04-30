const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
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
            console.log('');
            res.send(products);
        })

    } 
    finally {
        
    }
 }
 run().catch(console.dir)















app.listen(port , ()=>{
    console.log('listening to the port', port);
})