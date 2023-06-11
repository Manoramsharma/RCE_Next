import React, { useEffect, useState } from "react"
import { withRouter } from "next/router"
import { WithRouterProps } from "next/dist/client/with-router"

import Navbar from "@/layout/Navbar"
import Footer from "@/layout/Footer"

interface IProps {
  children: React.ReactNode
}

export default function Layout({ children }: IProps): JSX.Element {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="hidden sm:block">{children}</div>
      <div className="w-full text-center sm:hidden">Not For This Resolution</div>
      <Footer />
    </div>
  )
}

// export default withRouter(Layout)
