import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { TMenuItem } from '../Header/Header';
import { PageSvc } from '../../services/PageSvc';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles({
  list: {
    width: '100%',
    maxWidth: 360,
    transition: 'width 0.8s',
  },
  nested: {
    paddingLeft: 20,
  },
});

interface Props {
  visible: boolean;
  visibleCallback: (visible: boolean) => void;
  menuItems: TMenuItem[];
}

interface IMenuItem {
  title: string;
  url: string;
  isSubMenu: boolean;
  subMenu: { title: string; url: string }[];
}

const getMenuItem = (category: TMenuItem): IMenuItem => {
  const item: IMenuItem = {
    title: category.title,
    url: category.pageURL,
    isSubMenu: false,
    subMenu: [],
  };

  const sub = PageSvc.getSideBarLinks(category.pageURL.slice(1));
  if (sub && sub.length !== 0) {
    item['isSubMenu'] = true;
    item.subMenu = sub;
  }

  return item;
};

export const MenuDrawer: FC<Props> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});
  let [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);

  useEffect(() => {
    const menuItemsTemp = props.menuItems.map((item) => {
      const menuItem = getMenuItem(item);

      if (menuItem.isSubMenu) {
        setOpenSubMenus((currentSubOpen) => ({
          ...currentSubOpen,
          [menuItem.title]: false,
        }));
      }

      return menuItem;
    });
    setMenuItems(menuItemsTemp);
  }, [props.menuItems]);

  const closeDrawer = () => {
    props.visibleCallback(false);
    setVisible(false);
  };

  const subMenuClickToggle = (itemTitle: string): void => {
    setOpenSubMenus((currentSubOpen) => ({
      ...currentSubOpen,
      [itemTitle]: !currentSubOpen[itemTitle],
    }));
  };

  const linkClickHandler = (url: string): void => {
    closeDrawer();
    history.push(url);
  };

  const drawerContent = () => (
    <div
      className={classes.list}
      role="presentation"
      onKeyDown={() => {
        closeDrawer();
      }}
    >
      {menuItems.map((menuItem, index) => {
        if (menuItem.isSubMenu) {
          return (
            <React.Fragment key={`menuItem-${menuItem.title}-${index}`}>
              <ListItem button onClick={() => subMenuClickToggle(menuItem.title)}>
                {openSubMenus[menuItem.title] ? <ExpandLess /> : <ExpandMore />}
                <ListItemText primary={menuItem.title} />
              </ListItem>
              <Collapse in={openSubMenus[menuItem.title]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.nested}>
                  {menuItem.subMenu.map((subItem, index) => (
                    <ListItem
                      onClick={() => linkClickHandler(subItem.url)}
                      button
                      key={`subMenuItem-${subItem.title}-${index}`}
                    >
                      <ListItemText primary={subItem.title} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        } else {
          return (
            <ListItem
              onClick={() => linkClickHandler(menuItem.url)}
              button
              key={`menuItem-${menuItem.title}-${index}`}
            >
              <ListItemText primary={menuItem.title} />
            </ListItem>
          );
        }
      })}
    </div>
  );

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={() => {
        closeDrawer();
      }}
    >
      <List component="nav">{drawerContent()}</List>
    </Drawer>
  );
};
