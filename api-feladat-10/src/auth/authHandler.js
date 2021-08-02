const jwt = require('jsonwebtoken');

const Users = [
    {
        userName: 'admin',
        password: 'admin_pw',
        role: 'admin'
    },
    {
        userName: 'user',
        password: 'user_pw',
        role: 'user'
    }
]

const refreshTokens = [];

module.exports.login = (req,res) => {
    // Read login data from body
    const {userName, password } = req.body;
    
    // Filter users array by login data
    const user = Users.find(u => {return u.userName === userName && u.password === password});
    

    if (user) {
        // Generate access token
        const accessToken = jwt.sign({
            userName: user.userName,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            userName: user.userName,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('username or password incorrect.');
    }

};


module.exports.refresh = (req, res, next) => {
    const { token } = req.body;
    console.log(refreshTokens, token);

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            userName: user.userName,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        res.json({
            accessToken
        });
    });
};

module.exports.logout = (req, res) => {
    const { token } = req.body;
    console.log(refreshTokens, token);

    if (!refreshTokens.includes(token)) {
        res.sendStatus(403);
    }

    const tokenIndex = refreshTokens.indexOf(token);
    refreshTokens.splice(tokenIndex, 1);

    res.sendStatus(200);
};