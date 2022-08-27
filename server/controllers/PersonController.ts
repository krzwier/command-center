import knexInstance from '../db.js';
import { Request, Response, Application, RequestHandler } from 'express';

const getPersons: RequestHandler = async (req, res, next) => {
    // console.log(res.app);
    knexInstance.select('*')
        .from('person')
        .then(res.json)
        .catch((error) => res.json({ message: `There was an error retrieving persons: ${error.stack}` }));
}

export default getPersons;