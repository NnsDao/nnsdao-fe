import Hello from '../../components/Hello';
import LoadingWrapper from '../../components/LoadingWrapper';
import style from './index.module.css';

export default function Home(props: any) {
  const HelloWrap = LoadingWrapper(Hello);
  return (
    <>
      <div className={style.home}>dao home</div>
      <HelloWrap></HelloWrap>
    </>
  );
}
