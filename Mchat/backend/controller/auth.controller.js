import bcrypt from "bcrypt"
import User from "../models/user.model.js"
import generateTokens from "../lib/utils.js"
import cookieParser from "cookie-parser";
export const signup = async (req, res) => {
    const { userName, email, password } = req.body
    
    try {

        if (password.length < 6) {
            return res.status(400).json({ message: "Enter a strong password atleast 6 charcters..." })

        }
        if (user) return
         res.status(400).json({ message: "Email already exists..." });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User(
            {
                userName,
                email,
                password: hashedPassword
            }
        );

        if (newUser) {
            // Generate jwt
            generateTokens(newUser._id, res);
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })


        } else {
            res.status(400).json({ message: "Invalid credentials..." })
        }




    } catch (error) {
        console.log("Error in signup controller", error.message);

    }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Set token cookie
    generateTokens(user._id, res);

    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = (req, res) => {
    // Here we just clear the cookies we had created in the signup section remember.
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        return res.status(200).json({ message: "Logged out successfully..." })

    } catch (error) {
        console.log("Error loging out:", error.message);
        return res.status(400).json({ message: "Error occured..." })



    }
}

export const updateProfile = async(req,res)=>{
  
}