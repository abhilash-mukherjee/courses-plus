import {atom} from 'recoil'

export const userState = atom({
    key: 'userState',
    userEmail: null,
    isLoading: true
})