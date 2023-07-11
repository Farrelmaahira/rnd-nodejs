const responseData = (response, statusCode, values ) =>{
    let data = {
        success : true,
        data : values,
    };

    response.status(statusCode).json(data);
    response.end()
}

const responseMessage = (response, statusCode, message) => {
    let data = {
        success : true,
        message : message
    }; 
    response.status(statusCode).json(data);
    response.end();
}

const responseError = (response, statusCode, message) => {
    let data = {
        success : false,
        message : message
    };
    response.status(statusCode).json(data);
    response.end();
}

module.exports = { responseData, responseMessage, responseError }