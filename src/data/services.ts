export interface Service {
  id: string;
  icon: string; // SVG path data for a simple icon
  titleKey: string;
  descriptionKey: string;
  slug: string;
}

export const services: Service[] = [
  {
    id: 'web',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    titleKey: 'services.web.title',
    descriptionKey: 'services.web.description',
    slug: 'desarrollo-web',
  },
  {
    id: 'mobile',
    icon: 'M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM12 18h.01',
    titleKey: 'services.mobile.title',
    descriptionKey: 'services.mobile.description',
    slug: 'apps-moviles',
  },
  {
    id: 'systems',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M4 15h16M4 11h16M6 7h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z',
    titleKey: 'services.systems.title',
    descriptionKey: 'services.systems.description',
    slug: 'sistemas-a-medida',
  },
  {
    id: 'consulting',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    titleKey: 'services.consulting.title',
    descriptionKey: 'services.consulting.description',
    slug: 'consultoria-ti',
  },
];
