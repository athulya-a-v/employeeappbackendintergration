// Task1: initiate app and run server at 3000
const express = require('express');
 const mongodb = require('mongodb');
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());



// Task2: create mongoDB connection 
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://athulyakkss:iiATz5Tw8vpjtRaQ@cluster0.dq21b6b.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get('/employees', async (req, res) => {
    try {
        const db = client.db(); // Get database instance
        const employees = await db.collection('employees').find({}).toArray(); // Retrieve all employees
        res.json(employees); // Send response with employee data
    } catch (error) {
        console.error('Error retrieving employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/employees/:id', async (req, res) => {
    try {
        const db = client.db(); // Get database instance
        const employee = await db.collection('employees').findOne({ _id: mongodb.ObjectId(req.params.id) }); // Retrieve employee by ID
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.json(employee); // Send response with employee data
        }
    } catch (error) {
        console.error('Error retrieving employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/employees/:id', async (req, res) => {
    try {
        const db = client.db(); // Get database instance
        const result = await db.collection('employees').deleteOne({ _id: mongodb.ObjectId(req.params.id) }); // Delete employee by ID
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json({ message: 'Employee deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/employees/:id', async (req, res) => {
    try {
        const db = client.db(); // Get database instance
        const result = await db.collection('employees').updateOne(
            { _id: mongodb.ObjectId(req.params.id) },
            { $set: req.body }
        ); // Update employee by ID
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Employee not found' });
        } else {
            res.status(200).json({ message: 'Employee updated successfully' });
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
client.connect(err => {
    if (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



