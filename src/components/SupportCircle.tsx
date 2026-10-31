import React, { useState } from 'react';
import {
  Users,
  Shield,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Plus,
  Trash2,
  HeartHandshake,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { PersonalContact } from '../types';
import {
  CHAT_TEMPLATES,
  EMERGENCY_HOTLINES,
  INITIAL_CONTACTS,
} from '../data/initialData';
import { soundEngine } from '../utils/audio';

export const SupportCircle: React.FC = () => {
  const [contacts, setContacts] = useState<PersonalContact[]>(() => {
    const saved = localStorage.getItem('nyalara_trusted_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newNote, setNewNote] = useState('');
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRelation.trim()) return;

    soundEngine.playChime(540);
    const newContact: PersonalContact = {
      id: 'contact-' + Date.now(),
      name: newName.trim(),
      relation: newRelation.trim(),
      phone: newPhone.trim() || undefined,
      note: newNote.trim(),
    };

    const updated = [...contacts, newContact];
    setContacts(updated);
    localStorage.setItem('nyalara_trusted_contacts', JSON.stringify(updated));

    setNewName('');
    setNewRelation('');
    setNewPhone('');
    setNewNote('');
    setIsAddingContact(false);
  };

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem('nyalara_trusted_contacts', JSON.stringify(updated));
  };

  const handleCopyChatTemplate = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateId(id);
    setTimeout(() => setCopiedTemplateId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-rose-50 via-amber-50/40 to-white p-6 rounded-3xl border border-rose-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
              7
            </span>
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
              Ideasi Crazy 8 • Support Circle
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Lingkaran Orang Terpercaya & Bantuan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Menghubungkanmu ke orang-orang yang peduli saat kamu siap untuk berbicara.
          </p>
        </div>

        <button
          onClick={() => setIsAddingContact(true)}
          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-sm shadow-rose-600/20 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Orang Terpercaya</span>
        </button>
      </div>

      {/* Add Contact Modal */}
      {isAddingContact && (
        <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-md space-y-4 animate-in fade-in">
          <h3 className="font-bold text-sm text-slate-900">
            Tambah Kontak Terpercaya ke Lingkaranmu
          </h3>
          <p className="text-xs text-slate-500">
            Catatan ini hanya disimpan di perambanmu sendiri dan tidak dibagikan ke siapapun.
          </p>

          <form onSubmit={handleAddContact} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Panggilan:
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Misal: Kak Sarah"
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Hubungan:
                </label>
                <input
                  type="text"
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  placeholder="Misal: Sahabat / Guru BK / Kakak"
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nomor Kontak (WhatsApp / Telepon):
                </label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="0812xxxx"
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Catatan Pribadi:
                </label>
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Misal: Enak diajak ngobrol sore hari"
                  className="w-full p-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingContact(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-sm"
              >
                Simpan Kontak
              </button>
            </div>
          </form>
        </div>
      )}

      {/* My Circle Cards */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-rose-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Orang Terpercayamu ({contacts.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Tersimpan lokal di HP
          </span>
        </div>

        {contacts.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-4 text-center">
            Belum ada kontak terdaftar. Tambahkan orang terdekat yang membuatmu merasa aman saat bercerita.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {contact.name}
                    </span>
                    <span className="text-[10px] font-medium bg-rose-50 border border-rose-200 text-rose-800 px-2 py-0.5 rounded-md">
                      {contact.relation}
                    </span>
                  </div>
                  {contact.note && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "{contact.note}"
                    </p>
                  )}
                  {contact.phone && (
                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Chat WA</span>
                      </a>
                      <a
                        href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                        className="text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Telepon</span>
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  title="Hapus Kontak"
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template Chat Curhat Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            Template Chat: Ketika Bingung Mau Mulai Cerita dari Mana
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Banyak remaja ragu memulai cerita karena takut canggung atau takut membebani. Kamu bisa salin pesan ini langsung ke WhatsApp:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CHAT_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  Untuk: {tmpl.target}
                </span>
                <h4 className="text-xs font-bold text-slate-900">
                  {tmpl.title}
                </h4>
                <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                  "{tmpl.body}"
                </p>
              </div>

              <button
                onClick={() => handleCopyChatTemplate(tmpl.id, tmpl.body)}
                className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                {copiedTemplateId === tmpl.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Pesan Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Salin Pesan Chat</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Official Directory */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-600" />
            Layanan Bantuan Profesional & Krisis Nasional
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Nomor-nomor terverifikasi jika kamu butuh bantuan dari psikolog atau konselor resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EMERGENCY_HOTLINES.map((hotline, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    {hotline.name}
                  </span>
                  {hotline.isFree && (
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md">
                      Bebas Pulsa
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {hotline.description}
                </p>
                <div className="text-[11px] text-slate-500 mt-1">
                  Jam Layanan: {hotline.availability}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-800">
                  {hotline.contact}
                </span>
                {hotline.contactType === 'phone' && (
                  <a
                    href={`tel:${hotline.contact.replace(/[^0-9]/g, '')}`}
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Telepon
                  </a>
                )}
                {hotline.contactType === 'whatsapp' && (
                  <a
                    href={`https://wa.me/${hotline.contact.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Chat WA
                  </a>
                )}
                {hotline.contactType === 'website' && (
                  <a
                    href={`https://${hotline.contact}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition-colors flex items-center gap-1"
                  >
                    <span>Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
