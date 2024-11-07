import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    iss: {
        type: String
    },
    azp: {
        type: String
    },
    aud: {
        type: String
    },
    sub: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure unique emails
    },
    email_verified: {
        type: Boolean
    },
    nbf: {
        type: Number
    },
    given_name: {
        type: String
    },
    family_name: {
        type: String
    },
    iat: {
        type: Number
    },
    exp: {
        type: Number
    },
    jti: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String, // Add password for manual registration
        required: function () {
            return this.password || false; // Make sure password is only required for manual registration
        }
    },
});

// Add a method to hash the password before saving
userSchema.pre("save", function (next) {
    if (this.password) {
        // Hash the password before saving it (use a hashing library like bcrypt)
        const bcrypt = require("bcrypt");
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }
            this.password = hashedPassword; // Store the hashed password
            next();
        });
    } else {
        next();
    }
});

const User = mongoose.model('user', userSchema);
export default User;
