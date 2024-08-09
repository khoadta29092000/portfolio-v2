import { getIconFlag } from '@/utils/utils';
import {
  Flex,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import setLanguage from 'next-translate/setLanguage';
import { itemFlag } from '../defaultLayout/header';

export default function MenuChangeLanguage() {
  const { lang } = useTranslation();
  const handleSelectLanguage = async (key: string) => {
    await setLanguage(key);
  };
  return (
    <Menu>
      <MenuButton
        display={{ base: 'none', md: 'flex' }}
        w="68px"
        height="36px"
        backdropFilter="blur(2px)"
        padding="10px 8px"
        borderRadius="4px"
        border="1px solid rgb(35, 44, 61)"
        cursor="pointer"
      >
        <Flex alignItems="center" gap="6px">
          <Image alt="Flat" src={getIconFlag(lang)} width={24} height={24} />
          <FaChevronDown size={10} color="rgba(173, 173, 173, 1)" />
        </Flex>
      </MenuButton>
      <MenuList
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
              <MenuItem
                as={GridItem}
                key={index}
                _hover={{ background: 'customBlack.300' }}
                w="100%"
                borderRadius="5px"
                cursor="pointer"
                bg="none"
                display="flex"
                onClick={() => handleSelectLanguage(flag.key)}
              >
                <Flex alignItems="center" gap="10px">
                  <Image alt={flag.alt} src={flag.src} width={24} height={24} />
                  <Text fontSize="14px">{flag.title}</Text>
                </Flex>
              </MenuItem>
            );
          })}
        </Grid>
      </MenuList>
    </Menu>
  );
}

