import Header from "./Header";
import TOC from "./TOC";
import { getSearchIndex } from "@/lib/search";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchIndex = getSearchIndex();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header index={searchIndex} />
      <div className="container mx-auto flex max-w-7xl items-start gap-10 px-4 py-10">
        {/* Sidebar Navigation (Left) - Could be a list of pages if we had more */}
        <aside className="hidden w-64 shrink-0 lg:block sticky top-24">
          <div className="space-y-4">
            <h3 className="px-3 font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">
              Documentation
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="/docs/admin"
                  className="block rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors"
                >
                  Admin Guide
                </a>
              </li>
              {/* Add more links here later */}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          {children}
        </main>

        {/* Table of Contents (Right) */}
        <aside className="hidden w-64 shrink-0 xl:block sticky top-24">
          <TOC />
        </aside>
      </div>
    </div>
  );
}
