import React from 'react';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import Nav from '../components/toolist/nav/nav';
import TopNav from '../components/top-nav';

const PortalLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <TopNav />
      <div className="page-container flex min-h-[88vh] flex-col items-center justify-center">
        <div className='info-container min-w-full min-h-[100px] pb-8'>
          <Header />
          <Nav />
        </div>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center px-[64px]">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}

export default PortalLayout