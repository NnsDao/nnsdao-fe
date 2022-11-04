export default function Hello(props) {
  const data = props.data;

  return (
    <>
      <ol>
        {data
          .map(item => item.canister_id.toText())
          .map(cid => {
            return (
              <li key={cid}>
                <code>{cid}</code>
              </li>
            );
          })}
      </ol>
      <h2>hi</h2>
      <h3>hello</h3>
      {props.children}
    </>
  );
}
