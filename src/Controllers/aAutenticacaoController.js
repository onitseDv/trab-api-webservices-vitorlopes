//controller para Autenticação
//vai gerar o jwt necessário para autenticar na aplicação

const {Router} = require ('express');
const AutenticacaoController = Router();

const jwt = require ('jsonwebtoken');
const SECRET = 'appVitorLopes';

//const AutenticacaoService = require ('../Services/aAutenticacaoServices');

//async
AutenticacaoController.post('',  (req, res) =>{
    const {user, password} = req.body
    if(!user){ 
        return res.status(400).json({error: 'O login não pode ser vazio'})
    }else if(!password){ 
        return res.status(400).json({error: 'A senha não pode ser vazio'})
    }else if(user === 'admin' && password === 'admin'){
        const token = jwt.sign({userId: 1}, SECRET, {expiresIn: 3600 })
        return res.json({autenticado: true, token});
    }
    return res.status(401).json({error: 'Usuário não autenticado!'})
});

module.exports = AutenticacaoController;