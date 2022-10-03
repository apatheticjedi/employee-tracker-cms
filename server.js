const db = require('./db/connection');
const startApp = require('./routes/index')


db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
    startApp();
});