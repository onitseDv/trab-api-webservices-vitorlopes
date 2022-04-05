import { Kafka } from 'kafkajs';

const topic = 'fixture-events';
const kafka = new Kafka({ brokers: ['localhost:9092'] });
const producer = kafka.producer();

const enviaEvento = async (message) => {
  console.log(`Mensagem: ${message}`);
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      { value: message },
    ],
  });
};

module.exports = {enviaEvento};
