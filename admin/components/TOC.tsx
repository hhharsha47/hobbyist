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
    { id: "dashboard", label: "Dashboard" },
    { id: "track-order", label: "Track Order" },
    { id: "products", label: "Products" },
    { id: "categories", label: "Categories" },
    { id: "orders", label: "Orders" },
    { id: "shipments", label: "Shipments" },
    { id: "manual-shipping", label: "Manual Shipping" },
    { id: "customers", label: "Customers" },
    { id: "payments--transactions", label: "Payments & Transactions" },
    { id: "analytics", label: "Analytics" },
    { id: "blogs", label: "Blogs" },
    { id: "custom-decals", label: "Custom Decals" },
    { id: "coupons", label: "Coupons" },
    { id: "loyalty-program", label: "Loyalty Program" },
    { id: "banners", label: "Banners" },
    { id: "popups", label: "Popups" },
    { id: "contact-us", label: "Contact Us" },
    { id: "newsletter-subscribers", label: "Newsletter Subscribers" },
    { id: "custom-orders", label: "Custom Orders" },
    { id: "affiliates", label: "Affiliates" },
    { id: "admin-users", label: "Admin Users" },
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
