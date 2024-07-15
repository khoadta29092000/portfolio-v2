import {
  Flex,
  Grid,
  GridItem,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import setLanguage from 'next-translate/setLanguage';
import { getIconFlag } from '@/utils/utils';
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
import Link from 'next/link';

type TProps = {
  isOpenSidebar: boolean;
  activeTab: number;
  setActiveTab: (value: number) => void;
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
  isOpenSidebar,
  activeTab,
  setActiveTab,
}) => {
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();
  const dispatch = useDispatch();
  const { lang } = useTranslation();
  const { t } = useTranslation('common');
  const { isOpen, onToggle, onClose } = useDisclosure();
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

  const handleScrollToPanel = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Flex
      transition="all 0.3s ease"
      pl={{
        base: 0,
        md: isOpenSidebar ? '64px' : '64px',
      }}
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
          fontFamily=" Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
          fontSize={{ base: '12px', md: '16px' }}
          color={isLight ? '#65676B' : 'white'}
        >
          Front-End Developer
        </Text>
      </Flex>
      <Flex display={{ base: 'none', md: 'flex' }} gap={12} h="full">
        {menuItemHeader.map((item, index) => {
          return (
            <Link key={index} href={item.href}>
              <Flex
                alignItems="center"
                onClick={() => setActiveTab(item.id)}
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
                {activeTab == item.id && (
                  <motion.div
                    layoutId="active-pill"
                    style={{
                      borderBottom: '2px solid #ce3df3',
                      bottom: '0px',
                      position: 'absolute',
                      width: '100%',
                      radius: '8px',
                    }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                )}
                <Text position={'relative'} zIndex={4}></Text>
                {t(item.title)}
              </Flex>
            </Link>
          );
        })}
      </Flex>
      <Flex
        // ml={'auto'}
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
          _hover={{
            opacity: 1,
          }}
          height="36px"
          w="36px"
          rounded="8px"
          cursor="pointer"
          onClick={handleChangeLight}
          color={isLight ? 'black' : 'white'}
        >
          {isLight ? <PiSunLight size={28} /> : <MdOutlineDarkMode size={28} />}
        </Flex>
        <Flex>
          <Popover
            isOpen={isOpen}
            onOpen={onToggle}
            closeOnBlur={true}
            onClose={onClose}
            placement="top-start"
          >
            <PopoverTrigger>
              <Flex
                w="68px"
                height="36px"
                backdropFilter="blur(2px)"
                padding="10px 8px"
                borderRadius="4px"
                background={
                  isLight ? 'rgba(35, 39, 47, .08)' : 'rgba(246, 247, 249, .05)'
                }
                cursor="pointer"
                alignItems="center"
                gap="6px"
              >
                <Image
                  alt="Flat"
                  src={getIconFlag(lang)}
                  width={6}
                  height={6}
                  userSelect="none"
                />
                <FaChevronDown size={10} color="rgba(173, 173, 173, 1)" />
              </Flex>
            </PopoverTrigger>

            <PopoverContent
              bg="rgba(35, 44, 61, 0.4)"
              borderRadius="8px"
              backdropFilter="blur(15px)"
              padding="12px 6px"
              border="none"
              width="300px"
            >
              <Grid templateColumns="repeat(2, 1fr)" gap="6px">
                {itemFlag?.map((flag, index) => {
                  return (
                    <GridItem
                      key={index}
                      _hover={{ background: 'rgb(173, 173, 173)' }}
                      w="100%"
                      borderRadius="5px"
                      cursor="pointer"
                      display="flex"
                      onClick={() => handleSelectLanguage(flag.key)}
                    >
                      <Flex alignItems="center" p="4px" gap="10px">
                        <Image
                          alt={flag.alt}
                          src={flag.src}
                          width={6}
                          height={6}
                        />
                        <Text fontSize="14px">{flag.title}</Text>
                      </Flex>
                    </GridItem>
                  );
                })}
              </Grid>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;

