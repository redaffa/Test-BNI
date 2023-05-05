<template >
  <Form :pageName="pageName" />
</template>
<script>
import Form from "@/components/Form.vue"
export default {
    components : {
        Form
    },
    data(){
        return{
            pageName : "Edit"
        }
    }
}
</script>
<style>
    
</style>