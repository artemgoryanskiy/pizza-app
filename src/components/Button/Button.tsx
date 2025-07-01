import cn from 'classnames';
import styles from './Button.module.css';
import type {ButtonProps} from './Button.props.ts';

function Button({children, className, appearance='small', ...props}: ButtonProps) {
    return (
        <button className={cn(styles.button, styles.accent, className, {
            [styles.big]: appearance === 'big',
            [styles.small]: appearance === 'small',
        })} {...props}>{children}</button>
    );
}

export default Button;