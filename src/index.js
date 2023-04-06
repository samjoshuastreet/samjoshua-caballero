// Firebase Application Initialization
import { initializeApp } from 'firebase/app'
// Email and Password Sign In, Twitter, Facebook, and Github
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
import { 
    GoogleAuthProvider, 
    signInWithPopup 
} from "firebase/auth";
// FIRESTORE
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore'


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

var container2 = document.querySelector('.container2')
var container = document.querySelector('.container')
var user_status = 0

var user_status = new URLSearchParams(window.location.search).get('user_status')

if (user_status == 1){
    container.style.display = 'none'
    container2.style.display = ""
}else{
    console.log('no one is logged in')
    container2.style.display = 'none'
}



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

const loginForm = document.querySelector('.login_form')
const loginButton = document.querySelector('#login')

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

// Database
const db = getFirestore()
// collection reference
const colRef = collection(db, 'comments')
// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let comments = []
        snapshot.docs.forEach((doc) => {
            comments.push({ ...doc.data(), id: doc.id })
        })
        console.log(comments)
        snapshot.docs.forEach(doc => {
            renderComment(doc)
        })
    })
    .catch(err => {
        console.log(err.message)
    })

// CRUD
const itemList = document.querySelector('.read')
const crudForm = document.querySelector('.crud')
const createButton = document.querySelector('.button2')
createButton.addEventListener('click', (e) => {
    e.preventDefault()

    addDoc(colRef, { comment: crudForm.comment.value })
        .then(() => {
            crudForm.reset()
            if (user_status == 1) {
                location.href = location.href
            }else{
                location.replace(location.href + "?user_status=1")
            }

        })
})

function deleteTheDamnDoc(document) {
    let docRef = doc(db, "comments", document)
    deleteDoc(docRef)
    .then(() => {
        if (user_status == 1) {
            location.href = location.href
        }else{
            location.replace(location.href + "?user_status=1")
        }
    })
    .catch(err => {
        console.log(err.message)
    })
}

var contForm = document.querySelector('.cont3');
async function editTheDamnDoc(document, old_value) {
    let docRef = doc(db, "comments", document)
    contForm.updated_content.setAttribute('value', old_value)
    contForm.updated_content.setAttribute('placeholder', 'Provide New Value')
    hideDiv()

    button3.addEventListener('click', (e) => {

        e.preventDefault()
        
        updateDoc(docRef, { 
            comment: contForm.updated_content.value 
        })
        .then(() => {
            showDiv()
            if (user_status == 1) {
                location.href = location.href
            }else{
                location.replace(location.href + "?user_status=1")
            }
        })
        .catch(err => {
            console.log(err.message)
        })

    })
}

var button3 = document.getElementById('close_cont3')
var button4 = document.getElementById('close_cont4')
var container3 = document.querySelector('.container3')
container3.style.display = 'none'
button4.addEventListener('click', (e) => {

    e.preventDefault()
    showDiv()
    if (user_status == 1) {
        location.href = location.href
    }else{
        location.replace(location.href + "?user_status=1")
    }
})
function hideDiv() {
    container2.style.display = 'none'
    container3.style.display = 'block'
}
function showDiv() {
    container2.style.display = 'block'
    container3.style.display = 'none'
}

const edit_icon = document.getElementById('read-icon1')
const delete_icon = document.getElementById('read-icon2')
function renderComment(doc){
    let comment_container = document.createElement('div')
    let comment_content = document.createElement('input')
    const edit_icon_copy = edit_icon.cloneNode(true)
    const delete_icon_copy = delete_icon.cloneNode(true)
    comment_container.classList.add('item')
    comment_content.setAttribute('type', 'text')
    comment_content.setAttribute('id', 'item')
    comment_content.setAttribute('value', doc.data().comment)
    comment_content.setAttribute('data-id', doc.id)
    comment_content.setAttribute('placeholder', doc.data().comment)
    comment_content.disabled = true;
    itemList.appendChild(comment_container)
    comment_container.appendChild(comment_content)
    comment_container.appendChild(edit_icon_copy)
    comment_container.appendChild(delete_icon_copy)

    //deleting data
    delete_icon_copy.addEventListener('click', async (e) => {
        e.stopPropagation();
        try {
          const document = await doc.id; // Retrieve the document from the database
          deleteTheDamnDoc(document)
        } catch (error) {
          console.log(error);
        }
      });

    // update data
    edit_icon_copy.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const old_value = await doc.data().comment
            const document = await doc.id;
            editTheDamnDoc(document, old_value)
        } catch (error) {
            console.log(error);
        }
    });
      
}