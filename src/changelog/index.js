import mysql from 'mysql2/promise';
import connectionDetails from '../env-reader/index.js';
import migrations from './migration-reader.js';
import migrationTable from './migration-table.js';

const createPool = () => {
    return mysql.createPool({
        host: connectionDetails.host,
        user: connectionDetails.user,
        password: connectionDetails.password,
        database: connectionDetails.database,
    });
}

const pool = createPool();
const tableName = 'migrations';

const createMigrationtable = async () => {
    try {
      const connection = await pool.getConnection();
      await connection.query(migrationTable.script);
      console.log('Migrations table created successfully.');
      connection.release();
    } catch (error) {
      console.error('Error creating migrations table:', error);
    }
  };


// Function to apply a migration
const applyMigration = async (migration) => {
    const connection = await pool.getConnection();
    try {
      console.log(`Applying migration ${migration.version}: ${migration.description}`);
      await connection.query(migration.script);
      await connection.query(`INSERT INTO ${tableName} (identifier, version, description) VALUES (?, ?, ?)`, 
      [migration.identifier, migration.version, migration.description]);
    } catch (error) {
      console.error(`Failed to apply migration ${migration.version}: ${error}`);
      throw error;
    } finally {
      connection.release();
    }
};

// Function to get the current database version
const getCurrentVersion = async () => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT MAX(version) AS current_version FROM ${tableName}`);
      return rows[0].current_version || 0;
    } finally {
      connection.release();
    }
};

// Function to upgrade the database to the latest version
const upgradeDatabase = async () => {
    await createMigrationtable();
    const currentVersion = await getCurrentVersion();
    console.log(`Current database version: ${currentVersion}`);
    for (const migration of migrations) {
      if (migration.version > currentVersion) {
        await applyMigration(migration);
      }
    }
    console.log('Database migrations completed successfully');
};

// Export the pool and upgradeDatabase function
export { upgradeDatabase };