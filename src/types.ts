export type MoodType = 'sangat-baik' | 'tenang' | 'biasa' | 'lelah-cemas' | 'tertekan';

export interface MoodEntry {
  id: string;
  date: string; // ISO date string
  mood: MoodType;
  moodScore: number; // 1 to 5
  tags: string[];
  note?: string;
  createdAt: number;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  moodTag?: MoodType;
  promptUsed?: string;
  isFavorite?: boolean;
  createdAt: number;
  dateStr: string;
}

export interface AnonymousStory {
  id: string;
  authorAlias: string;
  authorAvatar: string;
  category: 'sekolah' | 'pertemanan' | 'keluarga' | 'diri-sendiri' | 'kemenangan-kecil';
  title: string;
  content: string;
  timeAgo: string;
  reactions: {
    hug: number; // Pelukan hangat
    notAlone: number; // Kamu gak sendirian
    strength: number; // Kirim energi
  };
  userReacted?: ('hug' | 'notAlone' | 'strength')[];
}

export interface DailyAffirmation {
  id: string;
  quote: string;
  reflection: string;
  category: 'keberanian' | 'ketenangan' | 'penerimaan' | 'harapan';
  bgGradient: string;
}

export interface MicroHabit {
  id: string;
  title: string;
  description: string;
  category: 'tubuh' | 'pikiran' | 'sosial' | 'istirahat';
  completed: boolean;
  streak: number;
}

export interface EducationArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaway: string;
  contentSections: { heading: string; body: string }[];
  actionPrompt: string;
}

export interface EmergencyResource {
  name: string;
  tagline: string;
  contact: string;
  contactType: 'phone' | 'whatsapp' | 'website';
  availability: string;
  isFree: boolean;
  description: string;
  urgentNotice?: string;
}

export interface PersonalContact {
  id: string;
  name: string;
  relation: string;
  phone?: string;
  note: string;
}
