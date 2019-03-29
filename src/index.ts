import Server from './classes/server';
import userRoutes from './routes/user';
import mongoose from 'mongoose';
import bodyParser = require('body-parser');

const server = new Server();

// Middleware
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use(  bodyParser.json() );

// Api Routes
server.app.use('/api/user', userRoutes);

// Connect DB
mongoose.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {
  if ( err ) throw err;
  console.log('Database ONLINE');
});

// Start server
server.start( () => console.log(`Servidor funcionando en puerto ${server.port}`) );
