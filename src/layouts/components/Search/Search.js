// Library
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,

} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';

// Component
import { SearchIcon } from '~/components/Icon';
import { useDebounce } from '~/hooks';
import { Wrapper as ProperWrapper } from '~/components/Proper';
import AccountsItem from '~/components/AccountsItem';
import * as searchService from '~/services/searchService'
const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searcResult, setSearcResult] = useState([]);
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    // *    Lần 1: '':  khi search chạy searchValue = '' => 
    //* searchValue được truyền vào tham số của useDebounce() => 
    //* debounced không thỏa điều kiện => không gọi API
    //*     Lần 2: 'h': value = h được truyền vào useDebounce des thay đổi gọi lại hàm nhưng 
    //* vẫn return ra chuỗi lần trước
    //* nếu 800mls sau kh làm j thì value của setDebounced = h còn nếu tiếp tục gỡ thì 
    //* value vẫn = ''
    const deboucedValue = useDebounce(searchValue, 800)

    const inputRef = useRef()

    useEffect(() => {
        if (!deboucedValue.trim()) {
            setSearcResult([])
            return;
        }

        // * Gọi Api từ searchService.js
        const fetchApi = async () => {
            setLoading(true)
            const result = await searchService.search(deboucedValue)
            setSearcResult(result)

            setLoading(false)
        }

        fetchApi()

    }, [deboucedValue])

    const handleClear = () => {
        setSearchValue('')
        setSearcResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value;
        // * Không cho phép kí tự đầu tiên là space
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }

    }


    return (
        // * <div>...</div> => Fix warning tippy
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searcResult.length > 0}
                render={attrs => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <ProperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searcResult.map((result) => (
                                <AccountsItem key={result.id} data={result} />
                            ))}

                        </ProperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder='Search accounts and videos'
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {/* !!: convert to boolen */}
                    {!!searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />}

                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;