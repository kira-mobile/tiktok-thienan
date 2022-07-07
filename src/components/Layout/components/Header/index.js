
// Tooltips
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faCircleQuestion,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faUser,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css'
// Component
import styles from './Header.module.scss'
import images from '~/assets/img';
import Button from '~/components/Button';
import Menu from '~/components/Proper/Menu';
import { MailBoxIcon, MessageIcon, SearchIcon, UploadIcon } from '~/components/Icon';
import Image from '~/components/Image';
import Search from '../Search';
const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'Eng',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'Vie',
                    title: 'Tiếng Việt'
                },
                {
                    code: 'Fra',
                    title: 'France'
                },
                {
                    type: 'language',
                    code: 'Aus',
                    title: 'Australia'
                },
            ]
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = true;



    // Handle Logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //Handle change language
                break;
            default:
        }
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/feedback',
        },

        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Settings',
            to: '/settings',
        },

        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Get coins',
            to: '/coin',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },

    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={images.logo} alt="Tiktok" />

                <Search />

                {/* //* Nếu đăng nhập rồi thì render layout logined và ngược lại*/}
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Button rounded leftIcon={<UploadIcon />} >Upload Video</Button>

                            <Tippy delay={[0, 50]} content='Message'>
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>

                            <Tippy delay={[0, 50]} content='MailBox'>
                                <button className={cx('action-btn')}>
                                    <MailBoxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text >Upload</Button>
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu
                        items={currentUser ? userMenu : MENU_ITEMS}
                        onChange={handleMenuChange}

                    >
                        {/* //* Nếu có user thì render avatar ko thì render menu 3 chấm */}
                        {currentUser ? (

                            <Image
                                className={cx('user-avatar')}
                                src=''
                                alt='Nguyen Thien An'
                            // fallback=''
                            />
                        ) : (

                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>


            </div >
        </header >
    );
}

export default Header;