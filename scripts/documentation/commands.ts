import * as fs from 'fs-extra';
import * as yargs from 'yargs';
import * as path from 'path';
import { dedent } from 'tslint/lib/utils';

import { commandsObject } from '../../packages/schematics/src/command-line/nx-commands';

const commandsOutputDirectory = path.join(
  __dirname,
  '../../docs/command-lines'
);

function getCommands(command) {
  return command.getCommandInstance().getCommandHandlers();
}
function parseCommandInstance(name, command) {
  const builder = command.builder((<any>yargs).resetOptions());
  const builderDescriptions = builder.getUsageInstance().getDescriptions();
  const builderDefaultOptions = builder.getOptions().default;
  return {
    command: command['original'],
    description: command['description'],
    options:
      Object.keys(builderDescriptions).map(name => ({
        command: '--'.concat(name),
        description: builderDescriptions[name]
          ? builderDescriptions[name].replace('__yargsString__:', '')
          : '',
        default: builderDefaultOptions[name]
      })) || null
  };
}
function generateMarkdown(command) {
  let template = dedent`
    # ${command.command}
    ${command.description}
    
    ## Usage
    \`\`\`bash 
    ${command.command}
    \`\`\`
   `;

  if (Array.isArray(command.options) && !!command.options.length) {
    template += dedent`
      ### Options
      | Option | Description | Default value |
      |--------|-------------|---------------|\n`;

    command.options.forEach(
      option =>
        (template += dedent`| \`${option.command}\` | ${option.description} | ${
          option.default === undefined ? '' : `\`${option.default}\``
        } | \n`)
    );
  }

  return { name: command.command.replace(':', '-'), template };
}
function generateFile(
  outputDirectory: string,
  templateObject: { name: string; template: string }
): void {
  fs.outputFileSync(
    path.join(outputDirectory, `${templateObject.name}.md`),
    templateObject.template
  );
}

// TODO: Try to add option's type, examples, and group?
// TODO: split one command per page / Create an index
const commands = getCommands(commandsObject);

Object.keys(commands)
  .map(name => parseCommandInstance(name, commands[name]))
  .map(command => generateMarkdown(command))
  .forEach(templateObject =>
    generateFile(commandsOutputDirectory, templateObject)
  );
