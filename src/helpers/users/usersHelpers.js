import User from '../../models/users/userModel.js';
import bcryptjs from "bcryptjs";

export const verify_username_password = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return false;
        }
        const match = await bcryptjs.compare(password, user.password);
        if (!match) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}