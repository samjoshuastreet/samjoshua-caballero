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
const container4 = document.querySelector('.container4')
const container5 = document.querySelector('.container5')
var container3 = document.querySelector('.container3')
var user_status = 0

var user_status = new URLSearchParams(window.location.search).get('user_status')

if (user_status == 1){
    container.style.display = 'none'
    container4.style.display = 'none'
    container5.style.display = 'none'
    container3.style.display = 'none'
    container6.style.display = 'none'
    container2.style.display = ""
}else{
    console.log('no one is logged in')
    container2.style.display = 'none'
    container4.style.display = 'none'
    container5.style.display = 'none'
    container6.style.display = 'none'
    container3.style.display = 'none'
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
const colRef = collection(db, 'game-consoles')
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
const itemList = document.querySelector('#read')
const crudForm = document.querySelector('.crud')
// createButton.addEventListener('click', (e) => {
//     e.preventDefault()

//     showCreate()

//     addDoc(colRef, { comment: crudForm.comment.value })
//         .then(() => {
//             crudForm.reset()
//             if (user_status == 1) {
//                 location.href = location.href
//             }else{
//                 location.replace(location.href + "?user_status=1")
//             }

//         })
// })

const createForm = document.querySelector('.create_cont')
const updateForm = document.querySelector('.update_cont')
const createButton = document.querySelector('#create_button')
const cancelButton = document.querySelector('#cancel_button')
const cancelButton2 = document.querySelector('#cancel_button2')
const createButtonMain = document.querySelector('#create3')
const viewGraph = document.querySelector('#create4')
const exitGraph = document.querySelector('#create5')
const updateButton = document.querySelector('#update_button')
createButtonMain.addEventListener('click', (e) => {
    showCreate()
})
cancelButton.addEventListener('click', (e) => {
    hideCreate()
})
cancelButton2.addEventListener('click', (e) => {
    hideUpdate()
})
viewGraph.addEventListener('click', (e) => {
    showGraph()
})
exitGraph.addEventListener('click', (e) => {
    hideGraph()
})
function showGraph()  {
    container6.style.display = ""
    container2.style.display = "none"
}
function hideGraph()  {
    container2.style.display = ""
    container6.style.display = "none"
}
createButton.addEventListener('click', (e) => {
    e.preventDefault()

    let disYear = createForm.discontinuation_year.value
    disYear = parseInt(disYear)

    let relYear = createForm.release_year.value
    relYear = parseInt(relYear)

    let units = createForm.units_sold_in_millions.value
    units = parseInt(units)

    addDoc(colRef, {
        ["Company"]: createForm.company.value,
        ["Console Name"]: createForm.console_name.value,
        ["Discontinuation year"]: disYear,
        ["Released Year"]: relYear,
        ["Type"]: createForm.type.value,
        ["Units Sold in Millions"]: units
    })
    .then(() => {
        createForm.reset()
        hideCreate()
        if (user_status == 1) {
            location.href = location.href
        }else{
            location.replace(location.href + "?user_status=1")
        }
    })
})
function showCreate() {
    container2.style.display = 'none'
    container4.style.display = ''
    container5.style.display = 'none'
}
function hideCreate() {
    container4.style.display = 'none'
    container2.style.display = ''
    container5.style.display = 'none'
}
function showUpdate() {
    container2.style.display = 'none'
    container4.style.display = 'none'
    container5.style.display = ''
}
function hideUpdate() {
    container5.style.display = 'none'
    container4.style.display = 'none'
    container2.style.display = ''
}

function deleteTheDamnDoc(document) {
    let docRef = doc(db, "game-consoles", document)
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
async function editTheDamnDoc(
    document, 
    old_console_name, 
    old_type,
    old_company,
    old_release_year,
    old_discontinuation_year,
    old_units
) {
    let docRef = doc(db, "game-consoles", document)

    updateForm.console_name.setAttribute('value', old_console_name)
    updateForm.console_name.setAttribute('placeholder', 'Provide New Console Name')
    
    updateForm.type.setAttribute('value', old_type)
    updateForm.type.setAttribute('placeholder', 'Provide New Type')

    updateForm.company.setAttribute('value', old_company)
    updateForm.company.setAttribute('placeholder', 'Provide New Company')

    updateForm.release_year.setAttribute('value', old_release_year)
    updateForm.release_year.setAttribute('placeholder', 'Provide New Year of Release')

    updateForm.discontinuation_year.setAttribute('value', old_discontinuation_year)
    updateForm.discontinuation_year.setAttribute('placeholder', 'Provide New Year of Discontinuation')

    updateForm.units_sold_in_millions.setAttribute('value', old_units)
    updateForm.units_sold_in_millions.setAttribute('placeholder', 'Provide New Units Sold in Millions')
    
    showUpdate()

    updateButton.addEventListener('click', (e) => {

        e.preventDefault()

        let disYear = updateForm.discontinuation_year.value
        disYear = parseInt(disYear)
    
        let relYear = updateForm.release_year.value
        relYear = parseInt(relYear)
    
        let units = updateForm.units_sold_in_millions.value
        units = parseInt(units)
        
        updateDoc(docRef, { 
            ["Company"]: updateForm.company.value,
            ["Console Name"]: updateForm.console_name.value,
            ["Discontinuation year"]: disYear,
            ["Released Year"]: relYear,
            ["Type"]: updateForm.type.value,
            ["Units Sold in Millions"]: units
        })
        .then(() => {
            hideUpdate()
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
    let row = itemList.insertRow(-1)
    row.setAttribute('class', 'row')
    let c1 = row.insertCell(0)
    let c2 = row.insertCell(1)
    let c3 = row.insertCell(2)
    let c4 = row.insertCell(3)
    let c5 = row.insertCell(4)
    let c6 = row.insertCell(5)
    let c7 = row.insertCell(6)
    c1.setAttribute('class', 'column')
    c1.innerText = doc.data()["Console Name"]
    c2.setAttribute('class', 'column')
    c2.innerText = doc.data()["Type"]
    c3.setAttribute('class', 'column')
    c3.innerText = doc.data()["Company"]
    c4.setAttribute('class', 'column')
    c4.innerText = doc.data()["Released Year"]
    c5.setAttribute('class', 'column')
    c5.innerText = doc.data()["Discontinuation year"]
    c6.setAttribute('class', 'column')
    c6.innerText = doc.data()["Units Sold in Millions"]
    c7.setAttribute('class', 'column')
    const edit_icon_copy = edit_icon.cloneNode(true)
    const delete_icon_copy = delete_icon.cloneNode(true)
    c7.appendChild(edit_icon_copy)
    c7.appendChild(delete_icon_copy)
    // comment_content.setAttribute('type', 'text')
    // comment_content.setAttribute('id', 'item')
    // comment_content.setAttribute('value', doc.data().comment)
    // comment_content.setAttribute('data-id', doc.id)
    // comment_content.setAttribute('placeholder', doc.data().comment)
    // comment_content.disabled = true;
    // itemList.appendChild(row)
    // comment_container.appendChild(comment_column)
    // comment_container.appendChild(edit_icon_copy)
    // comment_container.appendChild(delete_icon_copy)

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
            const old_console_name = await doc.data()["Console Name"]
            const old_type = await doc.data()["Type"]
            const old_company = await doc.data()["Company"]
            const old_release_year = await doc.data()["Released Year"]
            const old_discontinuation_year = await doc.data()["Discontinuation year"]
            const old_units = await doc.data()["Units Sold in Millions"]
            const document = await doc.id;
            editTheDamnDoc(
                document, 
                old_console_name, 
                old_type,
                old_company,
                old_release_year,
                old_discontinuation_year,
                old_units
            )
        } catch (error) {
            console.log(error);
        }
    });
      
}



getDocs(colRef)
    .then((snapshot) => {
        let console_names = []
        let console_units = []
        snapshot.docs.forEach(doc => {
            console_names.push(doc.data()["Console Name"])
            console_units.push(doc.data()["Units Sold in Millions"])
        })
        var data = [
            {
              x: console_names,
              y: console_units,
              type: 'bar'
            }
          ];
          
        Plotly.newPlot('container6', data);
    })



