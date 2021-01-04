import React, { FC, useEffect, useState, useContext } from 'react';

import { ThemeContext, IThemeInit } from '../../context/ThemeContext';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

interface IProps extends IThemeInit {
  reTitle: boolean;
}

const useStyle = makeStyles((theme) => {
  const fontFamily = "'Times New Roman', Times, serif";

  const textShadow = `2px 7px 5px rgba(0,0,0,0.3)`;
  const xsBreakPoint = theme.breakpoints.down('xs');
  const smBreakPoint = theme.breakpoints.down('sm');
  const mdBreakPoint = theme.breakpoints.down('md');

  return {
    Container: { flex: 1, marginTop: 64 },
    TitleContainer: (props: IProps) => ({
      backgroundImage: props.titleMenuBackgroundGradient,
      // backgroundColor: props.titleMenuBackgroundColor,
      backgroundPosition: `${props.reTitle ? '100% 0' : '0% 0'}`,
      backgroundSize: '250%',
      transition: 'background-position 0.5s',
      justifyContent: 'center',
      alignItems: 'center',
      height: 105,
      [xsBreakPoint]: {
        height: 80,
      },
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    }),
    Title: (props: IProps) => ({
      color: `${props.titleColor}`,
      fontFamily: fontFamily,
      textShadow: textShadow,
      marginLeft: 10,
      [mdBreakPoint]: {
        fontSize: '2.2rem',
      },
      [smBreakPoint]: {
        fontSize: '2rem',
      },
      [xsBreakPoint]: {
        fontSize: '1.5rem',
      },
    }),
    WhitSub: (props: IProps) => ({
      color: `${props.titleColor}`,
      fontFamily: fontFamily,
      textShadow: textShadow,
      marginRight: 10,
      [mdBreakPoint]: {
        fontSize: '1.2rem',
      },
    }),
  };
});

type TitleProps = {
  title: string;
  subTitle?: string;
};
export const Title: FC<TitleProps> = ({ title, subTitle }) => {
  const themeContext = useContext(ThemeContext);
  const [titles, setTitles] = useState<TitleProps>({ title: '' });
  const [reTitle, setReTitle] = useState(false);
  const classes = useStyle({ reTitle, ...themeContext.theme });

  useEffect(() => {
    setReTitle(true);
    const timer = setTimeout(() => {
      setTitles({ title, subTitle });
      setReTitle(false);
    }, 500);
    return () => {
      clearTimeout(timer);
      setTitles({ title, subTitle });
    };
  }, [title, subTitle]);

  const content = titles.subTitle ? (
    <>
      <Typography variant="h3" component="h2" className={classes.Title}>
        {titles.subTitle}
      </Typography>
      {/* <Typography variant="h4" component="h1" className={classes.WhitSub}>
        {titles.title}
      </Typography> */}
    </>
  ) : (
    <>
      <Typography variant="h3" component="h1" className={classes.Title}>
        {titles.title}
      </Typography>
    </>
  );

  return (
    <Grid container item sm={11} className={classes.TitleContainer}>
      {content}
    </Grid>
  );
};
