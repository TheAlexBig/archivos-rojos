import logger from '../logger.js';
import migrations from './migration-reader.js';
import migrationTable from './migration-table.js';

const tableName = 'migrations';


const createMigrationTable = async (pool) => {
    
    try {
      const connection = await pool.getConnection();
      await connection.query(migrationTable.script);
      logger.info('Migrations table created successfully.');
      connection.release();
    } catch (error) {
      logger.error('Error creating migrations table:', error);
    }
  };


// Function to apply a migration
const applyMigration = async (pool, migration) => {
    const connection = await pool.getConnection();
    try {
      logger.info(`Applying migration ${migration.version}: ${migration.description}`);
      await connection.query(migration.script);
      await connection.query(`INSERT INTO ${tableName} (identifier, version, description) VALUES (?, ?, ?)`, 
      [migration.identifier, migration.version, migration.description]);
    } catch (error) {
      logger.error(`Failed to apply migration ${migration.version}: ${error}`);
      throw error;
    } finally {
      connection.release();
    }
};

// Function to get the current database version
const getCurrentVersion = async (pool) => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query(`SELECT MAX(version) AS current_version FROM ${tableName}`);
      return rows[0].version || 0;
    } finally {
      connection.release();
    }
};

// Function to upgrade the database to the latest version
const upgradeDatabase = async (pool) => {
    await createMigrationTable(pool);
    const currentVersion = await getCurrentVersion(pool);
    logger.info(`Current database version: ${currentVersion}`);
    for (const migration of migrations) {
      if (migration.version > currentVersion) {
        await applyMigration(pool, migration);
      }
    }
    logger.info('Database migrations completed successfully');
};

// Export the pool and upgradeDatabase function
export { upgradeDatabase };