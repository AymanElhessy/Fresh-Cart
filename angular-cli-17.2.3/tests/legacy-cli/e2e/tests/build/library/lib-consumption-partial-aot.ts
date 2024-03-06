import { setTimeout } from 'node:timers/promises';
import { ng } from '../../../utils/process';
import { libraryConsumptionSetup } from './setup';

export default async function () {
  await libraryConsumptionSetup();

  // Build library in partial mode (production)
  await ng('build', 'my-lib', '--configuration=production');

  // Check that the e2e succeeds prod and non prod mode
  await ng('e2e', '--configuration=production');
  await setTimeout(500);
  await ng('e2e', '--configuration=development');
}
