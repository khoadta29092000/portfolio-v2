import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import Menu from './menu';
import Header from './header';
import Footer from './footer';

// import dynamic from 'next/dynamic';

// const DynamicIframePip = dynamic(
//   () => import('@/components/games/play-game/iframe-game/iframe-pip'),
//   {
//     ssr: false,
//   },
// );
type TProps = {
  children: React.ReactNode;
  isPy?: boolean;
  bg?: boolean;
};

const DefaultLayout: FC<TProps> = ({ children, isPy = true, bg = true }) => {
  const isMd = useBreakpointValue({
    base: false,
    md: true,
  });

   const [isOpenSidebar, setIsOpenSideBar] = useState(true);

  return (
    <Flex
      w="100vw"
      h="100vh"
      position="relative"
      // bg="gray.300"
      bg="#16191f"
    >
      <Header isOpenSidebar={isOpenSidebar} />
      <Menu isOpenSidebar={isOpenSidebar} />
      <Flex
        pl={{ base: 0, md: '64px', xl: isOpenSidebar ? 246 : '64px' }}
        boxSizing="border-box"
        mt="64px"
        direction="column"
        w="full"
        position="relative"
        transition="all 0.3s ease"
      >
        <Flex
          id="layout-content"
          overflowY="scroll"
          // bg="#16191f"
          direction="column"
          flex={1}
          bg={
            bg
              ? '#16191f'
              : 'radial-gradient(at 82% 100%, rgba(21, 11, 157, 0.5) 10%, transparent 40%), radial-gradient(at 10% 50%, rgba(77, 14, 125, 0.52) 7%, transparent 70%)'
          }
        >
          <Flex
            // pl={{ base: 3, md: 10 }}

            px={{ base: 3, md: 3, xl: 10 }}
            py={{ base: isPy ? 5 : 0, md: isPy ? 5 : 0, xl: isPy ? 10 : 0 }}
          >
            {children}
          </Flex>
          <Footer bg={bg} />
        </Flex>

        <Menu isOpenSidebar={isOpenSidebar} />
      </Flex>
    </Flex>
  );
};

export default DefaultLayout;
