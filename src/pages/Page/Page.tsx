import React from 'react';

import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { PageSvc } from '../../services/PageSvc';
import { SideBar } from '../../components/SideBar/SideBar';
import { Title } from '../../components/Title/Title';
import { Content } from '../../components/Content/Content';

const useStyle = makeStyles((theme) => {
  const colorSecondary = '#000';
  return {
    Container: {
      justifyContent: 'center',
      alignContent: 'flex-start',
    },
    Content: {
      [theme.breakpoints.up('sm')]: { paddingLeft: 40 },
    },
    SubTitle: {
      color: colorSecondary,
      marginTop: 30,
    },
    Paragraph: {
      padding: 30,
      color: colorSecondary,
    },
    SideBar: {
      paddingTop: 30,
    },
  };
});

export const Page = () => {
  const classes = useStyle();

  const location = useLocation();
  const pathname = location.pathname.slice(1);

  const category = PageSvc.getCategory(pathname);

  const pages = category?.subPages;
  const categoryName = category?.category;
  const subTitles = category?.subPages.map((subPage) => subPage.title);
  const sideBarLinks = PageSvc.getSideBarLinks(pathname);

  const content = pages?.map((page, index) => {
    const divider = pages.length !== index + 1;
    if (subTitles) {
      return (
        <Box key={`page-${page}_${index}`}>
          {subTitles[index] && (
            <Typography variant="h4" component="h4" className={classes.SubTitle}>
              {subTitles[index]}
            </Typography>
          )}
          <Typography>
            <div className={classes.Paragraph} dangerouslySetInnerHTML={{ __html: page.content }} />
          </Typography>

          {divider && <Divider style={{ width: '90%', marginBottom: 30 }} />}
        </Box>
      );
    } else {
      return '';
    }
  });

  return (
    <Grid item container className={classes.Container}>
      <Grid item container justify="center" xs={12}>
        <Title title={categoryName!} />
      </Grid>
      <Content>
        {sideBarLinks && (
          <Grid item container sm={2} md={2} lg={3} justify="center" className={classes.SideBar}>
            <SideBar sideBarLinks={sideBarLinks} />
          </Grid>
        )}

        <Grid item container sm={10} md={10} lg={8} className={classes.Content}>
          {content}
        </Grid>
      </Content>
    </Grid>
  );
};
