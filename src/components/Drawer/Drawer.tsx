import React, { useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { ThemeContext } from '../../context/ThemeContext';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  colorList: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginTop: 30,
    padding: 10,
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const inputEl = useRef<HTMLInputElement>(null);
  const themeContext = useContext(ThemeContext);
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setState(open);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputEl && inputEl.current) {
      console.log(inputEl.current.value);
    }
  };

  const drawerContent = () => (
    <div className={classes.fullList} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <form className={classes.colorList}>
        {['menuColor', 'menuBackgroundColor', 'titleColor', 'titleMenuBackgroundColor'].map((inputName) => (
          <label className={classes.label}>
            {`${inputName}: `}
            <input name={`${inputName}`} id={`${inputName}`} type="color" onChange={handleChange} ref={inputEl} />
          </label>
        ))}
      </form>
    </div>
  );

  return (
    <div>
      <Button
        onClick={() => {
          setState(!state);
        }}
        variant="contained"
        color="primary"
      >
        {state ? 'Close!' : 'Colors'}
      </Button>
      <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
        {drawerContent()}
      </Drawer>
    </div>
  );
}
