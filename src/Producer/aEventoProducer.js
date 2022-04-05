//producer para enviar as mensagens
const { Kafka } = require('kafkajs');

const topic = 'kafka1';
const kafka = new Kafka({
    brokers: ['localhost:9091'],
    //clientId: 'certificate',
})

const producer = kafka.producer()

const enviaMsgKafka = async (message) => {
    console.log(message)
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [
            { value: message },
        ],
    })
};

//await producer.disconnect() 

module.exports = {enviaMsgKafka};
