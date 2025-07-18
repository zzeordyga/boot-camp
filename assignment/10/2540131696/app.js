const firebaseConfig = {
    apiKey: "AIzaSyCiFS8zwu4N2bjyqgtlfikIELqrXOyh8wU",
    authDomain: "bootcamp-asg-10.firebaseapp.com",
    projectId: "bootcamp-asg-10",
    storageBucket: "bootcamp-asg-10.firebasestorage.app",
    messagingSenderId: "878504410756",
    appId: "1:878504410756:web:14440c4c48b85b5193ccd1",
    measurementId: "G-CSC6JS52F6"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            db.collection('users').doc(userCredential.user.uid).set({
                email: email,
                role: 'user'
            }).then(() => {
                alert("Registrasi berhasil! Silakan login.");
                window.location.href = 'login.html';
            });
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        alert("Error: " + error.message);
    });
}

auth.onAuthStateChanged(user => {
    const currentPage = window.location.pathname.split('/').pop();
    const protectedPages = ['profile.html', 'admin.html'];
    const publicPages = ['login.html', 'register.html'];

    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists) {
                const userRole = doc.data().role;
                
                if (publicPages.includes(currentPage)) {
                    window.location.href = userRole === 'admin' ? 'admin.html' : 'profile.html';
                    return;
                }
                
                const userEmailElement = document.getElementById('user-email');
                if(userEmailElement) userEmailElement.textContent = user.email;
                
                if (userRole === 'admin' && currentPage !== 'admin.html') {
                    window.location.href = 'admin.html';
                } else if (userRole === 'user' && currentPage !== 'profile.html') {
                    window.location.href = 'profile.html';
                }

                const logoutButton = document.getElementById('logout-button');
                if (logoutButton) logoutButton.addEventListener('click', logoutUser);

            } else {
                logoutUser();
            }
        });
    } else {
        if (protectedPages.includes(currentPage)) {
            window.location.href = 'login.html';
        }
    }
});