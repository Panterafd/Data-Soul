import { LucideIcon } from 'lucide-react';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image_url: string;
  specs: Record<string, string>;
  vendor_id: number;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}
