import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    padding: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  copyList: {
    marginTop: 5,
    padding: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  label: {
    marginTop: 30,
    padding: 10,
  },
});

const colorsProperties = ['menuColor', 'menuBackgroundColor', 'stress', 'titleColor', 'titleMenuBackgroundColor'];

export default function ColorPicker() {
  const classes = useStyles();

  const themeContext = useContext(ThemeContext);
  const [colors, setColors] = useState({ ...themeContext.theme });
  const [visible, setVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColors({ ...colors, [name]: value });
    themeContext.setTheme({ [name]: value });
  };

  const reset = (): void => {
    themeContext.reset();
  };

  useEffect(() => {
    setColors({ ...themeContext.theme });
  }, [themeContext.theme]);

  const content = () => (
    <div className={classes.fullList} role="presentation">
      <form className={classes.colorList}>
        {colorsProperties.map((inputName, index) => (
          <label className={classes.label} key={`input-${inputName}-${index}`}>
            {`${inputName}: `}
            <input
              name={`${inputName}`}
              id={`${inputName}`}
              type="color"
              onChange={handleChange}
              value={colors[inputName as keyof typeof colors]}
            />
          </label>
        ))}
        <Button onClick={reset} variant="contained" color="secondary">
          Reset
        </Button>
      </form>
      <div className={classes.copyList}>
        <h4>Do skopiowania:</h4>
        {colorsProperties.map((prop, index) => (
          <p key={`prop-${prop}-${index}`}>
            {prop}: {colors[prop as keyof typeof colors]}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(!visible);
        }}
        variant="contained"
        color="primary"
      >
        {visible ? 'Close!' : 'Colors'}
      </Button>

      {visible && content()}
    </div>
  );
}
