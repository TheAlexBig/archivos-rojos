import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';


const migrationsFolder = join(dirname(fileURLToPath(import.meta.url)), 'migrations');
const migrationFiles = readdirSync(migrationsFolder);

const migrations = [];

migrationFiles.forEach(async file => {
    const filePath = 'file://' + join(migrationsFolder, file).replace(/\\/g, '/');
    const module = await import(filePath);
    const migration = module.default;
    migrations.push(migration);
});

export default migrations;