
//from --- user.route.ts
// const auth=(req:Request, res: Response, next: NextFunction)=>{
//     console.log('This is Protected Route');

import type { NextFunction, Request, Response } from "express";

//     next();
// }

const auth= ()=>{
    return async (req:Request, res: Response, next: NextFunction)=>{
    // console.log('This is Protected Route');
    console.log(req.headers);

    next();
};
}

export default auth