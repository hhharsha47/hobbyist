"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SearchIndexItem } from "@/lib/search";

export default function SearchDialog({
  index,
  isOpen,
  onClose,
}: {
  index: SearchIndexItem[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexItem[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // Since we are controlling open state from parent, we can't toggle here easily
        // without a callback. But usually this component is mounted conditionally or
        // header handles the shortcut.
        // For now, let's assume the header handles the shortcut to OPEN,
        // and we handle closing on Escape.
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = index.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery)
      );
    });

    setResults(filtered.slice(0, 10)); // Limit to top 10
  }, [query, index]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl transform rounded-xl bg-white shadow-2xl transition-all p-0 overflow-hidden ring-1 ring-black/5">
        <div className="flex items-center border-b border-gray-100 px-4 py-3">
          <SearchIcon className="h-5 w-5 text-gray-400 mr-3" />
          <input
            type="text"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-400"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto py-2">
            <h4 className="mb-2 px-4 text-xs font-semibold uppercase text-gray-500">
              Results
            </h4>
            <ul className="space-y-1">
              {results.map((result, i) => (
                <li key={i}>
                  <Link
                    href={`/docs/${result.slug}#${result.id}`}
                    className="flex flex-col gap-1 px-4 py-3 hover:bg-gray-50 transition-colors group"
                    onClick={onClose}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-600 group-hover:text-blue-700">
                        {result.title}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {result.content}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {query && results.length === 0 && (
          <div className="px-4 py-12 text-center text-gray-500">
            <p>No results found for "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="px-4 py-12 text-center text-gray-400 text-sm">
            Type to search...
          </div>
        )}

        <div className="border-t border-gray-50 bg-gray-50 px-4 py-2 text-xs text-gray-400 flex justify-end">
          <span className="flex items-center gap-1">
            <kbd className="font-sans px-1.5 py-0.5 rounded border border-gray-200 bg-white">
              Esc
            </kbd>{" "}
            to close
          </span>
        </div>
      </div>
    </div>
  );
}
