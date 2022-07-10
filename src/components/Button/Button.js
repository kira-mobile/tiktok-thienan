import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    upload = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        // * passProps là những props còn lại của button vd: target: _blank...
        ...passProps,
    }

    //* Lặp qua mỗi key => thấy bắt đầu bằng on viết logic =>
    //* nếu key bắt đầu bằng onl và là 1 hàm => xóa key (Remove event listener when button = disabled)
    if (disabled) {
        Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props.key
            }
        })
    }

    // * Nếu là to thì prop của Comp bằng to (ở lại trang , chỉ nhận link nội bộ bên trong web 
    //* kh nhận link bên ngoài) và ngược lại thẻ a qua trang khác...
    if (to) {
        props.to = to
        Comp = Link
    }
    else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        text,
        rounded,
        disabled,
        small,
        large,
        upload,
    })

    return (

        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>

    );
}

Button.propTypes = {
    // *set type của props
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    borderRadius: PropTypes.string,
    className: PropTypes.string,
    // * PropTypes.node : giá trị có thể render , isRequired: luôn luôn được truyền
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
}

export default Button;