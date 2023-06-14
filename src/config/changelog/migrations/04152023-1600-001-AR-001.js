export default {
  identifier: "04152023-1600-AR-001",
  version: 2,
  description: 'Create red_file table',
  script: `
    CREATE TABLE IF NOT EXISTS red_file (
      reference_code VARCHAR(255) NOT NULL,
      country_code VARCHAR(255),
      institution VARCHAR(255),
      dependency VARCHAR(255),
      document_type VARCHAR(255),
      title VARCHAR(255),
      place_and_date VARCHAR(255),
      content TEXT NOT NULL,
      precedence TEXT,
      language VARCHAR(255) DEFAULT 'Español',
      physical_characteristics VARCHAR(255),
      volume VARCHAR(255),
      notes TEXT
    );
  `
}