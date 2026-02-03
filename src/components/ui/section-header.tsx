// ./ui/section-header.tsx
import React from "react";

export interface SectionHeaderProps {
  id?: string; // <-- added this line
  overline: string;
  title: string;
  description: string;
  // ... other props if any
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ id, overline, title, description }) => (
  <header id={id} className="mb-12">
    <p className="text-sm uppercase tracking-wider text-muted-foreground">{overline}</p>
    <h2 className="text-3xl font-bold mt-1">{title}</h2>
    <p className="mt-2 text-muted-foreground max-w-prose">{description}</p>
  </header>
);
