import React, { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'


interface LayoutProps extends PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Header />
      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
