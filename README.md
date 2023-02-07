# Marxa Library
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Development

1. Clone the repository
```bash
git clone https://github.com/Marxa-Digital/mx-library
```
2. Navigate to the folder where the library is located
```bash
cd  mx-library
```
3. Import the submodules
```bash
git submodule update --init --recursive --remote
git submodule foreach --recursive 'git checkout develop'
```
4. Log in https://marxa.jfrog.io/ and login. In the account menu navigate to **Set me up**. And remain the configurations snippet and Copy it.
5. In your PC in a terminal navigate to `~/.npmrc` and paste the code of the instructions adding the prefix `@marxa:` in every artifactory regist. Example:
```bash
_auth = <PASSWORD> (converted to base 64)
email = youremail@email.com
always-auth = true
@marxa:registry = https://marxa.jfrog.io/artifactory/api/npm/marxa-npm/
@marxa:registry = https://marxa.jfrog.io/artifactory/api/npm/mx-library-npm/
```
6. Import the dependencies
```bash
npm i
```


## Publish packages
### Globally
1. Install globally [nps library](https://www.npmjs.com/package/nps) 
    ```bash
    npm i -g nps
    ```
 
2. Run the command setting the package desired where <libname>
    ```bash
      LIB=<libname> nps lib.publish
    ```

### Without global configuration
1. Run the command setting the package desired where <libname>
    ```bash
      LIB=<libname> npm run nps lib.publish
    ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests



## Running end-to-end tests
