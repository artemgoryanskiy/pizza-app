import {forwardRef} from 'react';
import cn from 'classnames';
import styles from './Search.module.css';
import type {SearchProps} from './Search.props.ts';

const Search = forwardRef<HTMLInputElement, SearchProps>(
    function Input({isValid=true, className, ...props}, ref) {
        return (
            <div className={styles['input-wrapper']}>
                <input ref={ref} className={cn(styles.input, {
                    [styles.invalid]: isValid,
                })
                } {...props}/>
                <img className={styles.icon} src="/search-icon.svg" alt="Иконка поиска"/>
            </div>

        );
    }
);

export default Search;