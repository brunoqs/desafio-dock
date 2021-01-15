let env;
if (process.env.NODE_ENV === "dev") {
    env = ".env.dev";
} else {
    env = ".env";
}

require("dotenv").config({
    path: env
});

const database = {
    client: 'sqlite3',
    connection: {
        filename: "./dock.sqlite"
    },
    useNullAsDefault: true,
    debug: process.env.DB_DEBUG
}

module.exports = database;