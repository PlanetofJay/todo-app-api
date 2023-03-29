import './styles.scss';

export default function ErrorMessage({ error }) {
  return (
    <div className='error-message-component'>
      <div className='title'>Error</div>
      <div className='text'>{error}</div>
    </div>
  )
}