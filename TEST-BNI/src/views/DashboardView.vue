<script>
import { useUserStore } from "../stores/users"
import { mapState, mapActions } from "pinia"
import Loading from "@/components/Loading.vue"
// import { json } from "stream/consumers"
export default {
    components: { Loading },
    computed: {
        ...mapState(useUserStore, [
            "usersArray",
            "isLoading",
            "totalPage",
            "currentPage",
        ]),
    },
    methods: {
        ...mapActions(useUserStore, ["getAllUsersData", "changePage","deleteUser","fetchUserByIdToPopulateEditForm"]),
        lastNameMasker(lastName) {
            const maskLength = Math.ceil(lastName.length * 0.7)
            return lastName.slice(0, -1 * maskLength) + "*".repeat(maskLength)
        },
    },
    async created() {
        await this.getAllUsersData()
        console.log(this.usersArray)
    },
}
</script>
<template>
    <section class="container pa-4">
        <table v-if="!isLoading" class="table table-hover">
            <thead class="table-head">
                <tr>
                    <th class="align-middle">ID</th>
                    <th class="align-middle">Image</th>
                    <th class="align-middle">Name</th>
                    <th class="align-middle">Username</th>
                    <th class="align-middle">Company</th>
                    <th class="align-middle">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, idx) in usersArray">
                    <td class="align-middle">{{ user.id }}</td>
                    <td class="align-middle">
                        <img
                            :src="user.image"
                            class="img-thumbnail rounded-circle"
                            width="75"
                            height="75"
                        />
                    </td>
                    <td class="align-middle">
                        {{
                            user.firstName + " " + lastNameMasker(user.lastName)
                        }}
                    </td>
                    <td class="align-middle">{{ user.username }}</td>
                    <td class="align-middle">{{ user.company.name }}</td>
                    <td class="align-middle">
                        <button type="button" class="btn btn-outline-danger" @click.prevent="deleteUser(user.id)">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
                                />
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
                                />
                            </svg>
                            Delete
                        </button>
                        <button type="button" class="btn btn-outline-warning" @click.prevent="this.$router.push(`/edit/${user.id}`)" >Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <Loading v-else />
        <nav aria-label="...">
            <ul class="pagination justify-content-end">
                <li
                    class="page-item"
                    :class="{ disabled: currentPage === 1 }"
                    @click="currentPage > 1 && changePage(currentPage - 1)"
                >
                    <a class="page-link">&laquo;</a>
                </li>
                <li
                    v-for="index in totalPage"
                    class="page-item"
                    :class="{ active: currentPage === index }"
                    @click="currentPage !== index && changePage(index)"
                >
                    <a class="page-link">{{ index }}</a>
                </li>
                <li
                    class="page-item"
                    :class="{ disabled: currentPage === totalPage }"
                    @click="
                        currentPage < totalPage && changePage(currentPage + 1)
                    "
                >
                    <a class="page-link">&raquo;</a>
                </li>
            </ul>
        </nav>
    </section>
</template>

<style lang="scss" scoped>
.page-item {
    cursor: pointer;
}

.disabled,
.active {
    cursor: not-allowed;
}

.table-head {
    background-color: #e55300;
    color: white;
}
</style>
