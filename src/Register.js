import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        // By default, Supabase sends a confirmation email.
        // You can disable this in your project's auth settings if you want users to be logged in immediately.
        setMessage('Registrering vellykket! Sjekk e-posten din for en bekreftelseslenke.');
      }
    } catch (err) {
      setError('En uventet feil oppstod. Prøv igjen senere.');
    }
  };

  return (
    <div className="form-container">
      <h2>Registrer deg</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Navn:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>E-post:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Passord:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Registrer</button>
      </form>
      <p>Har du allerede en konto? <Link to="/">Logg inn</Link></p>
    </div>
  );
}

export default Register;
