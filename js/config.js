// config.js

// Get environment (defaults to 'development' if not set)
const env = process.env.NODE_ENV || 'production';

// Set PHP path based on the environment
const config = {
  development: {
    phpPath: "/opt/homebrew/bin/php",  // Correct path for macOS (Homebrew installation)
    // dbHost: "localhost",               // Example: Database host for local development
    // dbUser: "root",                    // Example: Database user for local development
    // dbPassword: "",                    // Example: Local DB password
  },
  production: {
    phpPath: "/usr/bin/php",           // Path for Debian server
    // dbHost: "your-production-db-url",  // Example: Production database host
    // dbUser: "your-production-user",    // Example: Production DB user
    // dbPassword: "your-production-password", // Example: Production DB password
  }
};

// Export the configuration for the current environment
module.exports = config[env];
