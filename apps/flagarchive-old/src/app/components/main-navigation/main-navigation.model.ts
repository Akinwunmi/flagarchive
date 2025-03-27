export interface BreadcrumbItem {
  active?: boolean;
  flag?: { alt: string; src: string };
  icon?: string;
  label: string;
  link?: string[];
  options?: BreadcrumbItem[];
  value?: string;
}
