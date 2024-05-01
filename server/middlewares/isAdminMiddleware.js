

const isAdminMiddleware = (req, res, next) => {

    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            status: "Failed",
            error: "Unauthorized Access"
        })
    }
}

module.exports = isAdminMiddleware;