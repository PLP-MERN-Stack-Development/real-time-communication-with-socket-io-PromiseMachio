import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectUser = async (req, res) => {
    try {
        const token = req.cookie.jwt;
        if (!token) {
            req.status(400).json({ message: "Unauthorize user..." })

        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {

    }

}