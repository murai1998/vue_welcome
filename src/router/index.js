import VueRouter from 'vue-router'
import EmployeeForm from "../components/EmployeeForm"
import EmployeeTable from "../components/EmployeeTable"

export default new VueRouter({
    routes: [
        {
            path: '/form',
            name: 'Form',
            component: EmployeeForm 
        },
        {
            path: '/table',
            name: 'Table',
            component: EmployeeTable
        },
        
    ]
})
