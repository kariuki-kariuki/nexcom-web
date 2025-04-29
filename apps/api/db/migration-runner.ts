import { Logger } from '@nestjs/common';
import dataSource from './data-source';

export async function runMigrations() {
  const logger = new Logger('migrationRunner');

  try {
    logger.log('Running migrations...');
    await dataSource.initialize();
    await dataSource.runMigrations();
  } catch (err) {
    logger.error('Cannot start the app. Migrations have failed!', err);
    process.exit(0);
  }
}
