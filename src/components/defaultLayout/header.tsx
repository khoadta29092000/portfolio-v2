import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaChevronDown, FaWallet } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import setLanguage from 'next-translate/setLanguage';
import { getIconFlag } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import  useTranslation  from 'next-translate/useTranslation';

type TProps = {
  isOpenSidebar: boolean;
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

const Header: React.FC<TProps> = ({ isOpenSidebar }) => {
  const { lang } = useTranslation();

 
  const { t } = useTranslation('common');
  const {
    isOpen: isOpenSearch,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure();
  const { isOpen, onToggle, onClose } = useDisclosure();
 
  const handleSelectLanguage = async (key: string) => {
    onClose();
    await setLanguage(key);
  };

  return (
    <Flex
      transition="all 0.3s ease"
      pl={{
        base: 0,
        md: isOpenSidebar ? '246px' : '64px',
      }}
      alignItems="center"
      position={'fixed'}
      h="64px"
      w="100%"
      bg="#16191F"
      zIndex={10}
      justifyContent={'space-between'}
    >
      <Flex>
        <Flex display={{ base: 'flex', md: 'none' }} marginLeft={'10px'}>
          <Flex>
            <Flex mx="auto" mt={1}>
              <Link href="/">
                <Image
                  src="/icons/club-icon.svg"
                  alt="logo"
                  width={30}
                  height={26}
                />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      
      <Flex
        display={{ base: 'flex', md: 'none' }}
        color="white"
        gap={{ base: '10px', md: '20px' }}
        marginRight={{ base: '10px', sm: '20px', md: '40px' }}
        cursor={'pointer'}
        onClick={onOpenSearch}
      >
        <IoSearch size={24} color="rgba(224, 224, 224, 1)" />
      </Flex>

      <Flex
        // ml={'auto'}
        color="white"
        gap={{ base: '10px', md: '20px' }}
        display={{ base: 'none', md: 'flex' }}
        marginRight={{ base: '10px', sm: '20px', md: '40px' }}
      >
        <Popover
          isOpen={isOpen}
          onOpen={onToggle}
          onClose={onClose}
          closeOnBlur={false}
          placement="top-start"
        >
          <PopoverTrigger>
            <Flex
              display={{ base: 'none', md: 'flex' }}
              w="68px"
              height="36px"
              backdropFilter="blur(2px)"
              padding="10px 8px"
              borderRadius="4px"
              border="1px solid rgb(35, 44, 61)"
              cursor="pointer"
              alignItems="center"
              gap="6px"
            >
              <Image
                alt="Flat"
                src={getIconFlag(lang)}
                width={24}
                height={24}
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
                        width={24}
                        height={24}
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
  );
};

export default Header;
