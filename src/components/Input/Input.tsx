import {forwardRef} from 'react';
import cn from 'classnames';
import styles from './Input.module.css';
import type {InputProps} from './Input.props.ts';

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({isValid=true, className, ...props}, ref) {
        return (
            <input ref={ref} className={cn(styles.input, {
                [styles.invalid]: isValid,
            })
            } {...props}/>
        );
    }
);

export default Input;