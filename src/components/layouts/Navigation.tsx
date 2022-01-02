import BottomNavBar from '../navbars/bottomNavBar';
import NavBar from '../navbars/NavBar';
import React from 'react';
import { useRouter } from 'next/router';

export const Navigation = ({ children }: any) => {
  const router = useRouter();

  return (
    <div className="bg-gray-50">
      {router.pathname !== '/' && <NavBar />}
      <div>{children}</div>
      <BottomNavBar />
    </div>
  );
};
