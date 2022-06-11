import React from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Nav from '../components/nav';

export const PortalLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="page-container flex min-h-screen flex-col items-center justify-center px-8 py-4">
      <div className='info-container min-w-full min-h-[100px] border'>
        <Header />
        <Nav />
      </div>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default PortalLayout