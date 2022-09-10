import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const Loader = () => {
  return (
    <div className={css.Loader}>
      <InfinitySpin width="200" color="#3f51b5" wrapperClass />
    </div>
  );
};
export default Loader;
