import { useState } from 'react';
import type { FormEvent } from 'react';

interface Props {
  translations: {
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
  lang: string;
}

export default function ContactForm({ translations, lang }: Props) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="form-field">
        <label htmlFor="contact-name">{translations.name}</label>
        <input
          id="contact-name"
          type="text"
          required
          maxLength={200}
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">{translations.email}</label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">{translations.message}</label>
        <textarea
          id="contact-message"
          required
          maxLength={5000}
          rows={5}
          value={formData.message}
          onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
        />
      </div>

      <button type="submit" className="form-submit" disabled={status === 'loading'}>
        {status === 'loading' ? '...' : translations.send}
      </button>

      {status === 'success' && (
        <p className="form-success">{translations.success}</p>
      )}
      {status === 'error' && (
        <p className="form-error">{translations.error}</p>
      )}
    </form>
  );
}
