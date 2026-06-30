'use client';

import { track } from '@vercel/analytics';

interface Props {
  href: string;
  partner: string;
  page: string;
  className?: string;
  children: React.ReactNode;
}

export function AffiliateCta({ href, partner, page, className, children }: Props) {
  if (href === '#') {
    return (
      <span
        className={`${className} opacity-50 cursor-not-allowed`}
        title="Link de afiliado em breve"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track('affiliate_click', { partner, page })}
    >
      {children}
    </a>
  );
}
