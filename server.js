
import {ApolloServer} from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import dotenv from 'dotenv';
import connectMongo from './db/db.js';
import {checkAuth} from './passport/authenticate.js';
import helmet from 'helmet';
//do that in your controller create user
//import bcrypt from 'bcrypt';

dotenv.config();

(async () => {
    try {
        const conn = await connectMongo();
        if (conn) {
            console.log('Connected successfully.');
        }

        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
            context: async ({req, res}) => {
                if (req) {
                    const user = await checkAuth(req, res);
                    console.log('app', user);
                    return {
                        req,
                        res,
                        user,
                    };
                }
            },
        });


        // inside your user create/update async function
        /*const saltRound = 12; //okayish in 2021
        const myPwd = 'bar';
        const hash = await bcrypt.hash(myPwd, saltRound);
        console.log('hased pwd', hash);*/

        const app = express();
        app.use(helmet({
            contentSecurityPolicy: false
        }));

        server.applyMiddleware({app, path: '/graphql'});

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        if (process.env.NODE_ENV === 'production') {
            console.log('prduction');
            const {default: production} = await import('./sec/production.js');
            production(app, 3000);
        } else {
            console.log('localhost');
            const {default: localhost} = await import('./sec/localhost.js');
            localhost(app, 8000, 3000);
        }

    } catch (e) {
        console.log('server error: ' + e.message);
    }
})();