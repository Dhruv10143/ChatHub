import user from '../Modal/User.js';
import bcrypt from 'bcrypt';

export const addUser = async (request, response) => {
  try {
    const { sub, email, password, name, picture, firstName, lastName } = request.body;
    
    // Check if it's a manual registration (password exists)
    if (password) {
      // Check if the user already exists by email
      const existingUser = await user.findOne({ email });
      if (existingUser) {
        return response.status(400).json({ msg: 'User already exists with this email' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new user({
        email,
        password: hashedPassword,
        name,
        firstName,
        lastName,
        picture,
      });

      await newUser.save();
      return response.status(201).json(newUser);
    }

    // Check if it's a Google registration (no password)
    const existingGoogleUser = await user.findOne({ sub });
    if (existingGoogleUser) {
      return response.status(200).json({ msg: 'User already exists' });
    }

    // Create new user from Google account
    const newGoogleUser = new user({
      sub,
      email,
      name,
      firstName,
      lastName,
      picture,
    });

    await newGoogleUser.save();
    return response.status(201).json(newGoogleUser);

  } catch (error) {
    console.error("Error during user registration:", error);
    return response.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await user.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
