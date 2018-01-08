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

rollupIndex() {
  $ROLLUP -i "${1}/${3}.js" -o "${2}/${3}.js" -f es --sourcemap

  mapSources "${out_file}"
}

compilePackageES5() {
  local package_name=$(basename "${2}")
  $NGC -p ${1}/tsconfig.json --target es5 -d false --outDir ${2} --importHelpers true --sourceMap
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

ESM2015_DIR=${NPM_DIR}/esm2015
OUT_DIR_ESM5=${ROOT_OUT_DIR}/${PACKAGE}/esm5
ESM5_DIR=${NPM_DIR}/esm5

rm -rf ${PWD}/dist 

compilePackage ${SRC_DIR} ${OUT_DIR} ${PACKAGE}

mkdir -p ${NPM_DIR}

rsync -a --exclude=*.js --exclude=*.js.map ${OUT_DIR}/ ${NPM_DIR}

cd  ${SRC_DIR}

rollupIndex ${OUT_DIR} ${ESM2015_DIR} ${PACKAGE}

compilePackageES5 ${SRC_DIR} ${OUT_DIR_ESM5} ${PACKAGE}
rollupIndex ${OUT_DIR_ESM5} ${ESM5_DIR} ${PACKAGE}

runRollup ${SRC_DIR}

minify ${BUNDLES_DIR}

rsync -am --include="package.json" --exclude=* ${SRC_DIR}/ ${NPM_DIR}/

cp ${ROOT_DIR}/README.md ${NPM_DIR}/
