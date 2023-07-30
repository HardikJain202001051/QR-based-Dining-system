const {  SecretClient } = require("@azure/keyvault-secrets");
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mssql = require('mssql');

const express = require('express');

const app = express();

const {DefaultAzureCredential} = require('@azure/identity');

const vaultName = "cclapikey";
const url = `https://${vaultName}.vault.azure.net`;

// Create an instance of the DefaultAzureCredential class, which
// will automatically authenticate the app using the credentials
// provided in the environment variables or using Azure Managed Identity
const credential = new DefaultAzureCredential()

// Create an instance of the SecretClient class, which will
// be used to interact with the Key Vault
const client = new SecretClient(url, credential);
var connection = 0;
// Retrieve a secret from the Key Vault by its name
async function getSecret() {
  const secret = await client.getSecret('connectionString');
 connection = new mssql.ConnectionPool(secret.value);
// Connect to the database
connection.connect((err) => {
  if (err) {
    
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database!');
});
  return secret.value;
  
}

// Example usage
getSecret()
  .then((secretValue) => console.log(`The value of the secret  is '${secretValue}'`))
  .catch((error) => console.error(error));



  



//app.use(bodyParser.json());
app.use(helmet()); // Adds security headers to HTTP response
app.use(bodyParser.json());
// Create a connection to the database


app.get('/',(req,res)=>{
  res.send("hello");
})


app.get('/home',(req,res)=>{
  const sql = 'select * from food';
  connection.query(sql,(err,result)=>{
    if (err) {
      err = err + e;
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  })
})


//getMenu
app.get('/getMenu/:id', (req, res) => {
  const rid = req.params.id;
  const sql = `SELECT m.rid ,m.price, f.fid, f.fname, f.image FROM Menu m, Food f WHERE m.rid=${rid} AND m.fid=f.fid`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      result = result['recordsets'][0];

      res.json(result);
    }
  });
});

// Handle POST requests to create a new order
app.post('/placeOrder/', (req, res) => {
  // Extract the order data from the request body
  console.log(req.body);
  const { rid, uid, cart } = req.body;

  

  // Insert the order data into the orders table

  const orderQuery = `INSERT INTO orders (rid, uid) OUTPUT inserted.oid VALUES (${rid}, ${uid})`;
  

  connection.query(orderQuery, (error, results, fields) => {
    if (error) {
      console.error('Error creating order:', error);
      res.status(500).send('Error creating order');
      return;
    }

    // Get the ID of the newly created order
    const orderId = results['recordset'][0]['oid'];

    // Insert the order details into the order_details table
    const orderDetailsValues = cart.map(({ fid, quantity, status = 1 }) => {
      return `(${orderId}, ${fid}, ${quantity}, '${status}')`;
    });

    const orderDetailsQuery = `INSERT INTO order_details (oid, fid, quantity, status) VALUES ${orderDetailsValues.join(', ')}`;

    connection.query(orderDetailsQuery, (error, results, fields) => {
      if (error) {
        console.error('Error creating order details:', error);
        res.status(500).send('Error creating order');
        return;
      }

      // Send a response indicating that the order was successfully created
      res.status(201).send(`Order created with ID ${orderId}`);
    });
  });
});


app.get('/getOrders/:rid',(req,res)=>{
      const rid = req.params.rid;


      const sql =  `select oid,fname,price,quantity,status,rid from (select oid,price,o.fid,quantity,status,rid from (select * from order_details where oid in (select oid from orders where rid = ${rid})) as o,menu where menu.fid = o.fid and menu.rid=${rid}) as f,food where f.fid=food.fid` 
      
      connection.query(sql, (error, result) => {
        if (error) {
          console.error('Error getting order:', error);
          res.status(500).send('Error getting orders');
          return;
        }
        else{
          console.log(result['recordsets'][0]);
          result = result['recordsets'][0];
          
          
const orderDicts = Object.values(result.reduce((acc, cur) => {
if (cur.oid in acc) {
  acc[cur.oid].fnames.push(cur.fname + ` x${cur.quantity}`);
  acc[cur.oid].total += cur.price*cur.quantity;
} else {
  acc[cur.oid] = {
    oid: cur.oid,
    fnames: [cur.fname+ ` x${cur.quantity}`],
    total: cur.price*cur.quantity,
    quantity: cur.quantity,
    status: cur.status,
    rid: cur.rid
  };
}
return acc;
}, {})).map(order => {
order.fnames = order.fnames.join(", ");
return order;
});

          
          
          
res.json(orderDicts)};
})})

app.post('/users', (req, res) => {
  // Extract the user data from the request body
  const { name, phone_number, location } = req.body;

  // Insert the user data into the customer table
  const userQuery = `INSERT INTO customer (name, phone_number, location) VALUES ('${name}', '${phone_number}', '${location}')`;

  connection.query(userQuery, (error, results, fields) => {
    if (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
      return;
    }

    // Get the ID of the newly created user
    const userId = results.insertId;

    // Send a response indicating that the user was successfully created
    res.status(201).send(`User created with ID ${userId}`);
  });
});



app.get('/credit/:id/', (req, res) => {
  const customerId = req.params.id;

  // Retrieve the credit information of the customer with the given ID from the database
  connection.query('SELECT credit,balance FROM customer WHERE uid = 1', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while retrieving the customer credit information.');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Customer not found.');
      return;
    }
    console.log(results);


    res.json({
      amount: results[0].balance,
      credits:results[0].credit

    });
  });
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});