import express from 'express';
import { port } from './config/config.js';
import connectDB from './config/db.js';
import chalk from 'chalk';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';


const PORT = port || 8000;

const app = express();

app.use(express.json());

// route management

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);


// database connection
connectDB();

app.listen(PORT, () => {
    console.log(process.env.PORT);
    console.log(`${chalk.green.bold('Server')} is listening on port ${chalk.green.bold(PORT)} 🚀`);
});