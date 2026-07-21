import React from 'react';

interface PremiumBannerProps {
  /**
   * The destination URL for the action button.
   * Defaults to a secure placeholder. Ensure you use a verified, safe URL.
   */
  actionUrl?: string;
}

export const PremiumBanner: React.FC<PremiumBannerProps> = ({ 
  actionUrl = "https://example.com/premium-companion-tools" 
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
      {/* Background decorative glows to provide a premium, modern dashboard aesthetic */}
      <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section: Copy & Badging */}
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-xs font-semibold tracking-wider text-purple-400 uppercase">
              Premium Companion Feature
            </span>
            <span className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-800/50 px-2 py-0.5 text-xs font-medium text-zinc-400">
              Diagnostic Expansion Pack
            </span>
          </div>
          
          <h2 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
            Unlock Advanced Diagnostics
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            Scan deep Windows error databases, check comprehensive hardware upgrade paths, and download optimization scripts to keep your system performing efficiently.
          </p>
        </div>

        {/* Right Section: Prominent Action Button */}
        <div className="shrink-0">
          <a
            href={actionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-zinc-50 shadow-lg shadow-indigo-600/15 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/30 hover:scale-[1.01] active:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            <span>Access Premium Companion Tools</span>
            {/* Outbound link icon */}
            <svg
              className="h-4 w-4 shrink-0 opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
