
    // FIREBASE APPLICATION
    import { 
        initializeApp
    } from 'firebase/app'

    import {
        getDatabase,
        ref,
        set,
        onValue
    } from 'firebase/database'

    // IMPORTS
    // FIREBASE AUTH
    import {
        getAuth,
        createUserWithEmailAndPassword,
        signOut, signInWithEmailAndPassword,
        onAuthStateChanged,
        TwitterAuthProvider,
        FacebookAuthProvider,
        GoogleAuthProvider,
        GithubAuthProvide,  
        signInWithPopup
    } from 'firebase/auth'
    // FIREBASE FIRESTORE
    import {
        getFirestore,
        collection,
        getDocs,
        addDoc,
        deleteDoc,
        doc,
        updateDoc
    } from 'firebase/firestore'



// CONFIGURATIONS
const firebaseConfig = {
    apiKey: "AIzaSyAaCgX8I0wsHqlZnCxIUDowFe6rfWJZpA4",
    authDomain: "samjoshua-caballero.firebaseapp.com",
    projectId: "samjoshua-caballero",
    storageBucket: "samjoshua-caballero.appspot.com",
    messagingSenderId: "1074617578254",
    appId: "1:1074617578254:web:842234f0663b2b4a991d5f"
};



// FIREBASE INITIATION
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)



// DOM QUERY SELECTORS
const container = document.querySelector('.container')
const container2 = document.querySelector('.container2')



// USER STATUS
var user_status = 0
var user_status = new URLSearchParams(window.location.search).get('user_status')
    if (user_status == 1){
        container.style.display = 'none'
        container2.style.display = ""
    }else{
        console.log('no one is logged in')
        container2.style.display = 'none'
    }



// SIGNING UP USERS

    // DOM QUERY SELECTORS
    const signupForm = document.querySelector('.login_form')
    const button = document.querySelector('#sign-up')

    // EVENT LISTENERS
    button.addEventListener('click', (e) => {
        signup(e)
    })

    // FUNCTIONS
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



// LOGGING IN AND LOGGING OUT USERS

    // DOM QUERY SELECTORS
    const logoutButton = document.querySelector('#homepage_logout')
    const loginForm = document.querySelector('.login_form')
    const loginButton = document.querySelector('#login')

    // EVENT LISTENERS
    logoutButton.addEventListener('click', () => {
        
        signOut(auth)
        .then(() => {
            container2.style.display = 'none'
            container.style.display = ""
            location.replace(location.href.replace('?user_status=1', ''))
        })
        .catch((err) => {
            alert(err.message )
        })
    })

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



// USER STATUS CHANGES
onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})



// SINGING IN WITH EXTERNAL PROVIDERS

    // GOOGLE

        // DOM QUERY SELECTORS
        const provider = new GoogleAuthProvider(app);
        const golgolLogin = document.querySelector('#google')

        // EVENT LISTENERS
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

    // TWITTER

        // DOM QUERY SELECTORS
        const provider4 = new TwitterAuthProvider();
        const twitterLogin = document.querySelector('#twitter')

        // EVENT LISTENERS
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

    // FACEBOOK

        // DOM QUERY SELECTORS
        const provider5 = new FacebookAuthProvider();
        const facebookLogin = document.querySelector('#facebook')

        // EVENT LISTENERS
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
    
    // GITHUB
        // DOM QUERY SELECTORS
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



// DATABASE OPERATIONS -- BACKEND

    // DATABASE REFERENCE
    const db = getFirestore()
    
// REALTIME DATABASE
const database = getDatabase(app);
const bpm = ref(database, 'BPM');
const oxy = ref(database, 'SpO2');
var bpmVal = 0.00;
var oxyVal = 0.00;

// DOMs
const bpm_cont = document.getElementById('bpm');
const oxy_cont = document.getElementById('oxy');

// LISTENERS
onValue(bpm, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    bpmVal = data;
    bpm_cont.innerText = data;
})
onValue(oxy, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    oxyVal = data;
    oxy_cont.innerText = data + "%";
})

// VISUALS

function getData() {
    return bpmVal;
}
function getData2() {
    return oxyVal;
}

Plotly.newPlot('line1', [{
    y:[getData()],
    type: 'line'
}]);

var cnt = 0;
var cnt2 = 0;

setInterval(function(){

    Plotly.extendTraces('line1', {
        y: [[getData()]]
    }, [0]);

    cnt++;

    if (cnt > 5) {
        Plotly.relayout('line1', {
            xaxis: {
                range: [cnt-5, cnt]
            }
        });
    }
}, 1000);

Plotly.newPlot('line2', [{
    y:[getData2()],
    type: 'line'
}]);

setInterval(function(){

    Plotly.extendTraces('line2', {
        y: [[getData2()]]
    }, [0]);

    cnt2++;

    if (cnt2 > 5) {
        Plotly.relayout('line2', {
            xaxis: {
                range: [cnt2-5, cnt2]
            }
        });
    }
}, 1000);




