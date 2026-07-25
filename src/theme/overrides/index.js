import { merge } from 'lodash-es';

import Accordion from './Accordion';
import AccordionSummary from './AccordionSummary';
import Button from './Button';
import Container from './Container';
import Link from './Link';
import Tab from './Tab';

/***************************  OVERRIDES - MAIN  ***************************/

export default function ComponentsOverrides(theme) {
  return merge(
    Accordion(),
    AccordionSummary(),
    Button(theme),
    Container(),
    Link(theme),
    Tab()
  );
}
