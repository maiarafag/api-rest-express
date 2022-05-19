const express = require("express");

const app = express();

app.use(express.json());

let clientesJSON = require("./clientes.json");
 
// Verbos HTTP:

// GET: RECEBE DADOS 
// POST: ENVIA OS DADOS
// PUT: ATUALIZA DADOS
// DELETE: REMOVE DADOS

//id = identificador, enpoint = cada caminho na API
//2 gets pq: 1 p/ pegar todos os clientes e o outro p/ um cliente específico 
app.get("/clientes", function(req, res) {
    res.json(clientesJSON);
});
app.get("/clientes/:id", function(req, res) {
    const {id} = req.params;
    const clientResult = clientesJSON.find((client) => client.id == id);

    console.log(clientResult);

    if(!clientResult){
        return res.status(204).json({
            success: false,
            error: "Cliente não existe!",
        });
    }
    
    res.json(clientResult);
});
app.post("/clientes", function(req, res) {
    const { name } = req.body;
    const newCliente = {
        name: name, 
        id: clientesJSON.length + 1,
    };

    clientesJSON.push(newCliente);
    res.json(newCliente);
});
app.put("/clientes/:id", function(req, res) {
    const {id} = req.params;
    const clientFound = clientesJSON.find((client) => client.id == id);

    if(!clientFound){
        return res.status(204).json({
            success: false,
            error: "Cliente não existe!",
        });
    }
    const { name } = req.body;
    clientFound.name = name;
    
    clientesJSON = clientesJSON.filter((client) => client.id != id); 
    clientesJSON.push(clientFound);
    res.json(clientFound);

});
app.delete("/clientes/:id", function(req, res) {});


app.get("/test", function(req, res) {
    res.json({
        success: true,
    }); 
});

app.listen(3001, function() {
    console.log("Our server is running!");
});