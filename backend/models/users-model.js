const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    role : {
      type:String,
      enum : ['user','admin'],
      required: [true, 'Please add a role'],
   },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    
  },
  {
    timestamps: true,
  }
)



//hashing password
//when was using asyn funtion(next) my password wasn't getting hashed so using asyn requires different syntax like using await
userSchema.pre('save',function (next) {
  if (!this.isModified('password')) {
    return next();

  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err)
      return next(err);
    this.password = passwordHash;
    next();
  })

});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err)
      return cb(err);
    else {
      if (!isMatch)
        return cb(null, isMatch)
      return cb(null, this);
    }
  })
}

module.exports = mongoose.model('User', userSchema)

