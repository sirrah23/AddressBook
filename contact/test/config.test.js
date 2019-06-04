const buildConfig = require('../config/configBuilder.js')

test('Successfully build config for test environment', () => {
    const config = buildConfig('test')
    expect.objectContaining(config, {'database':{'database': 'contact_test'}})
})

test('Successfully build config for dev environment', () => {
    const config = buildConfig('dev')
    expect.objectContaining(config, {'database':{'database': 'contact_dev'}})
})

test('Successfully build config for prod environment', () => {
    const config = buildConfig('prod')
    expect.objectContaining(config, {'database':{'database': 'contact_prod'}})
})

test('Fail to build config for no environment', () => {
    try{
        const config = buildConfig('')
        expect(false)
    } catch (err){
        expect(true)
    }
})