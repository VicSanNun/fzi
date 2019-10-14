const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000;
const sql = require('mssql');  

// Configurar o body parser para requisições POSTS.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  

// Conectar banco de dados.
const connStr = "Server=localhost,1433;Database=FilaZero_BI;User Id=app;Password=123;";

// Conectar e definir conexão do banco de dados como global.
sql.connect(connStr)
   .then(conn => GLOBAL.conn = conn)
   .catch(err => console.log(err)); 
console.log('Banco de dados iniciado.');

// Executar Query SQL.
function execSQLQuery(sqlQry, res){
    GLOBAL.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}
  
// Rotas.
const router = express.Router();
router.get('/', (req, res) => res.json({ status: 'Filazero Insights API Ok!' }));
app.use('/', router);

/**
 * @swagger
 * /atendimentos:
 *   get:
 *     description: Returns users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/'
 */
router.get('/atendimentos', (req, res) => {
    execSQLQuery('SELECT top 5 * FROM dw.ft_atd_atendimento', res);
});

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Iniciar o servidor do Web Service.
app.listen(port);
console.log('Servidor iniciado.');