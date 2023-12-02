import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD0dN00PHj2mfhUe8IoITzPnh2YliqCmz4",
  authDomain: "cryptovize-72ddc.firebaseapp.com",
  projectId: "cryptovize-72ddc",
  storageBucket: "cryptovize-72ddc.appspot.com",
  messagingSenderId: "306017954112",
  appId: "1:306017954112:web:a6b7963652435357c432a5",
  measurementId: "G-HPKY78VK7S",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const createUser = async (values) => {
  try {
    const user = await addDoc(collection(db, "users"), {
      ...values,
      wallet: {
        cash: 1000000,
        coins: [],
        transactions: [],
        receiver: null,
      },
      error: null,
    });
  } catch (err) {
    console.log(err);
  }
};
const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const snapshot = await getDocs(usersCollection);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
};
const getUser = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users[0];
  } catch (error) {
    throw error;
  }
};
const updateUser = async (user) => {
  const docRef = doc(collection(db, "users"), user.id);
  await updateDoc(docRef, user);
};
export { createUser, getUsers, getUser, updateUser };
