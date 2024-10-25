import  jwt  from 'jsonwebtoken';

const authMiddleware = async (req, res, next) =>{
    
    const authHeader = req.headers.authorization; // Use the correct header
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.json({ success: false, message: 'Not Authorized, login again' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part
    // console.log("Extracted Token:", token); // Log for debugging

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}

export default authMiddleware;