# depcopy-cli

This is a command line client Dependencies Copy, useful when you need copy dependencies to a specific directory.

## Getting Started

*  Install with npm: `npm install @foxythemes/depcopy-cli -D`
*  Run it with `depcopy`

### Initial Setup

Create a JSON file named `dep-copy.json` in the root, this file will saved all dependencies that will be copied to your custom path.

## Usage

Add the dependencies that you want to copy specifying the destination path.

Example:

```	
{
  "options": {
    "destPrefix": "src/assets/lib/"
  },
  "dependency-name":{
    "files": {
      "dependency-name-dest/scss" : "dependency-name-orig/scss/*",
      "dependency-name-dest/dist" : "dependency-name-orig/dist/*"
    }
  }
}

```

## License

Copyright (c) FoxyThemes
Licensed under the MIT license.
