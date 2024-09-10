import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBlp-5aBHxH90YTJe0heBFaoa1ShaUHPU",
  authDomain: "adams-sandbox-52d89.firebaseapp.com",
  databaseURL: "https://adams-sandbox-52d89-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "adams-sandbox-52d89",
  storageBucket: "adams-sandbox-52d89.appspot.com",
  messagingSenderId: "753627633277",
  appId: "1:753627633277:web:65eaaeae2a5ae928d44314",
  measurementId: "G-XBSN6BBR2Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

const email = 'member-service-migration-user@adamsfoodservice.com';
const password = '$changeme$';

signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    // Usuário autenticado, agora pode escutar eventos
    const colRef = collection(db, 'adams_members');
    onSnapshot(colRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          console.log('Documento adicionado:', change.doc.data());
        }
        if (change.type === 'modified') {
          console.log('Documento modificado:', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Documento removido:', change.doc.data());
        }
      });
    });
  })
  .catch((error) => {
    console.error('Erro de autenticação:', error);
  });