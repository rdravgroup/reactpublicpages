import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PrivacyModalProvider } from './context/PrivacyModalContext.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import BottomNav from './components/shared/BottomNav.jsx'
import ScrollToTop from './components/shared/ScrollToTop.jsx'
import './App.css'

const Home     = lazy(() => import('./pages/Home.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const About    = lazy(() => import('./pages/About.jsx'))
const Blog     = lazy(() => import('./pages/Blog.jsx'))
const Contact  = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Unsubscribe = lazy(() => import('./pages/Unsubscribe.jsx'))
const Privacy  = lazy(() => import('./pages/Privacy.jsx'))

function Loader() {
  return (
    <div className="page-loader">
      <div className="page-loader__spinner" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <PrivacyModalProvider>
          <ScrollToTop />
          <Navbar />
          <main className="app-main">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about"    element={<About />} />
                <Route path="/blog"     element={<Blog />} />
                <Route path="/contact"  element={<Contact />} />
                <Route path="/privacy"  element={<Privacy />} />
                <Route path="/unsubscribe" element={<Unsubscribe />} />
                <Route path="*"         element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <BottomNav />
        </PrivacyModalProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
