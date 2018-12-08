const locales = require('i18n-locales');

module.exports = [
  {
    type: 'confirm',
    name: 'useRouter',
    message: 'Use router with vue-router integrated with Neutronium?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'useModern',
    message: 'Use modern build (only compatible with Neutronium >= 1.4.0)?',
    default: true,
  },
  {
    type: 'confirm',
    name: 'useInternationalization',
    message: 'Use internationalization with vue-i18n integrated with Neutronium?',
    default: false,
    group: "Internationalization"
  },
  {
    type: 'input',
    name: 'resourceFileName',
    when: answer => answer.useInternationalization,
    message: 'Resource file name (.resx C# file)?',
    default: 'Resource',
    group: "Internationalization"
  },
  {
    type: 'input',
    name: 'projectName',
    when: answer => answer.useInternationalization,
    message: 'C# : project name',
    group: "Internationalization"
  },
  {
    type: 'confirm',
    name: 'namespaceDifferent',
    message: 'Resource namespace different from project name?',
    when: answer => answer.useInternationalization,
    default: false,
    group: "Internationalization"
  },
  {
    type: 'input',
    name: 'nameSpace',
    default: answer => answer.projectName,
    when: answer => answer.useInternationalization && answer.namespaceDifferent,
    message: 'Resource namespace:',
    group: "Internationalization"
  },
  {
    type: 'confirm',
    name: 'libraryNameDifferent',
    message: 'Library name different from project name?',
    default: false,
    when: answer => answer.useInternationalization,
    group: "Internationalization"
  },
  {
    type: 'input',
    name: 'exeName',
    default: answer => answer.projectName,
    when: answer => answer.useInternationalization & answer.libraryNameDifferent,
    message: 'Library name (filename without .exe)?',
    group: "Internationalization"
  },
  {
    type: 'checkbox',
    name: 'locales',
    when: answer => answer.useInternationalization,
    message: 'Project locales?',
    choices: locales.map(name => ({ name, value: name, checked: name === 'en-US' })),
    group: "Internationalization"
  },
]