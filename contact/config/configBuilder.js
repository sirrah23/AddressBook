const fs = require('fs')
const assert = require('assert')
const logger = require('../util/logger.js')

function validateModeSetting(mode){
    assert(['prod', 'dev', 'test'].indexOf(mode) !== -1,
        'Mode must be set to one of the following: prod, dev, test')
}

function baseConfigFilename(){
    return 'config.base.json'
}

function computeConfigFilenameForMode(mode){
    return `config.${mode}.json`
}

function readConfigFile(configFilename){
    try{
        return JSON.parse(fs.readFileSync(configFilename, 'utf8'))
    } catch(err){
        console.log(err)
        const errorMessage = `Unable to read config file: ${configFilename}`
        logger.error(`Unable to read config file: ${configFilename}`)
        throw new Error(errorMessage)
    }
}

function buildConfigObject(mode){
    validateModeSetting(mode)
    const baseConfig = readConfigFile(`${__dirname}/files/${baseConfigFilename()}`)
    const modeConfig = readConfigFile(`${__dirname}/files/${computeConfigFilenameForMode(mode)}`)
    const config = baseConfig
    config.database = Object.assign(config.database, modeConfig.database)
    return config
}

module.exports = buildConfigObject