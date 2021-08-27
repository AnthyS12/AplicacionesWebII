module.exports = (err, req,res,next) =>{
    const httpStatus =  err.status || 500; 
    const httpError  =   err.message ||  "Error que no fue controlado. Internal"

    return res.status(httpStatus).send({
        status: httpStatus,
        message: httpError
    })
}