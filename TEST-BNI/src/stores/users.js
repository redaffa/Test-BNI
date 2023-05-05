import { defineStore } from 'pinia'
import axios from "axios"
import Swal from "sweetalert2"
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
export const useUserStore = defineStore('user',{
    state: ()=>({
        usersArray:[],
        isLoading: false,
        currentPage: 1,
        totalPage: 0,
        itemPerPage : 10,
        userById:{},
        isLoadingFetchById:false
    }),
    getters:{},
    actions:{
        async getAllUsersData(){
            try {
                this.isLoading = true
                const {data:usersArray} = await axios({
                    method:'get',
                    url:`https://dummyjson.com/users?limit=${this.itemPerPage}&skip=${(this.currentPage-1)*this.itemPerPage}`
                })
                console.log(usersArray)
                this.usersArray = usersArray.users
                this.totalPage = Math.ceil(usersArray.total/this.itemPerPage)
            } catch (err) {
                console.log(err)
            } finally {
                this.isLoading = false
            }
        },
        changePage(payload) {
            this.currentPage = payload
            this.getAllUsersData()
        },
        async addNewUser(userPayload){
            try {
                this.isLoading = true
                const {data} = await axios({
                    method:'post',
                    url: "https://dummyjson.com/users/add",
                    data: userPayload
                })
                Toast.fire({
                    icon: 'success',
                    title: `Added new user with id ${data.id}`
                  })
                this.getAllUsersData()
                this.router.push("/")
               
            } catch (err) {
                console.log(err)
            }
        },
        async deleteUser(id){
            try {
                const{data} = await axios({
                    method:'delete',
                    url:`https://dummyjson.com/users/${id}`
                })
                Toast.fire({
                    icon: 'success',
                    title: `Deleted user with id ${id}`
                  })
                this.getAllUsersData()
            } catch (err) {
                console.log(err)
            }
        },
        async fetchUserById(id){
            try {
                this.isLoadingFetchById = true
                const {data:user} = await axios({
                    method:'get',
                    url:`https://dummyjson.com/users/${id}`
                })
                this.userById = user
            } catch (err) {
                console.log(err)
            } finally {
                this.isLoadingFetchById = false
            }
        },
        async updateUser(payload,id){
            const{data:updatedUser} = await axios({
                method:'put',
                url:`https://dummyjson.com/users/${id}`,
                data: payload
            })
            Toast.fire({
                icon: 'success',
                title: `Updated user with id ${id}`
              })
            this.router.push("/")
        }
    }
})