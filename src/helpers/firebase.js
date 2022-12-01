import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import {
  toastBlueNotify,
  toastGreenNotify,
  toastRedNotify,
  toastYellowNotify,
} from "./toastNotify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL: process.env.REACT_APP_databaseURL,
};

//! Initialize Firebase
const app = initializeApp(firebaseConfig);

//! Create user
export const createUser = async (values, navigate) => {
  //? yeni bir kullanıcı oluşturmak için kullanılan firebase metodu
  const auth = getAuth(app);
  const { username, email, password } = values;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    //? kullanıcı profilini güncellemek için kullanılan firebase metodu
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    navigate("/");
    toastGreenNotify("Registered successfully!");
    AddAuth(auth.currentUser);
  } catch (error) {
    toastRedNotify(error.message);
  }
};

//! Email/password ile giriş
export const signIn = async (values, navigate) => {
  const auth = getAuth(app);
  const { email, password } = values;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastGreenNotify("Logged in successfully!");
    AddAuth(auth.currentUser);
  } catch (error) {
    toastRedNotify(error.message);
  }
};

//! Listen user
export const userObserver = (setCurrentUser) => {
  //? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName } = user;
      setCurrentUser({ email: email, username: displayName });
    } else {
      setCurrentUser(false);
    }
  });
};

//! Logout
export const logOut = () => {
  const auth = getAuth(app);
  signOut(auth);
  DeleteAuth();
  toastYellowNotify("Logged out successfully!");
};

//! Signin Google
export const signUpWithGoogle = (navigate) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  //? Açılır pencere ile giriş yapılması için kullanılan firebase metodu
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
      toastGreenNotify("Logged in successfully!");
      AddAuth(auth.currentUser);
    })
    .catch((error) => {
      toastRedNotify(error.message);
    });
};

//! Add Auth
export const AddAuth = (currentUser) => {
  const db = getDatabase(app);
  const blogRef = ref(db, "user/");
  const newBlogRef = push(blogRef);

  set(newBlogRef, {
    username: currentUser.displayName,
    email: currentUser.email,
    userLogin: "true",
    createdOn: new Date().toDateString(),
  });
};

export const useFetch = () => {
  const [authCode, setAuthCode] = useState();
  const db = getDatabase(app);
  useEffect(() => {
    const userRef = ref(db, "user/");

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const userArray = [];

      for (let id in data) {
        userArray.push({ id, ...data[id] });
      }
      setAuthCode(userArray);
    });
  }, []);
  return { authCode };
};

export const UpdatedAuth = (info) => {
  const db = getDatabase(app);

  const updates = {};
  updates["user/" + info.id] = info;
  toastBlueNotify("Database updated successfully");
  return update(ref(db), updates);
};

export const DeleteAuth = () => {
  const db = getDatabase(app);
  remove(ref(db, "user/"));
};
