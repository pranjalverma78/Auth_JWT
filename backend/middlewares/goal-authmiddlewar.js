const jwt =  require('jsonwebtoken')
const User = require('../models/goalusers-models')

const protect = async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //cheching if has a bearer is there which carries token
        try {
            ///get token header
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            
            //get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        
        } catch (error) {
            console.log(error)
            res.status(401)
            // throw new Error('not authorised')
            res.json({msg:'not authorised'})
        }
    }   
      if(!token){
        res.status(401)
        // throw new Error('Not authorized,no token')
        res.json({msg:'Not authorized,no token'})
      }  
}

module.exports = {protect}