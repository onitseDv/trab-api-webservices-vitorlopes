//function para verificar o jwt

function verificaJWT (req, res){
    const token = req.headers ['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){
            return res.status(401).json({error: 'Usuário não autenticado!'})
        }
        req.userId = decoded.userId;
        next();
    })
}

const verificaJWTTeste = async (req) => {
    const token = req.headers ['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err){
            return false
        }
        req.userId = decoded.userId;
        next();
    })
    return true
}

module.exports = {verificaJWT, verificaJWTTeste}