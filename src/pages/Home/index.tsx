import { useTotalDaoLists } from '../../api/dao_manager';
import Hello from '../../components/Hello';
import LoadingWrapper from '../../components/LoadingWrapper';
import style from './index.module.css';

export default function Home(props: any) {
  console.log('WrappedComponent');
  const HelloWrap = LoadingWrapper(Hello, useTotalDaoLists);
  return (
    <>
      <div className={style.home}>dao home</div>
      <HelloWrap>
        <span>child 1</span>
      </HelloWrap>
    </>
  );
}
