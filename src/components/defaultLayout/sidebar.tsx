import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  usePortfolioBackgroundColor,
  usePortfolioIsLight,
} from '@/redux/home/selectors';
import useTranslation from 'next-translate/useTranslation';
import { MdOutlineMenu } from 'react-icons/md';
import { menuItemHeader } from '.';

type TProps = {
  activeTab: number;
  setActiveTab: (value: number) => void;
};

const Sidebar: React.FC<TProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();
  const isLight = usePortfolioIsLight();
  const backgroundColor = usePortfolioBackgroundColor();
  const { t } = useTranslation('common');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        cursor="pointer"
        color="white"
        zIndex={11}
        position="absolute"
        onClick={onOpen}
        top="20px"
        textColor={isLight ? 'black' : 'white'}
        bg={backgroundColor}
        left="20px"
        display={{ base: 'none', md: 'flex', xl: 'none' }}
      >
        <MdOutlineMenu size={24} />
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          textColor={isLight ? 'black' : 'white'}
          bg={backgroundColor}
          maxW="160px"
        >
          <DrawerCloseButton />
          <DrawerHeader marginTop="-8px">Menu</DrawerHeader>

          <DrawerBody
            display={'flex'}
            flexDirection={'column'}
            gap={2}
            paddingRight="0"
            marginRight="0"
          >
            {menuItemHeader.map((item, index) => (
              <Flex
                key={index}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
                textColor={
                  activeTab == item.id ? '#ce3df3' : isLight ? 'black' : 'white'
                }
                justifyContent="left"
                alignItems="left"
                textAlign="left"
                position="relative"
                w="100%"
              >
                {activeTab == item.id && (
                  <motion.div
                    layoutId="active-pill"
                    style={{
                      borderRight: '2px solid #ce3df3',
                      top: '0px',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      radius: '8px',
                    }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                )}
                <Text fontSize="14px" fontWeight="500">
                  {t(item.title)}
                </Text>
              </Flex>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
