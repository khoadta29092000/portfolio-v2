import { Flex, Text } from '@chakra-ui/react';
import { IoIosMenu } from 'react-icons/io';
import { TbHome } from 'react-icons/tb';
import { IoGiftOutline } from 'react-icons/io5';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';
import useTranslation from 'next-translate/useTranslation';

const menuItems = [
  {
    id: 1,
    isLink: false,
    title: 'about',
    src: <IoIosMenu size={18} />,
  },
  { id: 2, isLink: false, title: 'experiences', src: <TbHome size={18} /> },
  {
    id: 3,
    isLink: false,
    title: 'project',
    src: <IoGiftOutline size={18} />,
  },
  {
    id: 4,
    isLink: false,
    title: 'skills',
    src: <IoGiftOutline size={18} />,
  },
  {
    id: 7,
    isLink: false,
    title: 'contract',
    src: <FiLogIn size={18} />,
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
      h="40px"
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
        >
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
