<template lang="">
    <div class="d-flex align-items-center justify-content-end my-2">
        <span>{{parsedDate}}</span>
    </div>
</template>
<script>
export default {
    data: () => ({
        date: new Date()
    }),
    computed: {
        parsedDate () {
            return this.date.toLocaleString()
        }
    },
    mounted() {
        setInterval( () => {
            this.date = new Date()
        },1000)
    },
}
</script>
<style lang="">
    
</style>