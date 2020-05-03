# Proto Component React Library A - Development Guide

## Dependencies

```shell script
npm install
```

### Cross-Platform Issues

To support husky and git hooks, Git must be included in environment PATH variables.

On MacOS, this isn't usually an issue.

On Windows using Git Bash, check for Git in PATH variables:

```shell script
echo $PATH
```

Add Git to Git Bash PATH variables in `~/.bashrc`:

```shell script
echo 'export PATH=$PATH:"/c/Program Files/Git"' >> ~/.bashrc
```

WebStorm's built-in support for NPM scripts uses Node directly so Git must be added to the Windows PATH variables as well.

On Windows using `cmd`, check for Git in Windows (cmd) PATH variables:

```shell script
echo %PATH%
```

Run `cmd` as admin (Run > Type `cmd` > Press Ctrl + Shift + Enter) and add Git to Windows PATH variables:

```shell script
setx /m PATH "%PATH%;C:\Program Files\Git\bin"
```

## Development

Run the development environment to view and test changes:

```shell script
npm start
```

### Symlinking

Due to Node.js module resolution, symlinked NPM packages resolve imports from the symlink's referenced directory.
This can cause multiple instances of dependencies to be included (i.e., React).

Alias each dependency in the webpack config:

```js
module.exports = {
    resolve: {
        alias: {
            react: path.resolve("./node_modules/react"),
        },
    },
};
```

## Publish

1. Commit all changes.

2. Bump the version number and create a tag and a changelog:

    ```shell script
    npm run release
    ```

3. Build the library to propagate the new version number:

    ```shell script
    npm run build
    ```

4. Manually test the library by including the build as a symlinked dependency in a React application:

    ```json
    {
        "dependencies": {
            "@proto-component/react-library-a": "file:../proto-component-react-library-a/dist"
        }
    }
    ```

    NOTES: If the library has dependencies, run `npm run clean:build-deps` to delete any installed dependencies before publishing.

5. Login to the NPM CLI.

6. From the root directory of the library, publish the new package:

    ```shell script
    npm publish dist
    ```

7. Push all changes.

## License

[MIT]

[mit]: https://choosealicense.com/licenses/mit/
