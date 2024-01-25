const express = require('express') ;
const bodyparser = require('body-parser')  ; 
const mysql = require('mysql2/promise') ; 
const cors = require('cors'); 
const app = express() ; 
const port  = 8000 ; 

app.use(bodyparser.json())
app.use(cors())

let connectedDB = null ; 

// CRUD 
// CREATE READ UPDATE DELETE 

// database key with connection
const initMySQL = async () => {
    connectedDB = await mysql.createConnection({
        host: 'localhost' , 
        user: 'root' , 
        password: 'root' ,
        database : 'test_table' , 
        port : 3306
    })
}

// GET /user สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา // okay READ // GET
app.get('/users' , async (req , res) => {
    try { 
        const array = await connectedDB.query('SELECT * FROM test_class')
        res.json({
            message : 'Fetching completed' , 
            data : array[0] , 
        })
    } catch (error) {
        console.error(error.message) 
        res.status(500)
        res.json({
            message : "Failed Fetching Data From Database" , 
            error : error.message  , 
            status : 500 , 
       })
    }
})

// POST สำหรับการสร้าง user ใหม่บันทุึกเข้าไป // okay CREATE // INSERT
app.post('/user' , async (req , res) => {
     let request = req.body ; 
    try {    
        let array = await connectedDB.query('INSERT INTO test_class SET ?' , request)
        res.json({
            message : 'INSERT completed' , 
            data : array[0] ,  
        }) 
    } catch (error) {
        console.error(error.message);
        res.status(500)
        res.json({
            message : "Failed to INSERT into Database" ,
            error : error.message,
            status : 500
        })
    }
})

// GET /user:id สำหรับการแก้ไข users รายคน (ตาม id) // okay READ // GET => id
app.get('/user/:id' , async (req , res) => {
    let id = req.params.id ; 
    let status = 200;  
    let message = 'Fetching completed' 
    try { 
        let array = await connectedDB.query('SELECT * FROM test_class WHERE id = ?', id)
        if(array[0].length == 0){
            res.status(404)
            message = 'Fetching Error'
            status = 404 ; 
        }
        res.json({
            message : message , 
            data : array[0]  , 
            status : status
        })
    } catch (error) { 
        res.status(500)
       console.error(error.message) 
       res.json({
            message : "Faild to Fetching from Database", 
            error : error.message,
            status : status || 500
       })
    }
})


// PUT /user:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป) // okay UPDATE
app.put('/user/:id' , async (req , res) => {
    let id = req.params.id ; 
    let updateUser = req.body ; 
    try {        
        let array = await connectedDB.query('UPDATE test_class SET ? WHERE id = ?' , [updateUser , id])
        res.json({
            message : 'UPDATE completed' , 
            data : array[0] 
        })        
    } catch (error) {
        console.error(error.message)
        res.status(500) , 
        res.json({
            message : "Failed to Update Database" , 
            error : error.message , 
            status : 500 , 
        })
    }
})


// DELETE /user:id สำหรับการลบ user รายคน (ตาม id) // okay DELETE 
app.delete('/user/:id' , async (req , res) => {
    let id = req.params.id ; 
    let status = 200 ; 
    let message = "Delete completed"
    try { 
        let array = await connectedDB.query('DELETE FROM test_class WHERE id = ?' , id)
        res.json({
            message : message , 
            data : array[0]
        })
    } catch (error) { 
        console.error(error.message)
        res.status(status || 500) , 
        res.json({
            message : "Failed to Delete Item from Database" , 
            error : error.message , 
            status : status || 500 , 
        })
    }
})

app.listen(port , (req ,res) => {
    initMySQL() ; 
    console.log("Server is running on " + `http://localhost:${port}`) ; 
})



/* Node JS Server

const http  = require('http') ; 
const host = 'localhost'
const port = 8000 ;  // localhost:8000 

const requestListener = function(req , res){
    res.writeHead(200) ; 
    res.end("My first Server!") ; 
}

// CreateServer
const server = http.createServer(requestListener);  
server.listen(port , host , () => {
    console.log("Server is running on " + `http://${host}:${port}`) ; 
})

*/


/*
// connection to database
app.get('/testdb' , (req , res) => {
 
    // ** Method Chaining ** connect to database Then => you get data
    connectedDB.then((data) => {

        // talk with database here
        data.query('SELECT * FROM test_class WHERE id=1')

        // ** Method Chaining ** Then => get the result[0]
        .then((result) => { res.json(result[0])

        // ** Method Chaining ** Then => if error 
         }).catch((err) => {
            console.error('Error fetching User :' , err.message) ; 
            res.status(500).json({
                Error : "Something Went Wrong", 
            }); 
        });
    });
})
*/

/*
//  aysnc await Turn Every Promise to Function get rid of then
app.get('/testdb2' , async (req , res) => {
    try {  
        const data = await connectedDB.query('SELECT * FROM test_class') 
        res.json(data[0])  
    } catch (error) {
            console.error(error.message) ; 
            res.status(500).json({
                Error : "Something Went Wrong", 
                ErrorMessage : error.message
        });         
    }
})
*/