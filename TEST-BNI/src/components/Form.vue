<template>
    <div v-if="!isLoadingFetchById" class="d-flex justify-content-center">
        <h1>{{ pageName }} user</h1>
    </div>
    <form v-if="!isLoadingFetchById" @submit.prevent="handleSubmitUserPayload(userPayload)" class="min-height-81vh">
        <div class="form-row row p-5">
            <div class="form-group mt-2 col-md-6">
                <label class="mb-1" for="firstName">First name</label>
                <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    placeholder="First name"
                    v-model="userPayload.firstName"
                />
            </div>
            <div class="form-group mt-2 col-md-6">
                <label class="mb-1" for="lastName">Last name</label>
                <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    placeholder="Last name"
                    v-model="userPayload.lastName"
                />
            </div>
            <div class="form-group mt-2 col-md-6">
                <label class="mb-1" for="username">Username</label>
                <input
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Username"
                    v-model="userPayload.username"
                />
            </div>
            <div class="form-group mt-2 col-md-6">
                <label class="mb-1" for="inputPassword4">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                    placeholder="Password"
                    v-model="userPayload.password"
                />
            </div>
            <div class="form-group mt-2 col-md-6">
                <label class="mb-1" for="inputEmail4">Email</label>
                <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    v-model="userPayload.email"
                />
            </div>
            <div class="form-group mt-2 col-md-6">
            <label class="mb-1" for="inputAddress">Image</label>
            <input
                type="text"
                class="form-control"
                id="imageUrl"
                placeholder="Image Url"
                v-model="userPayload.image"
            />
        </div>
        <div class="form-group mt-2 col-md-6">
            <label class="mb-1" for="inputAddress">Address</label>
            <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                v-model="userPayload.address.address"
            />
        </div>
        <div class="form-group mt-2 col-md-6">
            <label class="mb-1" for="city">City</label>
            <input
                type="text"
                class="form-control"
                id="city"
                placeholder="Washington D.C"
                v-model="userPayload.address.city"
            />
        </div>
        <div class="form-group mt-2 col-md-6">
            <label class="mb-1" for="inputAddress">State</label>
            <input
                type="text"
                class="form-control"
                id="state"
                placeholder="1234 Main St"
                v-model="userPayload.address.state"
            />
        </div>
        <div class="col-md-6"></div>
        <div class="form-group mt-2 col-md-6">
            <label class="mb-1" for="company">Company</label>
            <input
                type="text"
                class="form-control"
                id="company"
                placeholder="Company Name"
                v-model="userPayload.company.name"
            />
        </div>
        <div class="form-group mt-2 col-md-6">
            <label class="mb-1" for="department">Department</label>
            <input
                type="text"
                class="form-control"
                id="deparment"
                placeholder="Department name(company)"
                v-model="userPayload.company.department"
            />
        </div>
        <div class="col-md-12 d-flex justify-content-end mt-4">
            <button
                type="submit"
                class="btn btn-primary mb-3 mt-2 text-white"
                :class="{ disabled: validate(userPayload) }"
            >
                {{ pageName }}
            </button>
        </div>
        </div>
    </form>
    <Loading v-else/>
</template>
<script>
import { mapState, mapActions } from "pinia"
import { useUserStore } from "../stores/users"
import Loading from "@/components/Loading.vue"
export default {
    props: ["pageName"],
    components:{
        Loading
    },
    data() {
        return {
            userPayload: {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                image: "",
                address: {
                    address: "",
                    city: "",
                    state: "",
                },
                company: {
                    name: "",
                    department: "",
                },
            },
        }
    },
    methods: {
        ...mapActions(useUserStore, ["addNewUser", "fetchUserById","updateUser"]),
        handleSubmitUserPayload(userPayload) {
            if (!this.$route.params.id) {
                this.addNewUser(userPayload)
            } else {
                this.updateUser(userPayload,this.$route.params.id)
            }
        },
        validate(userPayload) {
            for (let key in userPayload) {
                if (userPayload.hasOwnProperty(key)) {
                    if (typeof userPayload[key] === "object") {
                        if (this.validate(userPayload[key])) {
                            return true
                        }
                    } else if (
                        userPayload[key] === "" ||
                        userPayload[key] === null
                    ) {
                        return true
                    }
                }
            }
            return false
        },
    },
    computed: {
        ...mapState(useUserStore, ["userById","isLoadingFetchById"]),
    },
    async created() {
        if (this.$route.params.id) {
            await this.fetchUserById(this.$route.params.id)
            this.userPayload = this.userById
        }
    },
}
</script>
<style>

</style>
