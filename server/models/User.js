const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: function() {
      // Require password only for registered users
      return !this.isGuest;
    },
    minlength: 8,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w!@#$%^&*()-+=]*[^\s]?/, "Must have a minimum of eight characters, at least one uppercase letter, one lowercase letter and one number!"],
  },
  isGuest: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isGuest && (this.isNew || this.isModified("password"))) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  if (this.isGuest) {
    return false;
  }
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;