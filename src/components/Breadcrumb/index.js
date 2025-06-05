import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ pageName }) => {
  return (
    <nav className={styles.breadcrumb}>
      <ol className={styles.breadcrumb_list}>
        <li className={styles.breadcrumb_item}>
          <Link to="/" className={styles.breadcrumb_link}>
            Trang chủ
          </Link>
        </li>
        <li className={styles.breadcrumb_separator}>
          <FontAwesomeIcon icon={faChevronRight} />
        </li>
        <li className={styles.breadcrumb_item}>
          <Link to="#" className={styles.breadcrumb_link}>
            {pageName}
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;