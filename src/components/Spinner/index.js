import ReactLoading from 'react-loading';
import './styles.scss';

export default function Spinner({ text, show }) {
  if (!show) {
    return null;
  }
  
  if (!text) {
    text = 'Loading...';
  }

  return (
    <div className='loading-component'>
      <div className='content'>
        <ReactLoading
          type='spin'
          color='#008080'
          height={100}
          width={100}
        />
        <span>{text}</span>
      </div>
    </div>
  )
}