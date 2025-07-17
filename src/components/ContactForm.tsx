import React, { useState } from 'react';
import { sendEmail, FormData } from '../utils/emailService';

interface ContactFormProps {
  page: string;
  showExtraFields?: boolean;
  extraFields?: React.ReactNode;
}

const ContactForm: React.FC<ContactFormProps> = ({ page, showExtraFields = false, extraFields }) => {
  const [formData, setFormData] = useState<Partial<FormData>>({
    nome: '',
    apelido: '',
    telemovel: '',
    email: '',
    assunto: '',
    meio_contacto: '',
    horario: '',
    mensagem: '',
    page: page
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendEmail(formData as FormData);
      if (success) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          apelido: '',
          telemovel: '',
          email: '',
          assunto: '',
          meio_contacto: '',
          horario: '',
          mensagem: '',
          page: page
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleInputChange}
        placeholder="Nome:"
        required
        className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="text"
        name="apelido"
        value={formData.apelido}
        onChange={handleInputChange}
        placeholder="Apelido:"
        className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="tel"
        name="telemovel"
        value={formData.telemovel}
        onChange={handleInputChange}
        placeholder="Telemóvel:"
        className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email:"
        required
        className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <input
        type="text"
        name="assunto"
        value={formData.assunto}
        onChange={handleInputChange}
        placeholder="Assunto:"
        className="px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <select 
        name="meio_contacto"
        value={formData.meio_contacto}
        onChange={handleInputChange}
        className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="">Meio de Contacto:</option>
        <option value="Email">Email</option>
        <option value="Telefone">Telefone</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Telegram">Telegram</option>
        <option value="Messenger">Messenger</option>
      </select>
      <input
        type="text"
        name="horario"
        value={formData.horario}
        onChange={handleInputChange}
        placeholder="Horário:"
        className="md:col-span-2 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {showExtraFields && extraFields}
      
      <div className="md:col-span-2">
        <label className="flex items-start text-sm text-blue-100 mb-4">
          <input type="checkbox" className="mt-1 mr-2" required />
          Sim, aceito os termos e condições indicados pela Globalead Portugal.
        </label>
        <p className="text-xs text-blue-200 mb-6">
          Os dados submetidos através deste formulário de contacto serão tratados em conformidade com a legislação em vigor sobre dados pessoais e o Regulamento Geral da Proteção de Dados (UE) 2016/679.
        </p>
        
        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Mensagem enviada com sucesso! Entraremos em contacto em breve.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente.
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;