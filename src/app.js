const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

let env;
if (process.env.NODE_ENV === "dev") {
    env = ".env.dev";
} else {
    env = ".env";
}

require("dotenv").config({
    path: env
});

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(morgan('dev'));
    }

    routes() {
        require('./config/routes')(this.express);
    }
}
  
module.exports = new AppController().express;