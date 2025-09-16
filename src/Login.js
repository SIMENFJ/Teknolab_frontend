import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message || 'Innlogging feilet.');
        return;
      }

      if (data.user) {
        // The onLogin function expects a specific structure.
        // We can create a similar structure from the Supabase user object.
        const userProfile = {
          success: true,
          user: {
            name: data.user.user_metadata.name,
            email: data.user.email,
            // You might need to fetch a separate 'profiles' table to get the admin status
            admin: false, 
          }
        };
        onLogin(userProfile);
      }

    } catch (err) {
      setError('Serverfeil. Prøv igjen senere.');
    }
  };

  return (
    <div className="form-container">
      <h2>Logg inn</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-post:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Passord:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Logg inn</button>
      </form>
      <p>Har du ikke en konto? <Link to="/register">Registrer deg</Link></p>
    </div>
  );
}

export default Login;
