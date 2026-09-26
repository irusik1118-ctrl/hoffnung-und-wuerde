export type Language = 'ua' | 'de';

export interface ProjectItem {
  id: string;
  titleUa: string;
  titleDe: string;
  categoryUa: string;
  categoryDe: string;
  location: string;
  date: string;
  image: string;
  descriptionUa: string;
  descriptionDe: string;
  reportStats: {
    labelUa: string;
    labelDe: string;
    value: string;
  }[];
  completed: boolean;
}

export interface EventItem {
  id: string;
  titleUa: string;
  titleDe: string;
  date: string;
  time: string;
  location: string;
  categoryUa: string;
  categoryDe: string;
  descriptionUa: string;
  descriptionDe: string;
  statusUa: string;
  statusDe: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  roleUa: string;
  roleDe: string;
  typeUa: string;
  typeDe: string;
  logoPlaceholder: string;
}

export interface SponsorTier {
  id: string;
  nameUa: string;
  nameDe: string;
  badgeColor: string;
  sponsors: {
    name: string;
    noteUa?: string;
    noteDe?: string;
  }[];
}
