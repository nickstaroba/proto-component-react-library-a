# Proto Component React Library A Development Guide

## Install Dependencies

```shell script
npm i
```

### Windows Installation Issues

Husky may fail to install on Windows 10.

Check for Git in PATH variables:

```shell script
echo $PATH
```

Add Git to PATH variables in `~/.bashrc`:

```shell script
export PATH=$PATH:"/c/Program Files/Git"
```

## Run Storybook

```shell script
npm start
```

## Release

Use `standard-version` to bump and release the package.

```shell script
npm run release
```

## Build

```shell script
npm run build
```

## Publish

Execute a release, build, test a local install of the build, and then run this command:

```shell script
npm publish dist
```

## License

[MIT]

[mit]: https://choosealicense.com/licenses/mit/
