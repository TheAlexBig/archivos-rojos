export default {
  identifier: "06082023-1600-AR-002",
  version: 2,
  description: 'Create users table',
  script: `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50),
      email VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `
}