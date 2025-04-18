/*
  This script runs the setup process for the Nockly project.
  It installs dependencies, generates placeholder images, and starts the development server.
  
  Usage: node scripts/setup.js
*/

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Nockly website...');

// Steps to run
const steps = [
  {
    name: 'Install dependencies',
    command: 'npm install',
    errorMessage: 'Failed to install dependencies'
  },
  {
    name: 'Generate placeholder images',
    command: 'npm run placeholders',
    errorMessage: 'Failed to generate placeholder images'
  },
  {
    name: 'Start development server',
    command: 'npm run dev',
    errorMessage: 'Failed to start development server'
  }
];

// Run each step
for (const step of steps) {
  try {
    console.log(`\n📋 ${step.name}...`);
    execSync(step.command, { stdio: 'inherit' });
    console.log(`✅ ${step.name} completed successfully`);
  } catch (error) {
    console.error(`❌ ${step.errorMessage}: ${error.message}`);
    process.exit(1);
  }
} 