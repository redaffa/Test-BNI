<template>
    <div class="container-fluid">
        <section class="row height-100vh">
            <aside class="col-2 p-0 shadow-lg d-none d-md-block">
                <Sidebar />
            </aside>
            <section class="col-10">
                <Header />
                <RouterView />
                <Footer />
            </section>
        </section>
    </div>
</template>

<script>
// Library
import { RouterLink, RouterView } from "vue-router"

// Components
import Sidebar  from "@/components/Sidebar.vue" 
import Header  from "@/components/Header.vue" 
import Footer  from "@/components/Footer.vue" 

export default {
    components: {
        Sidebar,
        Header,
        Footer
    }
}
</script>

<style lang="scss">
.height-100vh {
    min-height: 100vh;
}
</style>
