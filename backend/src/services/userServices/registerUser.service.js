import User from '../../models/user.model.js'
import bcrypt from 'bcrypt'

const createUserService = async (userData) => {
    try {
        const { email, password, role = 'user', firstName, lastName } = userData;
        if (!email || !password) {
            return 'Không được nhập thiếu thông tin nào';
        }

        if (role === 'admin' && userData.adminSecret !== process.env.ADMIN_CREATION_SECRET) {
            return 'Không có quyền tạo tài khoản admin';
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return 'Email đã được sử dụng';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role
        });

        await newUser.save();
        return {
            firstName,
            lastName,
            email,
            role: newUser.role
        };
    } catch (error) {
        return error.message;
    }
};

export default createUserService;
