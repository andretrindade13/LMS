import {v4 as uuid} from 'uuid'

type SignInRequestType = {
    email: string;
    password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(data: SignInRequestType) {
 await delay()
 return {
    token: uuid(),
    user: {
        name: "André Trindade",
        email: "andre@gmail.com",
        avatar_url: "https://github.com/andretrindade13.png"
    }
 }
}

export async function getUserInformation() {
    await delay()
    return {
        user: {
            name: "André Trindade",
            email: "andre@gmail.com",
            avatar_url: "https://github.com/andretrindade13.png"
        } 
    }
}

export async function signUpRequest(data: SignInRequestType) {
    await delay()
    return {
       token: uuid(),
       user: {
           name: "André Trindade",
           email: "andre@gmail.com",
            avatar_url: "https://github.com/andretrindade13.png"
         }
    }
}