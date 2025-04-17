import { Role } from "./Role";

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  phone: string;
  role: Role;
  profileDescription?: string;
  image?: string;
  domaines?: string[];
  certifications?: string[];
  niveauEtude?: string;
  experience?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  cvPdf?: string;
}