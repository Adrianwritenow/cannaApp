import React, { SyntheticEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { BottomNavRoutes, Route } from '@/helpers/routes';
import { UserCircleIcon } from '@heroicons/react/outline';
import { useSignout } from '@/hooks/useSignout';

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState('');
  const { data: session } = useSession();
  const [routes, setRoutes] = useState<Array<Route>>([]);
  const router = useRouter();
  const logout = useSignout();

  useEffect(() => {
    let sessionRoutes = [];
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
  }, [session, router]);

  return (
    <>
      {router.pathname !== '/map' ? (
        <div className="fixed w-full bg-white px-2 py-3 pb-6 bottom-0 grid grid-flow-col border-t border-gray-200 z-10 print:hidden">
          {routes.map((route, i) => {
            return (
              <Link
                href={{
                  pathname: route.href ? (route.href as string) : '/public',
                }}
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
          {/** @TODO: This can be removed once we have a legit log out link */}
          {session?.accessToken && (
            <a
              href="#"
              className={
                'text-gray-500 flex flex-wrap items-center justify-center'
              }
              onClick={(e: SyntheticEvent): void => {
                e.preventDefault();
                logout();
              }}
            >
              <UserCircleIcon className="w-6 h-6 stroke-1" />
              <span className="text-xs w-full text-center">Sign out</span>
            </a>
          )}
        </div>
      ) : null}
    </>
  );
}
