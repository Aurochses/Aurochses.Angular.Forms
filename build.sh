#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
# TODO(i): wrap into subshell, so that we don't pollute CWD, but not yet to minimize diff collision with Jason
cd ${currentDir}

compilePackage() {
    local package_name=$(basename "${2}")

    $NGC -p ${1}/tsconfig.json

    echo "export * from './${package_name}/index'" > ${2}/../${package_name}.d.ts
    echo "{\"__symbolic\":\"module\",\"version\":3,\"metadata\":{},\"exports\":[{\"from\":\"./${package_name}/index\"}]}" > ${2}/../${package_name}.metadata.json
}

moveTypings() {
  if [[ -f ${1}/index.d.ts && -f ${1}/index.metadata.json ]]; then
    mv ${1}/index.d.ts ${1}/${2}.d.ts
    mv ${1}/index.metadata.json ${1}/${2}.metadata.json
  fi
}

rollupIndex() {
  local regex=".+/(.+)/index.js"
  if [[ "${1}/index.js" =~ $regex ]]; then
    in_file="${1}/index.js"
    out_file="${2}/${BASH_REMATCH[1]}.js"

    if [[ -f "${3}" ]]; then
      $ROLLUP -i ${in_file} -o ${out_file} -c ${3} --sourcemap
    else
      $ROLLUP -i ${in_file} -o ${out_file} --sourcemap
    fi
    mapSources "${out_file}"
  fi
}

downlevelES2015() {
  regex="(.+).js"
  for file in ${1}/*.js ; do
    if [[ ${file} =~ $regex ]]; then
      ts_file="${BASH_REMATCH[1]}${2:-".es5.ts"}"
      cp ${file} ${ts_file}

      ($TSC ${ts_file} --target es5 --module es2015 --noLib --sourceMap) > /dev/null 2>&1 || true
      mapSources "${BASH_REMATCH[1]}${2:-".es5.js"}"
      rm -f ${ts_file}
    fi
  done
}

runRollup() {
  local regex="dest: ['\"](.+)['\"],*"
  if [[ -f "${1}/rollup.config.js" ]]; then
    cd ${1}

    $ROLLUP -c rollup.config.js --sourcemap

    local dest_line=$(cat "${1}/rollup.config.js" | grep 'dest:')
    if [[ ${dest_line} =~ $regex ]]; then
      mapSources "${BASH_REMATCH[1]}"
    fi
  fi
}

minify() {
  regex="(.+).js"
  files=(${1}/*)
  for file in "${files[@]}"; do
    base_file=$( basename "${file}" )
    if [[ "${base_file}" =~ $regex && "${base_file##*.}" != "map" ]]; then
      local out_file=$(dirname "${file}")/${BASH_REMATCH[1]}.min.js
      $UGLIFYJS ${file} -c --ie8 --comments -o ${out_file} --source-map filename=${BASH_REMATCH[1]}.map,includeSources
      mapSources "${out_file}"
    fi
  done
}

mapSources() {
  if [[ -f "${1}.map" ]]; then
    $MAP_SOURCES -f "${1}"
  fi
}

TSC=`pwd`/node_modules/.bin/tsc
NGC=`pwd`/node_modules/.bin/ngc
MAP_SOURCES="node `pwd`/build/map_sources.js "
UGLIFYJS=`pwd`/node_modules/.bin/uglifyjs
ROLLUP=`pwd`/node_modules/.bin/rollup

PACKAGE=forms
PWD=`pwd`
ROOT_DIR=${PWD}
SRC_DIR=${ROOT_DIR}
ROOT_OUT_DIR=${PWD}/dist/packages
OUT_DIR=${ROOT_OUT_DIR}/${PACKAGE}
NPM_DIR=${PWD}/dist/packages-dist/${PACKAGE}
MODULES_DIR=${NPM_DIR}/@aurochses
BUNDLES_DIR=${NPM_DIR}/bundles

rm -rf ${PWD}/dist 

compilePackage ${SRC_DIR} ${OUT_DIR} ${PACKAGE}

mkdir -p ${NPM_DIR}

rsync -a --exclude=*.js --exclude=*.js.map ${OUT_DIR}/ ${NPM_DIR}

moveTypings ${NPM_DIR} ${PACKAGE}

cd  ${SRC_DIR}
rollupIndex ${OUT_DIR} ${MODULES_DIR} ${ROOT_DIR}

downlevelES2015 ${MODULES_DIR}

runRollup ${SRC_DIR}

minify ${BUNDLES_DIR}

rsync -am --include="package.json" --exclude=* ${SRC_DIR}/ ${NPM_DIR}/

cp ${ROOT_DIR}/README.md ${NPM_DIR}/
