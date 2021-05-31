import { ReactNode } from 'react';
import { NextPage } from 'next';

interface NavProps {
  children: ReactNode;
}

const Nav: NextPage = ({ children }) => {
  return (
    <>
      <h1>Nav</h1>
      {children}
    </>
  );
};

export default Nav;
