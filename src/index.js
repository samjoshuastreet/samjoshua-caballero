// Firebase Application Initialization
import { initializeApp } from 'firebase/app'
// Email and Password Sign In
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'
// Sign In with Golgol
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAaCgX8I0wsHqlZnCxIUDowFe6rfWJZpA4",
    authDomain: "samjoshua-caballero.firebaseapp.com",
    projectId: "samjoshua-caballero",
    storageBucket: "samjoshua-caballero.appspot.com",
    messagingSenderId: "1074617578254",
    appId: "1:1074617578254:web:842234f0663b2b4a991d5f"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init services
const auth = getAuth(app)

// signing users up
const signupForm = document.querySelector('.login_form')
const button = document.querySelector('#sign-up')

button.addEventListener('click', (e) => {
    signup(e)
})

function signup(e) {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // console.log('User created:', cred.user)
        signupForm.reset()
    })
    .catch((err) => {
        console.log(err.message)
    })

}

// logging in and out
const logoutButton = document.querySelector('#logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        // console.log('the user signed out')
    })
    .catch((err) => {
        console.log(err.message )
    })
})

const loginForm = document.querySelector('.login_form')
const loginButton = document.querySelector('#login')
loginButton.addEventListener('click', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('user logged in:', cred.user)
        })
        .catch((err) => {
            console.log(err.message)
        })

})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})

    // Sign in with golgol
    const provider = new GoogleAuthProvider(app);

    const golgolLogin = document.querySelector('#google')

    golgolLogin.addEventListener('click', (e) => {
        signInWithPopup(auth, provider)
    })

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            // user name = displayName
            // email = email
            // photo = photoURL
            // redirect 
            alert('Welcome ' + user.displayName + '!');
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        alert(errorMessage)
    });