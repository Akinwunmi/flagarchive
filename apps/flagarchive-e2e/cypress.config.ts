import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'npx nx run flagarchive:serve',
        production: 'npx nx run flagarchive:serve-static',
      },
      ciWebServerCommand: 'npx nx run flagarchive:serve-static',
      ciBaseUrl: 'http://localhost:1991',
    }),
    baseUrl: 'http://localhost:1991',
    // Please ensure you use `cy.origin()` when navigating between domains and remove this option.
    // See https://docs.cypress.io/app/references/migration-guide#Changes-to-cyorigin
    injectDocumentDomain: true,
  },
});
