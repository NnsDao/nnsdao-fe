import style from './index.module.css';
export default function Home(props: any) {
  return (
    <>
      <p>{props.text}</p>
      1111111111111111111111
      <div className={style.home}>page home</div>
    </>
  );
}
