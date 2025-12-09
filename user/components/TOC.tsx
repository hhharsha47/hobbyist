"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TOC() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
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

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const links = [
    { id: "getting-started-sign-in--log-in", label: "Getting Started" },
    { id: "decal-shop-guide", label: "Decal Shop Guide" },
    { id: "browse-by-categories", label: "Categories Reference" },
    { id: "shopping-cart-features", label: "Shopping Cart Features" },
    { id: "uploading-custom-designs", label: "Uploading Custom Designs" },
    { id: "checkout--payment", label: "Checkout & Payment" },
    { id: "tracking-orders", label: "Tracking Orders" },
    { id: "website-content-guide", label: "Website Content Guide" },
    { id: "about-our-media", label: "About Our Media" },
    { id: "user-account-management", label: "Account Management" },
    { id: "affiliate-program-guide", label: "Affiliate Guide" },
    { id: "newsletter--offers", label: "Newsletter" },
    { id: "blogs--resources", label: "Blogs & Resources" },
    { id: "contact-support", label: "Contact Support" },
  ];

  return (
    <nav className="space-y-1 max-h-[80vh] flex flex-col">
      <p className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide shrink-0">
        On This Page
      </p>
      <ul className="space-y-2 text-sm border-l border-gray-200 ml-1 overflow-y-auto pr-2">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`#${link.id}`}
              className={`block pl-4 py-1 -ml-px border-l-2 transition-all duration-200 ${
                activeId === link.id
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(link.id);
                if (element) {
                  const y =
                    element.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                  setActiveId(link.id);
                }
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
