import { Alert, Backdrop, Button, CircularProgress } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useBoolean } from 'usehooks-ts';
import { useGlobalState } from '../hooks/globalState';
import { logListKeys } from './querys';

export default function Demo() {
  const { value, toggle } = useBoolean(false);
  const [{ count }, dispatch] = useGlobalState();
  console.log('render demo');
  return (
    <>
      <Button onClick={toggle}>MUI button</Button>

      <h3 className="bg-main-btn">Demo</h3>
      <Alert severity="success">successfully done</Alert>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={value} onClick={toggle}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <p>count:{count}</p>
      <Button onClick={() => dispatch({ type: 'x', value: true })}>Login</Button>
      <Button onClick={() => dispatch({ type: 'x', value: false })}>Logout</Button>
      <Demo2></Demo2>
      <hr />
      <p>react-query demo</p>

      {/* @ts-ignore */}
      <ReactQueryDemo></ReactQueryDemo>
    </>
  );
}

export const Demo2 = () => {
  const [{ count }, dispatch] = useGlobalState();
  console.log('render Demo2 ');
  return (
    <>
      <p> demo2 {count}</p>
    </>
  );
};
export const ReactQueryDemo = () => {
  const list = useQuery(logListKeys.lists(), async () => {
    return 'xxx';
  });
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation(
    x => {
      // xxx
      //
      return Promise.resolve(x);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(logListKeys.lists());
      },
    }
  );
  if (list.isLoading) {
    return 'loading...';
  }
  if (list.isError) {
    return 'Error...';
  }

  return (
    <div>
      <p>react query </p>
      {list.data}
      <Button
        onClick={() => {
          // @ts-ignore
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          });
        }}>
        update
      </Button>
      {list.isFetching ? 'Backdrop' : null}
    </div>
  );
};
