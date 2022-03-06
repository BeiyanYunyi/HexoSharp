import { useSnackbar } from 'notistack';
/** My custom hook to simplify the useSnackbar hook
 * and the enqueueSnackbar function. */
const useAppSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  /** To get a default snackbar. */
  const inherit = (msg: string) => {
    enqueueSnackbar(msg, {
      variant: 'default',
    });
  };

  /** To get a success snackbar. */
  const success = (msg: string) => {
    enqueueSnackbar(msg, {
      variant: 'success',
    });
  };

  /** To get a error snackbar. */
  const err = (msg: string) => {
    enqueueSnackbar(msg, {
      variant: 'error',
    });
  };

  /** To get a warning snackbar. */
  const warn = (msg: string) => {
    enqueueSnackbar(msg, {
      variant: 'warning',
    });
  };

  /** To get a info snackbar. */
  const info = (msg: string) => {
    enqueueSnackbar(msg, {
      variant: 'info',
    });
  };

  const snackbar = { inherit, success, err, warn, info };

  return snackbar;
};
export default useAppSnackbar;
