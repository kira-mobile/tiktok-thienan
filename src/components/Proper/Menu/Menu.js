import PropTypes from 'prop-types';
// Tool
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
// Components
import { Wrapper as ProperWrapper } from '~/components/Proper';
import MenuItem from './MenuItem';
import Header from './Header';
import styles from './Menu.module.scss'
import { useState } from 'react';

const cx = classNames.bind(styles)
const defaultFunc = () => { }

function Menu({ children, items = [], hideOnClick = false, onChange = defaultFunc, }) {

    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length - 1]

    const renderItems = () => {
        return (current.data.map((item, index) => {
            //* convert boolen có children true và ngược lại
            const isParent = !!item.children
            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    setHistory(prev => [...prev, item.children]);
                } else {
                    onChange(item)
                }
            }} />
        }))
    };

    // Back to prev Page
    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1))
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <ProperWrapper className={cx('menu-proper')}>
                {/* Nếu ở trang > 1 => hiện header */}
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        onBack={handleBack}
                    />
                )}
                <div className={cx('menu-body')}>
                    {renderItems()}
                </div>
            </ProperWrapper>
        </div>
    );

    //  Reset to First Page
    const handleResetMenu = () => {
        setHistory(prev => prev.slice(0, 1))
    };

    return (
        <Tippy
            interactive
            // * Delay {[show:?s, hide:?s]}
            delay={[0, 700]}
            // visible
            offset={[12, 8]}
            hideOnClick={hideOnClick}
            placement='bottom-end'
            render={renderResult}
            //* array.slice(start,end)
            onHide={handleResetMenu}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Menu;