import './styles.scss';
import { FaTasks } from 'react-icons/fa';
import MainMenu from '../MainMenu';

export default function Header() {
  return (
    <>
      <header>
        <div className='title'><FaTasks /> Todo App</div>
        <div className='author'>by John Doe</div>
      </header>
      <MainMenu />
    </>
  );
}
