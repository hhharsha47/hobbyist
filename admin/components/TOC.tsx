"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TOC() {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<
    { id: string; label: string; level: number }[]
  >([]);

  useEffect(() => {
    // Dynamic TOC generation
    const elements = Array.from(document.querySelectorAll("h2, h3, h4"));
    const tocItems = elements
      .map((elem) => ({
        id: elem.id,
        label: elem.textContent || "",
        level: parseInt(elem.tagName.substring(1)),
      }))
      .filter((item) => item.id);

    setHeadings(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -66% 0%",
        threshold: 0,
      }
    );

    elements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="space-y-1 max-h-[80vh] flex flex-col">
      <p className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide shrink-0">
        On This Page
      </p>
      <ul className="space-y-2 text-sm border-l border-gray-200 ml-1 overflow-y-auto pr-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link
              href={`#${heading.id}`}
              className={`block py-1 -ml-px border-l-2 transition-all duration-200 ${
                heading.level === 3
                  ? "pl-8 text-xs"
                  : heading.level === 4
                  ? "pl-12 text-xs text-gray-400"
                  : "pl-4 text-sm"
              } ${
                activeId === heading.id
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  const y =
                    element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  setActiveId(heading.id);
                }
              }}
            >
              {heading.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
