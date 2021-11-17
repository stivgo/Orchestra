import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch(mutation.type) {
        case 'session/LOGIN_SESSION':
            if (mutation.payload){
                axios.defaults.headers.common['Authorization'] =  `Bearer ${mutation.payload}`
                localStorage.setItem('token', mutation.payload)
            } else {
                axios.defaults.headers.common['Authorization'] =  null
                localStorage.removeItem('token')
            }
            break;
        case 'session/SET_USER':
            if (mutation.payload){
                localStorage.setItem('userId', mutation.payload._id)
                localStorage.setItem('email', mutation.payload.email)
                localStorage.setItem('firstName', mutation.payload.firstName)
                localStorage.setItem('lastName', mutation.payload.lastName)
            } else {
                localStorage.removeItem('userId')
                localStorage.removeItem('email')
                localStorage.removeItem('firstName')
                localStorage.removeItem('lastName')
            }
            break;
    }
})