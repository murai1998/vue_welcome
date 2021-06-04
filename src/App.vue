<template>
<div id="app">
<h1>Employee list</h1>
<employee-form @add:employee="addEmployee"/>
<br/>
<employee-table :data2="employees" @delete:employee="deleteEmployee" @edit:employee="editEmployee"/>

</div>
</template>

<script>
import EmployeeTable from './components/EmployeeTable.vue'
import EmployeeForm from "./components/EmployeeForm"
import { uuid } from 'vue-uuid'; 
// const Foo = { template: '<div>foo</div>' }
import axios from "axios"
export default {
  name: "app",
  components: {
    EmployeeTable,
    EmployeeForm
  },
  data(){
    return {
      employees: [
        // {id: uuid.v4(), name:  "Steve Barket", email: "sbarket@gmail.com"}, {id: uuid.v4(), name: "Louis Crewano" , email: "lcrewano@gmail.com"}, {id: uuid.v4(), name: "Alisson Verdino" , email: "laverdino@gmail.com"}
      ]
    }
  },
  mounted(){
    this.getEmployees()
  },
  methods: {
    async addEmployee(employee){
      try{
      console.log("Emplyees", this.employees)
      let id = uuid.v4();
      console.log("UUID", uuid.v4())
       let newEmployee = {...employee, id}
       let postData = await axios.post("https://jsonplaceholder.typicode.com/users", newEmployee)
       console.log("Post data ", postData)
      this.employees = [...this.employees, newEmployee]
      } catch(err){
        console.log(err)
      }
    },

    async deleteEmployee(id){
      try{      let deleetEm = await await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    });
      console.log(`Deleting id=${id}`, deleetEm)
      this.employees = this.employees.filter(em => em.id !== id)
      } catch(err){
        console.log(err)
      }
    },
   async editEmployee(id, name, email){
     try{
      
let newEm = {id: id, name: name, email: email}
 const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newEm),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    console.log(response)
     this.employees = this.employees.map(em => em.id === id ? newEm : em)
     } catch(err){
       console.log(err)
     }
     
   },
   async getEmployees(){
     try{
       const data = await  axios.get("https://jsonplaceholder.typicode.com/users");
       console.log("All employees", data.data)
       this.employees = data.data
     } catch(err){
       console.log(err)
     }
   },
   sayHi(event){
     console.log("Hello", event)
   }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
