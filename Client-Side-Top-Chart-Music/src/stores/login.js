import { defineStore } from 'pinia'
import Axios from 'axios'
import Swal from "sweetalert2";

export const useLoginStore = defineStore('login', {
    // other options...
    state: () => ({
        isLogin: false,
        userId: localStorage.getItem('userId') || null,
    }),
    getters: {
    },
    actions: {
        async handleLogin(value) {
            this.isLogin = true
            try {
                const { data } = await Axios({
                    url: 'https://i-project-music-production.up.railway.app/pub/login',
                    method: 'post',
                    data: {
                        email: value.email,
                        password: value.password
                    },
                })
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('userId', data.userId);
                this.userId = data.userId;
                console.log('userId:', this.userId);
                Swal.fire("Logged!", "You just logged in!", "success");
                this.router.push("/") //dimakraw
            } catch (error) {
                new Swal("Error", error.response.data.message, "error");
                this.isLogin = false
            }
        },



        async googleLogin(response) {
            this.isLogin = true
            try {
                let { data } = await Axios({
                    url: "https://i-project-music-production.up.railway.app/google-sign-in",
                    headers: { token_google: response.credential },
                    method: "post",
                });
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('userId', data.userId);
                this.userId = data.userId;
                console.log('userId:', this.userId);
                Swal.fire("Logged!", "You just logged in!", "success");
                this.router.push({ path: "/" });
            } catch (error) {
                console.log(error);
                new Swal("Error", error.response.data.message, "error");
            }
        },



    },
})
