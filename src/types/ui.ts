import type { LucideIcon } from 'lucide-react';

export interface SubmitButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

export interface Decoration {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  color: string;
  delay?: string;
  transform?: string;
  blur?: string;
  opacity?: string;
}

export interface SectionHeaderProps {
  badgeIcon: LucideIcon;
  badgeText: string;
  title: string;
  subtitle: string;
  titleHighlight?: string; // Word to highlight with gradient
}

export interface StatCardProps {
  icon: LucideIcon;
  number: string;
  label: string;
}
