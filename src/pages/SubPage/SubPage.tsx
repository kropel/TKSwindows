import React from 'react';

import { useHistory, useParams } from 'react-router-dom';
import { SideBar } from '../../components/SideBar/SideBar';
import { PageSvc } from '../../services/PageSvc';
import { Title } from '../../components/Title/Title';
import { Content } from '../../components/Content/Content';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface IParams {
  category: string;
  subPage: string;
}
const useStyle = makeStyles((theme) => {
  const colorSecondary = '#000';
  return {
    container: {},

    card: {
      display: 'flex',
      width: '100%',
      '& > *': {
        flex: 1,
      },
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
export const SubPage = () => {
  const { category, subPage } = useParams<IParams>();
  const page = PageSvc.getSubPage(category, subPage);
  const history = useHistory();
  if (!page) {
    history.replace('/');
  }

  const sideBarLinks = PageSvc.getSideBarLinks(category);

  const classes = useStyle();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      item
      container
      className={classes.container}
      justify="center"
      alignContent="flex-start"
    >
      <Grid item container xs={12} justify="center">
        <Title title={category} subTitle={page?.title} />
      </Grid>

      <Content>
        {!isMobile && sideBarLinks && (
          <Grid item container sm={4} justify="center" className={classes.SideBar}>
            <SideBar sideBarLinks={sideBarLinks} />
          </Grid>
        )}

        <Grid item container sm={10} md={10} lg={8}>
          <Grid item container>
            <Typography>
              <div
                className={classes.Paragraph}
                dangerouslySetInnerHTML={{ __html: page?.content || '' }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Content>
    </Grid>
  );
};
