'use client';

import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function EditProfile() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    getMe().then(user => {
      setUserName(user.username ?? '');
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await updateMe({ username: userName });
      setUserName(user.username);
      setUser(user);
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user?.avatar ??
            'https://ac.goit.global/fullstack/react/default-avatar.jpg'
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {userName}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={userName}
              onChange={handleChange}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
