import React from 'react';
import { X, Phone, Globe, MessageSquare, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { EMERGENCY_HOTLINES } from '../data/initialData';

interface QuickHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToRuangTenang: () => void;
}

export const QuickHelpModal: React.FC<QuickHelpModalProps> = ({
  isOpen,
  onClose,
  onGoToRuangTenang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-rose-100 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-rose-50 via-amber-50 to-white border-b border-rose-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Kamu Tidak Sendirian 💛
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Bantuan selalu ada jika kamu sedang dalam situasi krisis atau kewalahan.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Immediate calming prompt */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Napasmu terasa sesak atau pikiran berputar cepat?
              </span>
              <p className="text-amber-800">
                Coba latihan pernapasan grounding selama 1-2 menit untuk menenangkan detak jantung.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onGoToRuangTenang();
              }}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl whitespace-nowrap shadow-sm transition-transform active:scale-95 shrink-0"
            >
              Latihan Pernapasan
            </button>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Kontak Bantuan & Hotline Resmi Indonesia
            </h4>
            <div className="space-y-3">
              {EMERGENCY_HOTLINES.map((hotline, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900">
                        {hotline.name}
                      </span>
                      {hotline.isFree && (
                        <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md">
                          Bebas Pulsa
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {hotline.description}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span>{hotline.availability}</span>
                      <span>·</span>
                      <span className="font-mono font-medium text-slate-700">{hotline.contact}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {hotline.contactType === 'phone' && (
                      <a
                        href={`tel:${hotline.contact.replace(/[^0-9]/g, '')}`}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Telepon</span>
                      </a>
                    )}
                    {hotline.contactType === 'whatsapp' && (
                      <a
                        href={`https://wa.me/${hotline.contact.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                    {hotline.contactType === 'website' && (
                      <a
                        href={`https://${hotline.contact}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-slate-100 rounded-2xl text-[11px] text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800">Catatan Privasi & Keamanan:</span>
            <p>
              Aplikasi Nyalara adalah prototipe pertolongan pertama emosional dan tidak menggantikan penanganan medis atau psikologis profesional. Jika kamu merasa dalam bahaya fisik segera hubungi nomor di atas atau orang dewasa terdekat yang kamu percaya.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
