import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Menu from './menu';
import Header from './header';
import Footer from './footer';
import { usePortfolioIsLight } from '@/redux/home/selectors';
import BodyComponent from './body';

type TProps = {
  isPy?: boolean;
  bg?: boolean;
};

export const menuItemHeader = [
  { id: 1, title: 'about', href: '', bg: 'red' },
  { id: 2, title: 'experiences', href: '', bg: 'blue' },
  { id: 3, title: 'project', href: '', bg: 'yellow' },
  { id: 4, title: 'skills', href: '', bg: 'violet' },
  { id: 5, title: 'certificate', href: '', bg: 'pink' },
  { id: 6, title: 'education', href: '', bg: 'orange' },
  { id: 7, title: 'contract', href: '', bg: 'green' },
];

const DefaultLayout: FC<TProps> = ({ isPy = true, bg = true }) => {
  const [activeTab, setActiveTab] = useState(menuItemHeader[0].id);

  const isMd = useBreakpointValue({
    base: false,
    md: true,
  });

  const [isOpenSidebar, setIsOpenSideBar] = useState(false);
  const isLight = usePortfolioIsLight();

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const experiencesSection = document.getElementById('experiences');

      if (aboutSection && experiencesSection) {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition < aboutSection.offsetTop) {
          // Scroll to About section
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        } else if (
          currentScrollPosition >= aboutSection.offsetTop &&
          currentScrollPosition < experiencesSection.offsetTop
        ) {
          // Scroll to Experiences section
          experiencesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Flex w="100vw" h="100vh" position="relative" bg="#16191f">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenSidebar={isOpenSidebar}
      />
      <Menu activeTab={activeTab} setActiveTab={setActiveTab} />

      <Flex
        w="auto"
        direction="column"
        flex={1}
        bg={isLight ? '#f0f2f5' : '#26282d'}
        transition="all 0.3s ease"
      >
        <Flex w="auto" flexDirection="column">
          <BodyComponent activeTab={activeTab} setActiveTab={setActiveTab} />
        </Flex>
        <Footer bg={bg} />
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
