import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { app } from '../../credentials';
import '../styles/register.css';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const db = getFirestore(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;


            
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                name: name,
                lastName: lastName,
                email: email,
            });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className='register-container'>
            <form onSubmit={handleSubmit} className='register-form'>
                <h2>Registrarse</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}
