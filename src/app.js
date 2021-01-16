const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        if (process.env.NODE_ENV !== 'test')
            this.express.use(morgan('dev'));
    }

    routes() {
        require('./config/routes')(this.express);
    }
}
  
module.exports = new AppController().express;