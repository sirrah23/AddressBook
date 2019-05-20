const User = require('../model/user.js')

async function userAddMiddleware(req, res, next){
    if(!req.authDataPayload)
        return res.status(500).json({errorFlag: 1, errorMsg: 'Something went wrong'})
    const {uuid} = req.authDataPayload
    if(!uuid)
        return res.status(500).json({errorFlag: 1, errorMsg: 'Something went wrong'})
    let user = await User.fetch(uuid)
    if(user !== null)
        return next()
    user = new User(uuid)
    await user.save()
    return next()
}
