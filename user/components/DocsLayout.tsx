import Header from "./Header";
import TOC from "./TOC";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto flex max-w-7xl items-start gap-10 px-4 py-10">
        {/* Sidebar Navigation (Left) - Could be a list of pages if we had more */}
        <aside className="hidden w-64 shrink-0 lg:block sticky top-24">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Documentation</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="/docs/user"
                  className="block rounded-md bg-blue-50 px-3 py-2 text-blue-600 font-medium"
                >
                  User Guide
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
