import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { Logo } from '../Logo/Logo';
import { ThemeContext, IThemeInit } from '../../context/ThemeContext';
import { PageSvc } from '../../services/PageSvc';
import { MenuDrawer } from '../MenuDrawer/MenuDrawer';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PhoneIcon from '@material-ui/icons/Phone';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => {
  return {
    appBar: (props: IThemeInit) => ({
      backgroundColor: '#fff', //props.menuBackgroundColor,
      backgroundImage: props.menuBackgroundGradient,
      color: props.menuColor,
      height: 105,
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: { height: 56 },
    }),
    toolbar: {
      maxWidth: 2000,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
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
      margin: 8,
    }),
    PhonesContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

export type TMenuItem = {
  title: string;
  pageURL: string;
};

const menuItems: TMenuItem[] = [
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
  const [active, setActive] = useState<number | boolean>(0);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const themeContext = useContext(ThemeContext);

  const { pathname } = useLocation<{ pathname: string }>();
  const phoneNumber = PageSvc.getContactProps('phones');
  const history = useHistory();
  const classes = useStyles(themeContext.theme);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const currentURL = '/' + pathname.split('/')[1];
    const indexActive = menuItems.findIndex(
      (menuItem) => menuItem.pageURL === currentURL
    );
    setActive(indexActive < 0 ? false : indexActive);
  }, [pathname]);

  const navTabs = menuItems.map((item, index) => (
    <Tab
      label={item.title}
      className={classes.tab}
      onClick={() => history.push(item.pageURL)}
      key={'menu-item-' + index}
    />
  ));

  const handleDrawerVisible = () => {
    setDrawerVisible((currentDrawerVisible) => !currentDrawerVisible);
  };

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
                href={`tel:${phoneNumber[0]}`}
              >
                <PhoneIcon />
              </IconButton>
            ) : (
              <>
                <Button
                  startIcon={<PhoneIphoneIcon />}
                  variant="outlined"
                  href={`tel:${phoneNumber[0]}`}
                  className={classes.Phone}
                >
                  {phoneNumber[0]}
                </Button>
                <Button
                  startIcon={<PhoneIcon />}
                  variant="outlined"
                  href={`tel:${phoneNumber[1]}`}
                  className={classes.Phone}
                >
                  {phoneNumber[1]}
                </Button>
              </>
            )}

            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerVisible}
            >
              <MenuIcon />
            </IconButton>
            <MenuDrawer
              visibleCallback={(currentVisible: boolean) =>
                setDrawerVisible(currentVisible)
              }
              visible={drawerVisible}
              menuItems={menuItems}
            />
          </Box>
        ) : (
          <>
            <Tabs value={active} classes={{ indicator: classes.indicator }}>
              {navTabs}
            </Tabs>
            <Box className={classes.PhonesContainer}>
              <Button
                startIcon={<PhoneIphoneIcon />}
                variant="outlined"
                href={`tel:${phoneNumber[0]}`}
                className={classes.Phone}
              >
                {phoneNumber[0]}
              </Button>
              <Button
                startIcon={<PhoneIcon />}
                variant="outlined"
                href={`tel:${phoneNumber[1]}`}
                className={classes.Phone}
              >
                {phoneNumber[1]}
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
