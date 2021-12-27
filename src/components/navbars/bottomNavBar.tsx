import { BottomNavRoutes, Route } from '../../helpers/routes';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState('');
  const { data: session } = useSession();
  const [routes, setRoutes] = useState<Array<Route>>([]);
  let sessionRoutes = [];

  useEffect(() => {
    if (!session?.accessToken) {
      sessionRoutes = BottomNavRoutes.filter(function (obj) {
        return obj.id !== 'user' && obj.id !== 'stash';
      });
      setRoutes(sessionRoutes);
    } else {
      sessionRoutes = BottomNavRoutes.filter(function (obj) {
        return obj.id !== 'login';
      });
      setRoutes(sessionRoutes);
    }
  }, [session]);

  return (
    <div className="fixed w-full bg-white px-2 py-3 pb-6 bottom-0 grid grid-flow-col border-t border-gray-200 z-10">
      {routes.map((route, i) => {
        return (
          <Link
            href={{ pathname: route.href ? (route.href as string) : '/public' }}
            key={i}
          >
            <a onClick={() => setActiveTab(route.id ? route.id : `${i}`)}>
              <div
                className={`${
                  activeTab === route.id ? 'text-green' : 'text-gray-500'
                } flex  flex-wrap items-center justify-center`}
              >
                {route.icon}
                <span className="text-xs w-full text-center">
                  {route.label}
                </span>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
