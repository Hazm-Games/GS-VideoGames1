const {

  } = require('./');
  const client = require("./client")

  /*async function dropTables() {
    // drop all tables, in the correct order
    try {
      console.log("Dropping All Tables...");
  
      await client.query(`
        DROP TABLE IF EXISTS routine_activities;
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS users;
      `);
      // drop all tables, in the correct order
    } catch (err) {
      console.error(err.message);
    }
  }*/

  async function createTables() {
    try {
      console.log("Starting to build tables...");
      // create all tables, in the correct order
      
      await client.query(`
        CREATE TABLE users(
          id	SERIAL	PRIMARY KEY,
          username	VARCHAR(255)	UNIQUE NOT NULL,
          password	VARCHAR(255)	NOT NULL
        );
        CREATE TABLE products(
          id	SERIAL	PRIMARY KEY,
          name	VARCHAR(255)	UNIQUE NOT NULL,
          description	TEXT	NOT NULL
        );
        CREATE TABLE platforms(
            id	SERIAL	PRIMARY KEY,
            "routineId"	INTEGER	REFERENCES routines (id),
            "activityId"	INTEGER	REFERENCES activities (id),
            duration INTEGER,
            count	INTEGER,
            UNIQUE("routineId", "activityId")
        );
        CREATE TABLE cart_products(
          id	SERIAL	PRIMARY KEY,
          "creatorId"	INTEGER	REFERENCES users(id),
          "isPublic"	BOOLEAN	DEFAULT false,
          name	VARCHAR(255)	UNIQUE NOT NULL,
          goal	TEXT	NOT NULL
        );
          CREATE TABLE cart(
          id	SERIAL	PRIMARY KEY,
          "routineId"	INTEGER	REFERENCES routines (id),
          "activityId"	INTEGER	REFERENCES activities (id),
          duration INTEGER,
          count	INTEGER,
          UNIQUE("routineId", "activityId")
      );
        `)
    } catch (err) {
      console.error(err.message);
    }
  }