import { Grid } from '@mui/material';
import React from 'react';

const AppGridItem: React.FC = ({ children }) => (
  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
    {children}
  </Grid>
);

export default AppGridItem;
