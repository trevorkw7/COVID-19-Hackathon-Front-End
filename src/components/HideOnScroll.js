import React from 'react';
import Slide from '@material-ui/core/Slide'
import { useScrollTrigger, Box } from '@material-ui/core';

export default function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={props.direction} in={!trigger}>
      {children}
    </Slide>
  );
}
