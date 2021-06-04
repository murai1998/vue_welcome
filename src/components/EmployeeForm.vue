<template>
<div id="employee-form">
    <form @submit.prevent="handleSubmit">
    <div class="input_form">
<label>Name: </label>
<input :class="{active: success, error: error}" ref="first" type="text" v-model="employee1.name" @focus="clearStatus"
    @keypress="clearStatus"/>
    </div>
    <div class="input_form">
<label>Email: </label>
<input :class="{active: success, error: error}" type="text" v-model="employee1.email" @focus="clearStatus"
    @keypress="clearStatus"/>
    </div>
    <br>
     <p v-if="error && submitting" class="error-message">
    ❗Please fill out all required fields
  </p>
  <p v-if="success" class="success-message">✅ Employee successfully added</p>
    <button >Submit</button>
    </form>
</div>
</template>


<script>
    export default{
        name: "employee-form",
        data(){
            return{
                submitting: false,
                success: false,
                error: false,
                employee1: {
                name: "",
                email: ""
                }
            } 
        },
        computed:{
            invalidName() {
    return this.employee1.name === ''
  },

  invalidEmail() {
    return this.employee1.email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) === null;
  },
        },
        methods:{
            handleSubmit(){
                this.submitting = true;
                this.clearStatus();
                if(this.invalidName || this.invalidEmail){
                    this.error = true;
                    return
                }
                this.$emit('add:employee', this.employee1)
                this.$refs.first.focus()
                this.employee1.name = "";
                this.employee1.email = ""
                this.error = false;
                this.success = true;
                this.submitting = false
            },
            clearStatus(){
                this.success = false;
                this.error = false
            }
        }

    }
</script>

<style>
.input_form{
display: flex;
justify-content: space-between;
padding-top: 0.4em;
}
#employee-form{
    display: flex;
    flex-direction: column;
justify-content: space-between;
padding: 0.5em;
border: 2px solid green;
}
button{
    padding: 0.5em 1em;
    background: green;
    color:white;
    float: right !important;
}
.error-message{
    color: red;
}
.success-message{
color: rgb(11, 199, 11);
}
.success{
    border: 1px solid red;
}
.error{
    border: 1px solid red;
}


</style>