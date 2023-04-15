export default {
  id: "04152023-1600-001",
  version: 1,
  description: 'First migation that will store all the others',
  script: `
    CREATE TABLE IF NOT EXISTS migrations (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      identifier VARCHAR(255) NOT NULL,
      version VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `
}