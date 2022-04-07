import { Grid } from '@mui/material';
import React from 'react';

/** 提供统一的可变形网格 */
const AppGridItem: React.FC = ({ children }) => (
  <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
    {children}
  </Grid>
);

export default AppGridItem;
