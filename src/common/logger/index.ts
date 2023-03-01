// import express from 'express';
// import { v4 as uuidv4 } from 'uuid';
// import logger from './index.js';

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/healthCheck', (req, res) => {
//   const startDate = new Date();
//   const id = uuidv4();
//   logger.info('/start', {
//     id,
//     query: req.query,
//     ip: req.socket.localAddress,
//     body: req.body,
//   });
//   res.send('hola');
//   logger.info('/end', {
//     id,
//     statusCode: 200,
//     timeExecution: `${new Date().getTime() - startDate.getTime()} ms`,
//   });
// });

// app.get('/error', (req, res) => {
//   const startDate = new Date();
//   const id = uuidv4();
//   logger.info('/start', {
//     id,
//     query: req.query,
//     ip: req.socket.localAddress,
//     body: req.body,
//   });
//   res.status(500).json({ message: 'Server failed' });
// });

// app.listen(4000, () => {
//   logger.info('Servidor corriendo en el puerto 4000');
// });
