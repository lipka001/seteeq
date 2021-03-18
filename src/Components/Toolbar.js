import React from 'react';
import {
  GridToolbarContainer,
  GridFilterToolbarButton,
} from '@material-ui/data-grid';

export default function Toolbar() {
  return (
    <GridToolbarContainer>
      <GridFilterToolbarButton />
    </GridToolbarContainer>
  );
}
