const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  aadhar: {
    type: String,
    required: [true, "Please provide your aadharNo"],
  },
  pancard: {
    type: String,
    required: [true, "Please provide your pancard"],
  },
  address: String,
  private_key: String,
  mnemonic: String,
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.pre("save", function (next) {
    if(!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.pre(/^find/, function(next) {
    this.find({ active: {
        $ne: false
    } })
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    return false;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
