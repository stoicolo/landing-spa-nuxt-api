const { sequelize } = require('./sequelize');

async function createDatabase() {
  try {
    // Try to authenticate with the existing database
    await sequelize.authenticate();
    console.log('Connection established successfully.');
  } catch (error) {
    // If there is an error authenticating, check if it's because the database does not exist
    if (error.original && error.original.code === '3D000') {
      console.log('The database does not exist. Creating it...');
      try {
        // Create a new connection without specifying the database
        // const tempSequelize = new Sequelize(
        //   sequelize.config.adminDatabase, // using an admin DB to open a valid connection
        //   sequelize.config.username,
        //   sequelize.config.password,
        //   {
        //     host: sequelize.config.host,
        //     dialect: 'postgres',
        //   }
        // );

        // Create the database using the new connection
        // await tempSequelize.query(`CREATE DATABASE ${sequelize.config.database};`);
        await sequelize.query(`CREATE DATABASE ${sequelize.config.database};`);
        console.log('Database created successfully.');

        // Try to connect again after creating the database
        console.log('Attempting to connect again...');
        await sequelize.authenticate();
        console.log('Connection established successfully after creating the database.');

        // Close the temporary connection
        // await tempSequelize.close();
      } catch (createError) {
        console.error('Error creating the database:', createError);
      }
    } else {
      // If the error is not due to the database not existing, display the error
      console.error('Error connecting to the database:', error);
    }
  }
}

module.exports = createDatabase;
