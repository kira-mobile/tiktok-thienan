import classNames from "classnames/bind";
import styles from './AccountsItem.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function AccountsItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ab87446f158491d67192423c30f331c4~c5_300x300.webp?x-expires=1656824400&x-signature=sPVwZnrEFrjo2QKLVwGRNhI6fN4%3D" alt="An" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Thien An</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>

                <span className={cx('username')}>nguyenthienan</span>
            </div>
        </div>
    );
}

export default AccountsItem;