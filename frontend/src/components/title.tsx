import { FC, ReactElement } from 'react';

interface ITitle {
  text: string;
}

const Title: FC<ITitle> = ({
    text
  }): ReactElement => {
    return (
    <div>
        <h1>{text}</h1>
    </div>
  );
};

export default Title;

