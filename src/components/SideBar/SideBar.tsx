import React, { FC, useMemo } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyle = makeStyles((theme) => {
  return {
    Link: {
      display: 'flex',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
      width: '100%',
      padding: 15,
      transition: 'all 0.3s',
      background: `linear-gradient(to top, #f50057, #f50057 2px, #135545 2px, transparent 50%)`,
      backgroundPosition: '0% 0%',
      backgroundSize: '200% 200%',
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: '#135545',
        paddingRight: 10,
        paddingLeft: 20,
      },
    },
    Active: {
      animation: `$active 0.8s cubic-bezier(0.280, 0.840, 0.420, 1) forwards`,
      textShadow: '3px 3px 3px rgba(0,0,0,0.3)',
      color: 'white',
    },
    '&  > *': {
      display: 'inline-flex',
    },
    SideBar: {
      minWidth: '70%',
      Height: 'content',
      alignItems: 'center',
      paddingTop: 60,
      paddingBottom: 60,
      marginBottom: 30,
      display: 'inline-flex',
      flexDirection: 'column',
      borderWidth: 0,
      borderRadius: 0,
      background: 'linear-gradient(45deg, #0f4336, #145746)',
      boxShadow:
        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      transition: 'all 0.4s',
      '&:hover': {
        boxShadow: '8px 8px 8px rgba(0,0,0,0.3),-1px -1px 9px rgba(0,0,0,0.1)',
      },
    },
    '@keyframes active': {
      '0%': {
        backgroundPosition: '0% 0%',
      },
      '60%': {
        backgroundPosition: '0% 120%',
      },
      '80%': {
        backgroundPosition: '0% 100%',
      },
      '90%': {
        backgroundPosition: '0% 105%',
      },
      '100%': {
        backgroundPosition: '0% 100%',
      },
    },
    Container: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  };
});

export type TSideBarLink = {
  title: string;
  url: string;
};

type TSideBarProps = {
  sideBarLinks: TSideBarLink[];
};

export const SideBar: FC<TSideBarProps> = ({ sideBarLinks }) => {
  const classes = useStyle();
  let { pathname } = useLocation();
  const history = useHistory();

  pathname = /\/$/.test(pathname) ? pathname.slice(0, -1) : pathname;

  const getClasses = useMemo(
    () => (url: string): string =>
      pathname === url ? `${classes.Link} ${classes.Active}` : `${classes.Link}`,
    [classes.Active, classes.Link, pathname]
  );

  const tabs = useMemo(
    () =>
      sideBarLinks.map(({ title, url }, index) => (
        <Link
          component="button"
          id={`vertical-tab-${index}`}
          key={`vertical-tab-${index}`}
          className={getClasses(url)}
          onClick={() => {
            history.push(url);
          }}
        >
          {title}
        </Link>
      )),
    [sideBarLinks, getClasses, history]
  );
  if (sideBarLinks.length === 0 || sideBarLinks[0].title === '') return <></>;

  const sideBar = <Box className={classes.SideBar}>{tabs}</Box>;
  return <Box className={classes.Container}>{sideBar}</Box>;
};
