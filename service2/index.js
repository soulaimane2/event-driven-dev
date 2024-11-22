const express = require("express");
const { Kafka } = require('kafkajs')

const app = express();

const PORT = process.env.PORT || 4001


const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  });

(async () => {
    const consumer = kafka.consumer({ groupId: 'test-group' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
        value: message.value.toString(),
        })
    },
    })
})();




app.listen(PORT, () => {
    console.log("hello")
})