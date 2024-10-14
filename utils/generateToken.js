import jwt from 'jsonwebtoken'
export const generateAdminToken = (email, role) => {
    // Define payload
    const payload = {
        email,
        role
    };

    // Generate token
    const Admintoken = jwt.sign(payload, process.env.JWT_SECRET_KEY);

    return Admintoken;
};
