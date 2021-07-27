import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';

import { join, normalize } from 'path';
import { getWorkspace } from '@schematics/angular/utility/workspace';

export default function (options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('install', options)
    ])(host, context);
  };
}

export async function setupOptions(host: Tree, options: any): Promise<Tree> {
  const workspace = await getWorkspace(host);
  if (!options.project) {
    options.project = workspace.projects.keys().next().value;
  }
  const project = workspace.projects.get(options.project);
  if (!project) {
    throw new SchematicsException(`Invalid project name: ${options.project}`);
  }

  options.path = join(normalize(project.root), 'src');
  return host;
}

export function install(_options: any): Rule {
  return async ( tree: Tree, _context: SchematicContext ) => {
    await setupOptions(tree, _options);
    const movePath = normalize(_options.path + '/');
    const templateSource = apply(url('./files/src'), [
      template({..._options}),
      move(movePath)
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);

  };
}

