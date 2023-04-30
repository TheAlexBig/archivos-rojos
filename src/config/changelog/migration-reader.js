import { readdirSync } from 'fs';
import { join } from 'path';

const migrationsFolder = join(__dirname, 'migrations');
const migrationFiles = readdirSync(migrationsFolder);

const migrations = [];

migrationFiles.forEach(async file => {
    const module = require(join(migrationsFolder, file));
    const migration = module.default;
    migrations.push(migration);
});

export default migrations;