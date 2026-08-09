const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;

    console.log(error.stack || error);

    res.status(statusCode).json({
        success : false,
        message : error.message || "Internal server error",
        stack : process.env.NODE_ENV === "development"
        ? error.stack
        :undefined
    })
}

export default errorHandler