"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface TOCItem {
  id: string;
  label: string;
  level: number;
  children: TOCItem[];
}

export default function TOC() {
  const [activeId, setActiveId] = useState<string>("");
  const [tocTree, setTocTree] = useState<TOCItem[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Function to toggle expansion
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    // Dynamic TOC generation with tree structure
    const elements = Array.from(document.querySelectorAll("h2, h3, h4"));

    const items = elements
      .map((elem) => ({
        id: elem.id,
        label: elem.textContent || "",
        level: parseInt(elem.tagName.substring(1)),
        children: [] as TOCItem[],
      }))
      .filter((item) => item.id);

    const buildTree = (flatItems: typeof items) => {
      const roots: TOCItem[] = [];
      const stack: TOCItem[] = [];

      flatItems.forEach((item) => {
        // Pop elements from stack that are deeper or same level (shouldn't be parent)
        while (
          stack.length > 0 &&
          stack[stack.length - 1].level >= item.level
        ) {
          stack.pop();
        }

        if (stack.length === 0) {
          roots.push(item);
        } else {
          stack[stack.length - 1].children.push(item);
        }

        stack.push(item);
      });

      return roots;
    };

    const tree = buildTree(items);
    setTocTree(tree);

    // Initially expand all items that have children
    const initialExpanded = new Set<string>();
    items.forEach((item) => {
      if (item.children.length > 0) {
        initialExpanded.add(item.id);
      }
    });
    setExpandedIds(initialExpanded);

    // Scroll Spy Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Optionally auto-expand parent of active item?
            // staying consistent with manual toggle for now.
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

  // Recursive Render Component
  const renderTree = (nodes: TOCItem[]) => {
    return (
      <ul className="space-y-1">
        {nodes.map((node) => {
          const isActive = activeId === node.id;
          const hasChildren = node.children.length > 0;
          const isExpanded = expandedIds.has(node.id);

          return (
            <li key={node.id} className="relative">
              <div
                className={`flex items-center group py-1 border-l-2 transition-all duration-200 ${
                  node.level === 3 ? "ml-3" : node.level === 4 ? "ml-6" : ""
                } ${
                  isActive
                    ? "border-blue-600"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                {/* Expand Toggle */}
                {hasChildren && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(node.id);
                    }}
                    className="p-0.5 mr-1 text-gray-400 hover:text-gray-700 rounded-sm focus:outline-none"
                    aria-label={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                )}

                {/* Spacer if no children, to align text */}
                {!hasChildren && node.level < 4 && (
                  <span className="w-5"></span>
                )}

                <Link
                  href={`#${node.id}`}
                  className={`block text-sm transition-colors duration-200 ${
                    node.level === 4 ? "text-xs pl-5" : ""
                  } ${
                    isActive
                      ? "text-blue-600 font-medium"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll logic
                    const element = document.getElementById(node.id);
                    if (element) {
                      const y =
                        element.getBoundingClientRect().top +
                        window.scrollY -
                        100;
                      window.scrollTo({ top: y, behavior: "smooth" });
                      setActiveId(node.id);
                    }
                  }}
                >
                  {node.label}
                </Link>
              </div>

              {/* Render Children if Expanded */}
              {hasChildren && isExpanded && (
                <div className="ml-2 border-l border-gray-100 pl-2">
                  {renderTree(node.children)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="max-h-[80vh] flex flex-col overflow-y-auto pr-2 pb-10">
      <p className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide shrink-0">
        On This Page
      </p>
      {renderTree(tocTree)}
    </nav>
  );
}
