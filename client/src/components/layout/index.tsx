import React, { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'


interface LayoutProps extends PropsWithChildren {}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
