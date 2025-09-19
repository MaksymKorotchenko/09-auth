'use client';

import { login, RegisterRequest } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import css from './SignInPage.module.css';
import { isAxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await login(formValues);
      if (res) {
        router.push('/profile');
      } else {
        setUser(res);
        setError('Invalid email or password');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      } else {
        setError('Server error');
      }
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
