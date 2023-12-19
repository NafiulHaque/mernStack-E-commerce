import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// console.log(process.env.JWT_SECRET)
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}


export default generateToken