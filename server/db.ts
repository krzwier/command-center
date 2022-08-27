import path from 'path';
import { fileURLToPath } from 'url';
import { Knex as KnexType } from 'knex';
import knex from 'knex';
// import * as knexFunction from 'knex';
// const knex = require('knex');

const fileName = fileURLToPath(import.meta.url);

const dbPath: string = path.resolve(path.dirname(fileName), 'db/database.sqlite')

const knexConfig: KnexType.Config = {
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
};

interface Person {
    id: number;
    name: string;
    avatarPath: string;
}

const knexInstance = knex(knexConfig);

knexInstance.schema
    // Make sure no "person" table exists
    // before trying to create new
    .hasTable('person')
    .then((exists: boolean) => {
        if (!exists) {
            // If no "person" table exists
            // create new, with "Id", "Name", "AvatarPath" columns
            return knexInstance.schema.createTable('person', (table: KnexType.CreateTableBuilder) => {
                table.integer('Id').primary()
                table.string('Name')
                table.string('AvatarPath')
            })
                .then(() => {
                    // Log success message
                    console.log('Table \'person\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating table: ${error}`)
                })
        }
    })
    .then(() => {
        // Log success message
        console.log('done')
    })
    .catch((error) => {
        console.error(`There was an error setting up the database: ${error}`)
    })

// Log all data in "books" table
knexInstance.select('*').from('person')
    .then(data => console.log('data:', data))
    .catch(err => console.log(err))

export default knexInstance;