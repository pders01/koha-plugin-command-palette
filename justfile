#!/usr/bin/env just --justfile

set dotenv-load

# Lists available commands.
default:
  @just --list

# Careful! This removes Koha/ and package.json
clean:
  #!/usr/bin/env bash
  rm -rf Koha;
  rm -f package.json

# Initialises a new koha plugin based on your input.
init:
  carton exec ./scripts/init.pl

# Adds a component to your initialised koha plugin based on your input.
add component:
  carton exec ./scripts/add.pl {{component}}

# Creates a kpz file by zipping the current state of the `Koha` directory.
package:
  ./scripts/package.sh "${PLUGIN_NAME}" "${PLUGIN_RELEASE_FILENAME}"

# Updates the staticapi.json file within the plugin to expose all files within the `static` directory. 
staticapi:
  ./scripts/staticapi.sh "${PLUGIN_NAME}" "${PLUGIN_STATIC_DIR_NAME}"

