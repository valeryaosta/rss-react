import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Fallback = ({ children }: Props) => {
  return <div className='fallback'>{children}</div>;
};

export default Fallback;
