const passport = require('passport')//authentication middleware
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users-model')
const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;

const cookieExtractor = req => {
    // const tk : ExtractJWT.fromUrlQueryParameter("access_token");
    // console.log(ExtractJWT.fromUrlQueryParameter("access_token"))
    let token = null;
    if (req && req.cookies){
        token = req.cookies['access_token'];
    }
    // console.log(token);
    return token;
}
//access token is the name given to cookies saved


//authorization
//so we get authenticated while sign we want the person to have to cookie stored on their page

// secretOrKey: 'TOP_SECRET',
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')


// passport.use(new JwtStrategy({
//         jwtFromRequest: cookieExtractor,
//         secretOrKey: 'NoobCoder'
//     },()=>{console.log({hello})}))

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'NoobCoder'
}, (payload, done) => {
    console.log(payload)
    // console.log(done)
    // console.log(jwtFromRequest)
    // console.log(secretOrKey)

    User.findById({ _id: payload.sub },async(err, user)=>{
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else
            return done(null,false);
        //there is no user that has primary key
    })
}))/

// passport.use(
//     new JwtStrategy(
//       {
//         secretOrKey: 'NoobCoder',
//         jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
//       },
//       async (token, done) => {
//         resizeBy.json({token});
//         try {
//           return done(null, token.user);
//         } catch (error) {
//           done(error);
//         }
//       }
//     )
//   );



//payload is data containing _id named as sub
//contain; issuer - NoobCoder not secretkey we have given issu name also to be noobcoder
//issueat,expireat


//authentication local stategy using username and password
//this is going to authenticate when we sign in using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        console.log(username)
        console.log(done)
        //something went wrong with database
        if (err)
            return done(err);
        //if no user exist
        console.log(user)
        if (!user)
            return done(null, false);
            //check if password is correct
        user.comparePassword(password, done);
        //here we using comparePassword from model 
        //and that gives us User(means all info of User) object itself
    })
}))