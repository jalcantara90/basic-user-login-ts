import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser = require('body-parser');
import fileUpload from 'express-fileupload';

import userRoutes from './routes/user';
import postRoutes from './routes/post';

const server = new Server();

// Bodyparser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );

// Api Routes
server.app.use('/api/user', userRoutes);
server.app.use('/api/posts', postRoutes);

// Connect DB
mongoose.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {
  if ( err ) throw err;
  console.log('Database ONLINE');
});

// Start server
server.start( () => console.log(`Servidor funcionando en puerto ${server.port}`) );
