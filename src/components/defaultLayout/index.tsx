import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import Menu from './menu';
import Header from './header';
import Footer from './footer';
import { usePortfolioIsLight } from '@/redux/home/selectors';
import BodyComponent from './body';
import Sidebar from './sidebar';

type TProps = {
  isPy?: boolean;
  bg?: boolean;
};

export const menuItemHeader = [
  { id: 1, title: 'about', href: '#about', bg: 'red' },
  { id: 2, title: 'experiences', href: '#experiences', bg: 'blue' },
  { id: 3, title: 'project', href: '#experiences', bg: 'yellow' },
  { id: 4, title: 'skills', href: '#skills', bg: 'violet' },
  { id: 5, title: 'certificate', href: '#certificate', bg: 'pink' },
  { id: 6, title: 'education', href: '#education', bg: 'orange' },
  { id: 7, title: 'contract', href: '#contract', bg: 'green' },
];

const DefaultLayout: FC<TProps> = ({ isPy = true, bg = true }) => {
  const isMd = useBreakpointValue({
    base: false,
    md: true,
  });
  const [isOpenSidebar, setIsOpenSideBar] = useState(false);
  const isLight = usePortfolioIsLight();
  const [activeTab, setActiveTab] = useState(menuItemHeader[0].id);

  return (
    <Flex
      w="100vw"
      h="100vh"
      position="relative"
      overflowY={'hidden'}
      bg="#16191f"
    >
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenSidebar={isOpenSidebar}
      />
      <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Flex
        overflowY="scroll"
        w="auto"
        direction="column"
        flex={1}
        bg={isLight ? '#f0f2f5' : '#26282d'}
        transition="all 0.3s ease"
      >
        <BodyComponent activeTab={activeTab} setActiveTab={setActiveTab} />
        <Footer bg={bg} />
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
