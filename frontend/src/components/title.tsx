import { FC, ReactElement } from 'react';
import '../style/titels.css';

interface ITitle {
    text: string;
}

const Title: FC<ITitle> = ({ text }): ReactElement => {
    return (
        <div>
            <h1 className="title">{text}</h1>
        </div>
    );
};

export default Title;
