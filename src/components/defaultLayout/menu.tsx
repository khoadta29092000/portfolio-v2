import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';
import useTranslation from 'next-translate/useTranslation';
import { motion } from 'framer-motion';
import { IoPerson } from 'react-icons/io5';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { PiNewspaperFill } from 'react-icons/pi';
import { TbCategory2 } from 'react-icons/tb';

const menuItems = [
  {
    id: 1,
    isLink: false,
    title: 'about',
    src: <IoPerson size={18} />,
  },
  { id: 2, isLink: false, title: 'experiences', src: <MdWork size={18} /> },
  {
    id: 3,
    isLink: false,
    title: 'project',
    src: <PiNewspaperFill size={18} />,
  },
  {
    id: 4,
    isLink: false,
    title: 'skills',
    src: <TbCategory2 size={18} />,
  },
  {
    id: 7,
    isLink: false,
    title: 'contract',
    src: <FaPhoneAlt size={18} />,
  },
];

type TProps = {
  activeTab: number;
  setActiveTab: (value: number) => void;
};

const Menu: React.FC<TProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();
  const { t } = useTranslation('common');
  return (
    <Flex
      borderTop={isLight ? '1px solid #e0e0e0' : '1px solid #3e3e3e'}
      boxShadow={
        isLight
          ? '0px -4px 12px rgba(0, 0, 0, 0.1)'
          : '0px -4px 12px rgba(0, 0, 0, 0.1)'
      }
      h="48px"
      bottom={0}
      bg={backgroundColor}
      left={0}
      position="fixed"
      w="100vw"
      padding="0 8px"
      zIndex="99"
      boxSizing="border-box"
      display={{ base: 'flex', md: 'none' }}
      justifyContent="center"
      alignItems="center"
    >
      {menuItems.map((item, index) => (
        <Flex
          key={index}
          onClick={() => setActiveTab(item.id)}
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
          textColor={
            activeTab == item.id ? '#ce3df3' : isLight ? 'black' : 'white'
          }
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          position="relative"
        >
          {activeTab == item.id && (
            <motion.div
              layoutId="active-pill"
              style={{
                borderBottom: '2px solid #ce3df3',
                top: '0px',
                position: 'absolute',
                width: '50%',
                radius: '8px',
              }}
              transition={{ duration: 0.5 }}
            ></motion.div>
          )}

          <Flex>{item.src}</Flex>
          <Text fontSize="10px" fontWeight="500">
            {t(item.title)}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Menu;
