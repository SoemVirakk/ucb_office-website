export type Page =
  | 'home'
  | 'products'
  | 'digital-banking'
  | 'branches'
  | 'promotions'
  | 'contact'
  | 'login'
  | 'design-system'
  | 'careers'
  | 'about'
  | 'rates'
  | 'online-services'
  | 'security'
  | 'search'
  | 'not-found'
  | 'news'
  | 'announcements'
  | 'cms'
  | 'maintenance'
  | 'design-review'

export const routeForPage: Record<Page, string> = {
  home: '/',
  products: '/products',
  'digital-banking': '/digital-banking',
  branches: '/branches',
  promotions: '/promotions',
  contact: '/contact',
  login: '/login',
  'design-system': '/design-system',
  careers: '/careers',
  about: '/about',
  rates: '/rates',
  'online-services': '/online-services',
  security: '/security',
  search: '/search',
  'not-found': '/not-found',
  news: '/news',
  announcements: '/announcements',
  cms: '/cms',
  maintenance: '/maintenance',
  'design-review': '/design-review',
}
