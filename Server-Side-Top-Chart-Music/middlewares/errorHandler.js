module.exports = (error, req, res, next) => {
    let status, message;
    console.log(error);

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstainError":
            status = 400
            message = error.errors[0].message
            console.log(error);
            break;
        case "Song not found":
            status = 404
            message = "Song not found"
            break;
        case "Email_required":
            status = 400
            message = "Email is required"
            break;
        case "Password_required":
            status = 400
            message = "Password is required"
            break;

        case "Favorite already exists":
            status = 400
            message = "Favorite already exists!"
            break;

        case "Invalid_email/password":
            status = 401
            message = "Invalid_email/password"
            break;
        case "InvalidToken":
        case "JsonWebTokenError":
            status = 401
            message = "Invalid Token"
            break;
        case "Forbidden":
            status = 403
            message = "You are not authorized"
            break;
        default:
            status = 500
            message = "Internal Service Error"
            break;
    }
    res.status(status).json({ message: message })
}