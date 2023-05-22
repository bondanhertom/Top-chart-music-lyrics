import { defineStore } from 'pinia'
import Axios from 'axios'
import Swal from "sweetalert2";
export const useRegisterStore = defineStore('register', {
    // other options...
    state: () => ({
    }),
    getters: {
    },
    actions: {
        async handleRegister(value) {
            try {
                const { data } = await Axios({
                    url: 'https://i-project-music-production.up.railway.app/pub/register',
                    method: 'post',
                    data: {
                        username: value.username,
                        email: value.email,
                        password: value.password,
                        phoneNumber: value.phoneNumber,
                        address: value.address
                    },
                })
                Swal.fire("Registration Success!", "Your account has been registered!", "success");
                this.router.push("/login") //dimakraw
            } catch (error) {
                new Swal("Error", error.response.data.message, "error");
            }
        }
    },
})
