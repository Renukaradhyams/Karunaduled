import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingSelectionCounter from '@/components/FloatingSelectionCounter';
import AIChatbot from '@/components/chat/AIChatbot';
import PageTransition from '@/components/animations/PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <FloatingSelectionCounter />
      <AIChatbot />
    </div>
  );
};

export default Layout;
