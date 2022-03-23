import useAppSnackbar from '../hooks/useAppSnackbar';

class Snackbar {
  declare inherit: (msg: string) => void;

  declare info: (msg: string) => void;

  declare success: (msg: string) => void;

  declare warn: (msg: string) => void;

  declare err: (msg: string) => void;

  changeSnackbar(snack: ReturnType<typeof useAppSnackbar>) {
    this.err = snack.err;
    this.inherit = snack.inherit;
    this.info = snack.info;
    this.success = snack.success;
    this.warn = snack.warn;
  }
}

const snackbar = new Snackbar();

export default snackbar;
