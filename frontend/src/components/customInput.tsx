import { FC, KeyboardEvent, ReactElement } from 'react';
import '../style/titels.css';

interface ICustomInput {
    type?: string;
    value: string;
    placeholder: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const CustomInput: FC<ICustomInput> = ({
    type = 'text',
    value,
    placeholder,
    className = 'fileds',
    onChange,
    onKeyDown,
}): ReactElement => {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            className={className}
            required
            onKeyDown={(e) => onKeyDown(e)}
        />
    );
};

export default CustomInput;
