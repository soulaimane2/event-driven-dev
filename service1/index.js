const express = require("express"); 
const { Kafka } = require('kafkajs'); 

const PORT = process.env.PORT || 4000

const app = express();
app.use(express.json());

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
})


const producer = kafka.producer();

app.post("/", async (req, res) => {
    try{
        await producer.connect()
        const message = JSON.stringify(req.body);
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: message },
            ],
        });

        res.json({
            status: "success"
        })
    }catch(e){
        throw new Error(e)
    }
})

app.listen(PORT, () => {
    console.log("hello")
})