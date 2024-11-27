// middlewares/authMiddleware.js
//check authentication
module.exports = function(req, res, next) {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa (giả sử sử dụng session)
    if (!req.session.user) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return res.redirect('/api');
    }
    // Nếu đã đăng nhập, tiếp tục với request
    next();
};
//check admin
module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') return next();
    res.status(403).send('Access Denied');
}
//check editor
module.exports.isEditor = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'editor') return next();
    res.status(403).send('Access Denied');
}
//check writer
module.exports.isWriter = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'writer') return next();
    res.status(403).send('Access Denied');
}
//check subscriber
module.exports.isSubscriber = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'subscriber') return next();
    res.status(403).send('Access Denied');
}