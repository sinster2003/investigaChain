import { NextFunction, Request, Response } from "express";

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error.name);
    console.log(error);

    // due to accessing of malformatted object ids
    if(error.name === "CastError") {
        return res.status(400).json({
            message: "Malformatted Id"
        });
    }

    // due to mongoose schema inconsistency
    if(error.name === "ValidationError") {
        return res.status(400).json({
            message: error.message
        });
    }

    if(error.name === "JsonWebTokenError") {
        return res.status(400).json({
            message: "Invalid token"
        })
    }

    res.status(500).json({
        message: "Something went wrong!"
    })

    next();
}

export default errorHandler;