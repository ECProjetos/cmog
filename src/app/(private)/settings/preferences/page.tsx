'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { updateUserPreferences } from './actions';
import { toast } from 'sonner';
import Image from 'next/image';	


export default function Page() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const userTheme = localStorage.getItem('theme') || 'light';
    setTheme(userTheme);
    document.querySelector('html')?.classList.toggle('dark', userTheme === 'dark');
  }, []);

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    document.querySelector('html')?.classList.toggle('dark', selectedTheme === 'dark');
  };

  const updateUserMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return updateUserPreferences(formData);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error, {
          description: 'Please try again later.',
        });
      } else if (data.success) {
        toast.success(data.success, {
          description: 'Your preferences have been updated successfully.',
        });
      }
    },
  });

  async function handleSubmit(formData: FormData) {
    formData.append('theme', theme);
    updateUserMutation.mutate(formData);
  }

  return (
  <div>
      <div className="flex flex-col justify-start items-start px-10">
        <h1 className="text-2xl font-semibold mb-4 justify-center items-center">Tema</h1>
        <div className="flex gap-4">
          <div
            className={`flex items-center justify-center w-24 h-24 rounded-md border-2 cursor-pointer overflow-hidden ${
              theme === 'light' ? 'border-primary' : 'border-gray-300'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <Image
              src= '/claro.png'
              alt="Tema Claro"
              className="object-cover w-full h-full"
              width={100}
              height={100}
            />
          </div>

          <div
            className={`flex items-center justify-center w-24 h-24 rounded-md border-2 cursor-pointer overflow-hidden ${
              theme === 'dark' ? 'border-primary' : 'border-gray-300'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <Image
              src="/escuro.png"
              alt="Tema Escuro"
              className="object-cover w-full h-full"
              width={100}
              height={100}
            />
          </div>
        </div>
    <button
          className="mt-4 px-4 py-2 left-10 bg-primary text-white rounded-md flex justify-center items-center"
          onClick={() => {
            const formData = new FormData();
            handleSubmit(formData);
          }}
        >
          Salvar preferencias
        </button>
  </div>
</div>

  );
}
