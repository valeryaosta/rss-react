import styles from './Spinner.module.css';

const Spinner = () => (
  <div className={styles['spinner-container']} data-testid='spinner'>
    <div className={styles['spinner']}></div>
  </div>
);

export default Spinner;
