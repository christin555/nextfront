import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary} from '@mui/material';
import s from '../Filter.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

const SimpleAccordion = (props) => {
  const {id, name, children, active} = props;

  return (
    <Accordion elevation={0} square={true} key={id} className={s.accordionItem}>
      <AccordionSummary className={s.summary} expandIcon={<ExpandMoreIcon />}  >
        <span className={s.heading}>
          {name}
          {active && <span className={s.active} />}
        </span>
      </AccordionSummary>
      <AccordionDetails className={s.details}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

SimpleAccordion.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool
};
export default SimpleAccordion;
