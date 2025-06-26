'use client';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function PopupNewsletter() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Show once per session
  useEffect(() => {
    if (!sessionStorage.getItem('jfc_popup')) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('jfc_popup', 'shown');
        setOpen(true);
      }, 3500); // 3.5 s delay
      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit = async (data: any) => {
    await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify(data) });
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="mx-auto w-full max-w-lg rounded-lg bg-light p-8 shadow-xl">
          <Dialog.Title className="text-2xl font-bold text-dark mb-2">
            Faça parte dos meus planos!
          </Dialog.Title>
          <p className="mb-6">
            Tô feliz que chegou até aqui. Se cadastra e eu te mando conteúdos exclusivos.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input {...register('name')} placeholder="Nome" className="input" />
            <input {...register('email', { required: true })} placeholder="Email *" className="input" />
            <input {...register('phone')} placeholder="Telefone" className="input" />
            <input {...register('instagram')} placeholder="Instagram" className="input" />
            <button type="submit" className="w-full bg-primary text-dark font-semibold py-3 rounded-md">
              Enviar
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
