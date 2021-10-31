const connectTOMongo = require('./database');
const express = require('express');
const cors = require('cors');

connectTOMongo();

const app = express();
const port = 5000;


app.use(cors())
app.use(express.json())

app.use(express.json())

// Routes

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`MyNoteBook Backend listening at http://localhost:${port}`);
})