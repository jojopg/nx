# ng-new

Create an empty workspace

## Usage

```bash
ng generate ng-new ...

```

### Options

| Name             | Alias | Description                                    | Type    | Default value |
| ---------------- | ----- | ---------------------------------------------- | ------- | ------------- |
| `name`           |       | The name of the workspace.                     | string  | `undefined`   |
| `style`          |       | The file extension to be used for style files. | string  | `css`         |
| `directory`      |       | The directory name to create the workspace in. | string  | ``            |
| `npmScope`       |       | Npm scope for importing libs.                  | string  | `undefined`   |
| `skipInstall`    |       | Skip installing dependency packages.           | boolean | `false`       |
| `skipGit`        | g     | Skip initializing a git repository.            | boolean | `false`       |
| `packageManager` |       | Package manager used in the project.           | string  | `undefined`   |
| `commit`         |       | Initial repository commit information.         | boolean | `true`        |
