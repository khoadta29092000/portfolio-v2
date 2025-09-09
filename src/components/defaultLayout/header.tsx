import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import { PiSunLight } from 'react-icons/pi';
import { MdOutlineDarkMode } from 'react-icons/md';
import Cookies from 'js-cookie';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';
import { useDispatch } from 'react-redux';
import {
  setPortfolioBackgroundColor,
  setPortfolioIsLight,
} from '@/redux/home/slice';
import { menuItemHeader } from '.';
import { motion } from 'framer-motion';
import MenuChangeLanguage from '../menuLanguage';
import { EThankYouHeaderComponent } from '@/utils/type';

type TProps = {
  activeTab: number;
  setActiveTab: (value: number) => void;
  handleScrollToPanel: (index: number) => void;
};

export enum ECountry {
  VN = 'vn',
  EN = 'en',
}

export const itemFlag = [
  {
    title: 'English',
    alt: 'Flag-America',
    src: '/icons/flagAmerica.svg',
    key: 'en',
    isActive: true,
  },
  {
    title: 'Vietnamese',
    alt: 'Flag-Vietnamese',
    src: '/icons/flagVietnamese.svg',
    key: 'vn',
    isActive: false,
  },
];

const Header: React.FC<TProps> = ({
  activeTab,
  setActiveTab,
  handleScrollToPanel,
}) => {
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { isOpen, onToggle, onClose } = useDisclosure();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [underline, setUnderline] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const handleSelectLanguage = async (key: string) => {
    onClose();
    await setLanguage(key);
  };

  const handleChangeLight = () => {
    const newIsLight = !isLight;
    dispatch(setPortfolioIsLight(newIsLight));
    dispatch(
      setPortfolioBackgroundColor(newIsLight == true ? 'white' : '#1e2025'),
    );
    Cookies.set('isLight', String(newIsLight), { expires: 365 });
  };

  useEffect(() => {
    const initialIsLight = Cookies.get('isLight') === 'true';
    dispatch(setPortfolioIsLight(initialIsLight));
    dispatch(
      setPortfolioBackgroundColor(initialIsLight == true ? 'white' : '#1e2025'),
    );
  }, []);

  useLayoutEffect(() => {
    const updateUnderline = () => {
      if (!menuRef.current) return;
      const idx = menuItemHeader.findIndex((it) => it.id === activeTab);
      const el = itemRefs.current[idx];
      if (!el) {
        setUnderline((s) => ({ ...s, visible: false }));
        return;
      }
      const menuRect = menuRef.current.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setUnderline({
        left: rect.left - menuRect.left,
        width: rect.width,
        visible: true,
      });
    };
    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    return () => window.removeEventListener('resize', updateUnderline);
  }, [activeTab, isLight, t]);

  return (
    <Flex
      display={activeTab >= EThankYouHeaderComponent ? 'none' : 'flex'}
      transition="all 0.3s ease"
      pl={{ base: 0, md: '64px' }}
      alignItems="center"
      position={'fixed'}
      h="64px"
      w="100%"
      bg={backgroundColor}
      zIndex={10}
      justifyContent={'space-between'}
      borderBottom={isLight ? '1px solid #e0e0e0' : '1px solid #3e3e3e'}
      boxShadow={
        isLight
          ? '0px 4px 12px rgba(0, 0, 0, 0.1)'
          : '0px 4px 12px rgba(0, 0, 0, 0.1)'
      }
    >
      <Flex
        padding={{ base: '0px 16px', md: '0px' }}
        flexDirection={'column'}
        ml="0"
        cursor="pointer"
        textAlign={'left'}
        mt={1}
      >
        <Text
          color={isLight ? 'black' : 'white'}
          fontSize={{ base: '16px', md: '20px' }}
          fontWeight="700"
          fontFamily="ui-serif, Georgia, Cambria, Times New Roman, Times, serif"
        >
          Do Tran Anh Khoa
        </Text>
        <Text
          fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
          fontSize={{ base: '12px', md: '16px' }}
          color={isLight ? '#65676B' : 'white'}
        >
          Front-End Developer
        </Text>
      </Flex>

      {/* Menu */}
      <Flex
        ref={menuRef}
        display={{ base: 'none', xl: 'flex' }}
        gap={12}
        h="full"
        position="relative"
      >
        {menuItemHeader.map((item, index) => (
          <Flex
            key={item.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            alignItems="center"
            onClick={() => {
              setActiveTab(item.id);
              handleScrollToPanel(index);
            }}
            fontSize="14px"
            fontWeight={600}
            _hover={{ textColor: activeTab !== item.id ? '#ce3df3' : '' }}
            transition="all 0.3s ease"
            cursor="pointer"
            position="relative"
            h="full"
            textColor={
              activeTab == item.id ? '#ce3df3' : isLight ? 'black' : 'white'
            }
          >
            <Text position="relative" zIndex={4}>
              {t(item.title)}
            </Text>
          </Flex>
        ))}

        {/* underline chỉ render 1 lần ở đây */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            height: '2px',
            borderRadius: '8px',
            background: '#ce3df3',
          }}
          animate={{
            x: underline.left,
            width: underline.width,
            opacity: underline.visible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </Flex>

      {/* Right controls */}
      <Flex
        color="white"
        gap={{ base: '10px', md: '20px' }}
        marginRight={{ base: '10px', sm: '20px', md: '40px' }}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          opacity={0.8}
          background={
            isLight ? 'rgba(35, 39, 47, .08)' : 'rgba(246, 247, 249, .05)'
          }
          _hover={{ opacity: 1 }}
          height="36px"
          w="36px"
          rounded="8px"
          cursor="pointer"
          onClick={handleChangeLight}
          color={isLight ? 'black' : 'white'}
        >
          {isLight ? <PiSunLight size={28} /> : <MdOutlineDarkMode size={28} />}
        </Flex>
        <MenuChangeLanguage />
      </Flex>
    </Flex>
  );
};

export default Header;
