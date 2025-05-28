import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-10">
      <h1 className="text-3xl font-serif text-white">{title}</h1>
      <p className="text-sm mt-2 text-white opacity-80">{description}</p>
    </header>
  );
}