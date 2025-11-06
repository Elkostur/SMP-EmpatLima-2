export interface User {
  uid: string;
  email: string | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
}

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  nuptk?: string;
  address?: string;
  religion?: string;
  email?: string;
  phone?: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface AboutPageContent {
  vision: string;
  mission: string;
  coreValues: { title: string; description: string }[];
  principalWelcome: {
    text: string;
    imageUrl: string;
    name: string;
    title: string;
  };
}

export interface HeroImage {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface Statistic {
    id: string;
    value: string;
    label: string;
}

export interface Facility {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export interface Registration {
    id: string;
    fullName: string;
    birthDate: string;
    previousSchool: string;
    parentName: string;
    phone: string;
    email: string;
    createdAt: Date;
    documentUrl?: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string: "YYYY-MM-DD"
  imageUrl?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapImageUrl: string;
}
