import dotenv from 'dotenv';
dotenv.config();

export const configDB={
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'books',
        multipleStatements: true,
}

export const configDB_={
        host     : process.env.DB_HOST,
        user     :process.env.DB_USER, 
        password :process.env.DB_PASSWORD, 
        database :process.env.DB_DATABASE,
        port    :process.env.DB_PORT,
        multipleStatements: true,
}