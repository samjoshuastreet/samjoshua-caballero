// Firebase Application Initialization
import { initializeApp } from 'firebase/app'
// Email and Password Sign In
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged,
    TwitterAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider 
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

        alert('User successfully created')
        signupForm.reset()
    })
    .catch((err) => {
        alert(err.message)
    })

}

// logging in and out
const logoutButton = document.querySelector('#homepage_logout')
var container2 = document.querySelector('.container2')
logoutButton.addEventListener('click', () => {
    
    signOut(auth)
    .then(() => {
        container2.style.display = "none"
        container.style.display = ""
    })
    .catch((err) => {
        alert(err.message )
    })
})

const loginForm = document.querySelector('.login_form')
const loginButton = document.querySelector('#login')
var container = document.querySelector('.container')
loginButton.addEventListener('click', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            container.style.display = "none"
            container2.style.display = ""
        })
        .catch((err) => {
            alert(err.message)
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

                container.style.display = "none"
                container2.style.display = ""
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


    })

// Sign In With Twitter
const provider4 = new TwitterAuthProvider();
const twitterLogin = document.querySelector('#twitter')
twitterLogin.addEventListener('click', (e) => {
    signInWithPopup(auth, provider4)
    .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        container.style.display = "none"
        container2.style.display = ""
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...

        alert(errorMessage)
    });
})

// Sign In With Twitter
const provider5 = new FacebookAuthProvider();
const facebookLogin = document.querySelector('#facebook')
facebookLogin.addEventListener('click', (e) => {

    signInWithPopup(auth, provider5)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
  
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      container.style.display = "none"
      container2.style.display = ""
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
  
      // ...
      alert(err.message)
    })

})
    
// Sign In With Github
const provider2 = new FacebookAuthProvider();
const githubLogin = document.querySelector('#github')
githubLogin.addEventListener('click', (e) => {

    signInWithPopup(auth, provider2)
    .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        container.style.display = "none"
        container2.style.display = ""
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...

        alert(err.message)
  });

})