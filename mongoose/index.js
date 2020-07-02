const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/webinme-api', {useNewUrlParser: true, useCreateIndex: true});
