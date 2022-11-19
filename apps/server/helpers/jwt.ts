const jwt = require('jsonwebtoken');

interface IPayload {
    uid: string,
    name: string
}

const createJWT = (uid:string, name:string) => {
    return new Promise ((resolve, reject) => {
        const payload:IPayload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err: Error, token:string) => {
            if(err) {
                console.log(err);
                reject('There was an error generating the token');
            }
            resolve(token);
        });
    });
}

module.exports = {
    createJWT
}