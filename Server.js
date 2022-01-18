const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require ("mysql");
const cors = require ('cors');




const db = mysql.createPool({
    host: "localhost", 
    port: 3306,                      
    user: "root",                      
    password: "root", 
    database: "user",
})
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: true}))

    app.post("/api/insert", (req, res) =>{

        const nome = req.body.InsertNome
        const email = req.body.InsertEmail
        const senha = req.body.InsertSenha
        const telefone = req.body.InsertTelefone
        const genero = req.body.InsertGenero
        const data_nasc = req.body.InsertData_Nascimento
        const estado = req.body.InsertEstado
        const cidade = req.body.InsertCidade
        const endereco = req.body.InsertEndereco
        
        const sqlInsert = "INSERT INTO usuarios (nome, email, senha, telefone, genero, data_nasc, estado, cidade, endereco) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)" 
        db.query(sqlInsert, [nome, email, senha, telefone, genero, data_nasc, estado, cidade, endereco], (err, result)=> {
        console.log(err)
    })
})

    app.get("/api/pegar-dados", (req, res) =>{
    
        const sqlSelect = "SELECT * FROM usuarios ORDER BY id DESC";
      const sqlSelects = (JSON.parse(JSON.stringify(sqlSelect))) 
        db.query(sqlSelect, (err, result)=> {
        
        res.send(result );
    })})
        
        
        
        app.post("/api/atualizar-dados", (req, res) =>{
            const nome = req.body.newData[0].nome
            const id = req.body.newData[0].id
            const email = req.body.newData[0].email
            const senha = req.body.newData[0].senha
            const telefone= req.body.newData[0].telefone
            const genero = req.body.newData[0].genero
            const data_nasc = req.body.newData[0].data_nasc
            const estado = req.body.newData[0].estado
            const cidade = req.body.newData[0].cidade
            const endereco = req.body.newData[0].endereco
           
             const sqlUpdate = `UPDATE usuarios SET nome= '${nome}', email = '${email}', senha = '${senha}', telefone = '${telefone}', genero ='${genero}', data_nasc= '${data_nasc}', estado= '${estado}', cidade = '${cidade}', endereco= '${endereco}'  WHERE id= ${id}`;
            
             db.query(sqlUpdate, [nome, email, senha, telefone, genero, data_nasc, estado, cidade, endereco, id,], (err, result) => {
    
                 if (err) {
                     console.log(err);
                    }
                    else {
                        console.log("DADOS ALTERADOS COM SUCESSO!")
                        res.send(result)
                        return
                    }
                })
            })



            app.delete("/api/deletar-dados", (req, res) =>{
                
                const id = req.body.key
                
               
                const sqlDelete = `DELETE FROM usuarios WHERE id= ${id}`;
                
                 db.query(sqlDelete, [id,], (err, result) => {
        
                     if (err) {
                         console.log(err);
                        }
                        else {
                        console.log("TABELA APAGADA COM SUCESSO!")
                            res.send(result)
                            return
                        }
                    })
                })

            
            app.listen(3009, () =>{
            
                console.log("Rodando na porta 3009");
                
                console.log("Servidor rodando!")
            })

                 



            

     