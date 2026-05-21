import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from 'jsonwebtoken'   // npm i --save-dev @types/jsonwebtoken
import config from "../../config";


const loginUserIntoDb = async(payload: {
    email : string;
    password : string;
})=>{
    const {email, password} = payload
    //1. check if the user exists

    const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `,[email],
    );
    
    if (userData.rows.length === 0){
        throw new Error ("Invalid Credentials!")
    }

    const user = userData.rows[0];
    // console.log(user);   //ok email password


     //2. compare the password -ook
    const matchPassword = await bcrypt.compare(password,user.password);
    console.log(matchPassword)  // false - not ok - true hobe

    if(!matchPassword){
         throw new Error ("Invalid Credentials!")
    }
   



    //3.Generate the token - jwt install -npm i jsonwebtoken > npm i --save-dev @types/jsonwebtoken

    const jwtpayload ={
        id: user.id,
        name: user.name,
        is_active: user.is_active,
        email: user.email
    }

    const accessToken = jwt.sign(jwtpayload,config.secret as string,{
        expiresIn: "1d",
    })

    return {accessToken};

};

export const authService = {
    loginUserIntoDb,
}