import Footer from '@/components/footer/footer';
import TransparentHeader from '@/components/header/transparent';
import MobileNav from '@/components/ui/mobile-nav';

export default function HomeLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <TransparentHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}
