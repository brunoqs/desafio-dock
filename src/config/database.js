let env;
if (process.env.NODE_ENV === "dev") {
    env = ".env.dev";
} else if (process.env.NODE_ENV === 'test') {
    env = ".env.test";
} else {
    env = ".env";
}

require("dotenv").config({
    path: env
});

const database = {
    client: 'sqlite3',
    connection: {
        filename: process.env.DB || "./dock.sqlite"
    },
    useNullAsDefault: true,
    debug: process.env.DB_DEBUG === 'true' ? true : false
}

module.exports = database;