const buffer = document.getElementById('buffer') ; 
const button_getUsers = document.getElementById('button_getUsers') ; 
const button_getUsers_clear = document.getElementById('button_getUsers_clear') ; 

const button = document.getElementById('button') ; 
const div_getUserID = document.getElementById('div_getUserID') ; 
const div_deleteUserID = document.getElementById('div_deleteUserID') ; 
const input_1 = document.getElementById('input1') ; 
const submit_button_1 = document.getElementById('submit1') ; 
const input_2 = document.getElementById('input2') ; 
const submit_button_2 = document.getElementById('submit2') ; 
const input_createUserID_id = document.getElementById('input_createUserID_id') ; 
const input_createUserID_name = document.getElementById('input_createUserID_name')
const button_createUserID = document.getElementById('button_createUserID') ; 
const div_createUserID = document.getElementById('div_createUserID') ; 

const div_updateID = document.getElementById('div_updateID') ; 
const input_updateID_id = document.getElementById('input_updateID_id') ; 
const input_updateID_name = document.getElementById('input_updateID_name') ; 
const button_updateID = document.getElementById('button_updateID') ; 
const input_updateID_path = document.getElementById('input_updateID_path') ; 

let len = 0 ; 

function print(x , y){
    console.log(x , y) ; 
}

function clear(){
    const array_H2 = document.querySelectorAll('h2') ; 
    let n = array_H2.length ; 
    for(let i = 0 ; i < n ; ++i){
        array_H2[i].remove('heading')
    }
    len = 0 ; 
}

function createHtmlElement(object){
    for(var key in object){
        let strs = "" ; 
        strs += ("id : " + object[key].id + " => ") ; 
        strs += ("name : " + object[key].name) ; 
        let field = document.createElement('h2') ; 
        const text = document.createTextNode(strs) ; 
        field.appendChild(text) ; 
        field.className = "heading" ; 
        buffer.appendChild(field) ; 
    }
}

function createHtmlElementDelete(id , message){
    const field = document.createElement('h2');
    const text = document.createTextNode(message + " " + id)
    field.appendChild(text) ; 
    div_deleteUserID.appendChild(field) ; 
}


function createHtmlElementID(object){
    for(let key in object){
        let strs = "" ; 
        strs += ("id : " + object[key].id) ; 
        strs += " => "
        strs += ('name : ' + object[key].name) ; 
        let field = document.createElement('h2') ; 
        let text = document.createTextNode(strs) ; 
        field.appendChild(text) ; 
        div_getUserID.appendChild(field) ; 
    }
}

const getData = async () => {
    try{
        const response = await axios.get('http://localhost:8000/users') // get(path , body)
        const value = response.data.data ; 
        print(value) ; 
        createHtmlElement(value) ; 
    } catch(error){
        print(error.message)
    }
} 

const getDataID = async(id) => {
    try {  
        const url = "http://localhost:8000/user/"+id
        const response = await axios.get(url)
        const value = response.data.data ; 
        print(value[0]) ; 
        createHtmlElementID(value)    
   } catch (error) {
        let strs = "" ; 
        strs += error.message ; 
        let field = document.createElement('h2') ; 
        let text = document.createTextNode(strs) ; 
        field.appendChild(text) ; 
        div_getUserID.appendChild(field) ; 
        console.log(error.message)
    }
}

const deleteDataID = async (id) => {
    try { 
        let url = "http://localhost:8000/user/"+id ; 
        let response = await axios.delete(url) ; 
        let value = response.data ; 
        createHtmlElementDelete(value.message) ; 
    } catch(error){
        let field = document.createElement('h2') ; 
        let text = document.createTextNode(error.message) ; 
        field.appendChild(text) ; 
        div_deleteUserID.appendChild(field) ; 

        print(error.message) ; 
    }
}

const createUser = async (id , name) => {
    try { 
        const hashmap = {
            "id" : id || null, 
            "name" : name  
        }; 
        const response = await axios.post(("http://localhost:8000/user") , hashmap) ;
        let value = response.data ; 
        print("Create" , value)

        let field = document.createElement('h2') ; 
        let text = document.createTextNode(value.message) ; 
        field.appendChild(text) ; 
        div_createUserID.appendChild(field) ; 

    } catch (error) {
        let strs = "" ; 
        strs += error.message ; 
        let field = document.createElement('h2') ; 
        let text = document.createTextNode(strs) ; 
        field.appendChild(text) ; 
        div_createUserID.appendChild(field) ; 
        console.log(error.message)
    }
}

const updateUser = async (id , name = "" , path) => {
    try { 
        const hashmap = {
            "id" : id | null ,
            'name' : name 
        }
        const response = await axios.put(('http://localhost:8000/user/'+path) , hashmap)
        let value = response.data ; 
        print(value)

        let field = document.createElement('h2') ; 
        let text = document.createTextNode(response.data.message) ; 
        field.appendChild(text) ; 
        div_updateID.append(field) ;  

    } catch (error) {
        let field = document.createElement('h2') ; 
        let text = document.createTextNode(error.message) ; 
        field.appendChild(text) ; 
        div_updateID.append(field) ; 
       console.error(error.message)  ; 
    }
}


button_getUsers.addEventListener('click' , (event) => {
    if(len == 1) { 
        let field = document.createElement('h2'); 
        let text = document.createTextNode("Require Reload") ; 
        field.appendChild(text) ; 
        buffer.append(field) ; 
        console.error("To check result F5") ; 
        throw new Error("Require reload") ; 
    }
    getData() ; 
    len++ ; 
})

button_getUsers_clear.addEventListener('click' , (event) => {
    clear() ; 
})

submit_button_1.addEventListener('click' , (event) => {
    const id = input_1.value ; 
    getDataID(id) ; 
})

submit_button_2.addEventListener('click' , (event) => { 
    const id = input_2.value ; 
    deleteDataID(id) ; 
})


button_createUserID.addEventListener('click' , (event)=> {
    const id = input_createUserID_id.value ; 
    const name = input_createUserID_name.value ; 
    if(name == ""){
        let strs = " Error : invalid input please Check[name] " ; 
        let field = document.createElement('h2') ; 
        let text = document.createTextNode(strs) ; 
        field.appendChild(text) ; 
        div_createUserID.appendChild(field) ; 
        throw new Error(" Please Check The values ! ") ; 
    }
    createUser(id , name); 
})



button_updateID.addEventListener('click' , (event) => {
    const id = input_updateID_id.value; 
    const name = input_updateID_name.value ; 
    const path = input_updateID_path.value ; 
    if(name == ""){
        let strs = " Error :  invalid inputs " ; 
        let field = document.createElement('h2') ; 
        let text = document.createTextNode(strs) ; 
        field.appendChild(text) ; 
        div_updateID.appendChild(field) ; 
        throw new Error(" Please Check the values ! ") ; 
    }
    updateUser(id , name , path); 
})



/*
fetch('http://localhost:8000/users')
.then((response) => { return res.json() })
.then((data) => { 
    console.log('data' , data) 
    api.push(data) ; 
})
.catch((error) => { console.log(error.message) })
*/

// document.body.appendChild(field)