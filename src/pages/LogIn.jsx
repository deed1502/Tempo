import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../credentials';
import { Link, useNavigate } from "react-router-dom";
import '../styles/logIn.css';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = getAuth(app);
    const db = getFirestore(app);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                console.log("Usuario encontrado:", userData.username);
                navigate("/");
            } else {
                setError("No se encontró el usuario en la base de datos.");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogIn = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const googleProvider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, googleProvider);
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                console.log("Usuario encontrado:", userData.username);
                navigate("/");
            } else {
                await setDoc(userDocRef, {
                    name: user.displayName.split(' ')[0] || '', 
                    lastName: user.displayName.split(' ')[1] || '', 
                    username: user.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000), 
                    email: user.email,
                    profilePicture: user.photoURL,
                });
                console.log('Usuario registrado con Google');
            }
        } catch (err) {
            setError(err.message);

        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar sesión</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Iniciar sesión</button>
                <div className='register-div'>
                    <p>¿No tienes cuenta? </p>
                    <Link to="/register" className='register-button'>
                        Registrate
                    </Link>
                </div>

            </form>
            <button onClick={handleGoogleLogIn}>Iniciar sesión con Google</button>
        </div>
    );
}
