import React from 'react';
import Footer from '../components/organisms/footer/footer';
import Header from '../components/organisms/header/header';
import Nav from '../components/organisms/toolist/nav';
import TopNav from '../components/organisms/TopNav/top-nav';

const PortalLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <TopNav />
      <div className="page-container flex min-h-[88vh] flex-col items-center justify-center">
        <div className='info-container min-w-full min-h-[100px]'>
          <Header />
          <Nav />
        </div>

        <main className="flex w-full flex-1 flex-col items-center justify-center text-center px-[64px] pt-8 pb-6">
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}

export default PortalLayout