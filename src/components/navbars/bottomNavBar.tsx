import React, { useState } from "react";

import { BottomNavRoutes } from "../../helpers/routes";
import Link from "next/link";

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="fixed w-full bg-white p-2 bottom-0 grid grid-cols-5">
      {BottomNavRoutes.map((element, i) => {
        return (
          <Link href={element.href} key={i}>
            <a onClick={() => setActiveTab(element.id)}>
              <div
                className={`${
                  activeTab === element.id ? "text-green" : "text-gray-400"
                } flex  flex-wrap items-center justify-center`}
              >
                {element.icon}
                <span className="text-xs font-bold	w-full text-center">
                  {element.label}
                </span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
