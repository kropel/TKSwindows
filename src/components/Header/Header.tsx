import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Logo } from '../../Logo/Logo';
import { ThemeContext, IThemeInit } from '../../context/ThemeContext';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PageSvc } from '../../services/PageSvc';

const useStyles = makeStyles((theme) => {
  return {
    appBar: (props: IThemeInit) => ({
      backgroundColor: '#fff', //props.menuBackgroundColor,
      backgroundImage: props.menuBackgroundGradient,
      color: props.menuColor,
      height: 105,
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: { height: 56 },
    }),
    toolbar: {
      alignItems: 'center',
      justifyContent: 'space-around',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'space-between',
      },
    },
    logo: {
      height: 60,
      [theme.breakpoints.down('xs')]: {
        height: 40,
      },
      paddingTop: '2px',
      paddingBottom: '2px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: ' center',
    },
    tab: (props: IThemeInit) => ({
      color: props.menuColor,
      // textShadow: '1px 2px 5px rgba(255,255,255,0.4)',
      minWidth: 45,
      '&:hover': {
        color: '#bbb', //'#ad2503',
      },
    }),
    indicator: (props: IThemeInit) => ({
      backgroundColor: props.stress,
    }),
    menuButton: {
      marginRight: theme.spacing(2),
    },
    Phone: (props: IThemeInit) => ({
      color: props.menuColor,
      borderColor: props.menuColor,
    }),
  };
});

type menuItem = {
  title: string;
  pageURL: string;
};

const menuItems: menuItem[] = [
  { title: 'Home', pageURL: '/' },
  { title: 'Windows', pageURL: '/windows' },
  { title: 'Doors', pageURL: '/doors' },
  { title: 'Materials', pageURL: '/materials' },
  { title: 'Service', pageURL: '/service' },
  { title: 'Gallery', pageURL: '/gallery' },
  { title: 'About Us', pageURL: '/about-us' },
  { title: 'Contact', pageURL: '/contact' },
];

export const Header = () => {
  const themeContext = useContext(ThemeContext);

  const { pathname } = useLocation<{ pathname: string }>();
  const phoneNumber = PageSvc.getContactProps('phones')[0];
  const history = useHistory();
  const classes = useStyles(themeContext.theme);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [active, setActive] = useState<number | boolean>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clickHandler = (path: string): void => {
    history.push(path);
  };

  useEffect(() => {
    const currentURL = '/' + pathname.split('/')[1];
    const indexActive = menuItems.findIndex((menuItem) => menuItem.pageURL === currentURL);
    setActive(indexActive < 0 ? false : indexActive);
  }, [pathname]);

  const navTabs = menuItems.map((item, index) => (
    <Tab
      label={item.title}
      className={classes.tab}
      onClick={() => clickHandler(item.pageURL)}
      key={'menu-item-' + index}
    />
  ));

  const handleMenuClick = (url: string): void => {
    history.push(url);
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const mobileItems = menuItems.map((menuItem, index) => {
    const { title, pageURL } = menuItem;
    return (
      <MenuItem onClick={() => handleMenuClick(pageURL)} key={'mobile-item-' + index}>
        {title}
      </MenuItem>
    );
  });

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Box
          className={classes.logo}
          onClick={() => {
            history.push('/');
          }}
        >
          <Logo height text />
        </Box>

        {isMobile ? (
          <Box>
            {isSmMobile ? (
              <IconButton
                style={{
                  color: 'white',
                  marginRight: 30,
                }}
                href={`tel:${phoneNumber}`}
              >
                <PhoneIcon />
              </IconButton>
            ) : (
              <Button
                startIcon={<PhoneIcon />}
                variant="outlined"
                style={{ marginRight: 30 }}
                href={`tel:${phoneNumber}`}
                className={classes.Phone}
              >
                {phoneNumber}
              </Button>
            )}

            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              {mobileItems}
            </Menu>
          </Box>
        ) : (
          <>
            <Tabs value={active} classes={{ indicator: classes.indicator }}>
              {navTabs}
            </Tabs>
            <Button startIcon={<PhoneIcon />} variant="outlined" href={`tel:${phoneNumber}`} className={classes.Phone}>
              {phoneNumber}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
