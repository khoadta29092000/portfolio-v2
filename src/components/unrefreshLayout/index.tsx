import { Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';

interface MyContextType {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a Layout');
  }
  return context;
};

interface LayoutProps {
  children: ReactNode;
}

const UnrefreshLayout: React.FC<LayoutProps> = ({ children }) => {
  const [state, setState] = useState('Initial State');
  const [loadingPage, setLoadingPage] = useState(true);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(false);
    }, 1500);
  }, []);

  return (
    <MyContext.Provider value={{ state, setState }}>
      <div id="game-top-container">
        <PersistentComponent />
        {children}
      </div>

      {loadingPage && (
        <Flex
          position="fixed"
          bg="#16191F"
          w="100vw"
          h="100vh"
          top={-1}
          left={0}
          zIndex={9999}
          alignItems="center"
          justifyContent="center"
          padding={{ base: '0px 16px', md: '0px' }}
          flexDirection={'column'}
          ml="0"
          cursor="pointer"
          textAlign={'center'}
          mt={1}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* <Image
              alt="logo-sidebar"
              src="/images/Footer-Logo.svg"
              width={200}
              height={37}
              style={{
                width: '200px',
                height: '37px',
                margin: 'auto',
              }}
            /> */}
            <Text
              color={'white'}
              fontSize={{ base: '52px', md: '32px' }}
              fontWeight="700"
              fontFamily="ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
            >
              Do Tran Anh Khoa
            </Text>
            <Text
              fontFamily=" Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
              fontSize={{ base: '50px', md: '20px' }}
              color={'white'}
            >
              Front-End Developer
            </Text>
          </motion.div>
        </Flex>
      )}
    </MyContext.Provider>
  );
};

const PersistentComponent = () => {
  return <div></div>;
};

export default UnrefreshLayout;
