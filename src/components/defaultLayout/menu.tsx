import { Flex, Text } from '@chakra-ui/react';
import { IoIosMenu } from 'react-icons/io';
import { TbHome } from 'react-icons/tb';
import { IoGiftOutline } from 'react-icons/io5';
import { FiLogIn } from 'react-icons/fi';

import { useRouter } from 'next/router';

import { useState } from 'react';

const menuItems = [
    {
        isLink: false,
        title: 'About',
        src: <IoIosMenu size={24} />,
        href: '#About',
    },
    { isLink: false, title: 'Home', src: <TbHome size={24} />, href: '/' },
    {
        isLink: false,
        title: 'Experiences',
        src: <IoGiftOutline size={24} />,
        href: '#Experiences',
    },
    {
        isLink: false,
        title: 'Project',
        src: <IoGiftOutline size={24} />,
        href: '#Project',
    },
    { isLink: false, title: 'Skills', src: <FiLogIn size={24} />, href: '#Skills' },
    { isLink: false, title: 'Contract', src: <FiLogIn size={24} />, href: '#Contract' },
];

type TProps = {
    isOpenSidebar: boolean;
    // eslint-disable-next-line no-unused-vars
};

const Menu: React.FC<TProps> = ({ isOpenSidebar }) => {
    const router = useRouter();
    const handleChangeOpen = (isLink: boolean, href: string) => {
        if (isLink) {
            router.push(href);
            return;
        } else if (href == 'menu') {
        } else if (href == 'login') {
        } else {
            handleClickHover();
        }
    };
    const [isClick, setIsClick] = useState(false);
    const handleClickHover = () => {
        setIsClick((prev) => !prev);
    };

    return (
        <Flex
            h="64px"
            bottom={0}
            bg="rgb(21, 27, 37)"
            left={0}
            position="fixed"
            w="100vw"
            padding="0 8px"
            zIndex="99"
            boxSizing="border-box"
            display={{ base: 'flex', md: 'none' }}
            alignItems="center"
        >
            {menuItems.map((item, index) => {
                return (
                    <Flex 
                        key={index}
                        onClick={() => handleChangeOpen(item.isLink, item.href)}
                        style={{
                            width: '100%',
                            padding: '8px 0px 16px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            placeItems: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <Flex
                            flexDirection="column"
                            alignItems="center"
                            textAlign="center"
                        >
                            <Flex textColor="white" w="24px" h="27px" alignItems="center">
                                {item.src}
                            </Flex>
                            <Text
                                marginTop="3px"
                                fontSize="10px"
                                fontWeight="500"
                                textColor="rgb(173, 173, 173)"
                            >
                                {item.title}
                            </Text>
                        </Flex>
                    </Flex>
                );
            })}
        </Flex>
    );
};

export default Menu;
