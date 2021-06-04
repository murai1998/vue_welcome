<template>
<div id="employee-table">
<table>
<thead>
    <tr>
        <th>
            Name
        </th>
        <th>
            Email
        </th>
        <th>
            Delete
        </th>
        <th>
           Edit
        </th>
    </tr>
</thead>

<tbody>
    <tr v-for="em in data2" :key="em.id">
        <th v-if="editStatus === em.id">
<input type="text" v-model="em.name"/>
        </th>
        <th v-else>
           {{em.name}}
        </th>
         <td v-if="editStatus === em.id">
             <input type="text" v-model="em.email"/>
             </td>
        <td v-else>
            {{em.email}}
        </td>
        <th v-if="editStatus === em.id">
<button @click="handleUpdate(em.id, em.name, em.email)">Save</button>
        </th>
        <th v-else>
            <button @click="handleDelete(em.id)">Delete</button>
            </th>
            <th v-if="editStatus === em.id">
<button v-on:click="handleCancel" class="cancel">Cancel</button>
            </th>
            <th v-else>
<button @click="editMode(em.id)">Edit</button>
            </th>
    </tr>

     
</tbody>
</table>

</div>
</template>


<script>

export default{
    name: "employee-table",
    props: ["data2"],
    data(){
        return{
            editStatus: null
        }
    },
  methods:{
      handleDelete(id){
         
          this.$emit("delete:employee", id);
      },
    handleEdit(id){
        this.$emit("edit:employee", id)
    },
    editMode(id){
        this.editStatus = id;
    },
    handleCancel(){
        this.editStatus = null
    },
    handleUpdate(id, name, email){
        console.log("Update", id, name, email)
        this.$emit("edit:employee", id, name, email)
        this.editStatus = null

    }

  }
}

</script>

<style>
table, th, td{
    border: 1px solid black;
}
table{
    font-size: 1.2em;
}
td, th{
    padding: 0.5em;
}
.cancel{
    background: white;
    color: green;
}

</style>