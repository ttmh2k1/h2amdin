import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import * as Icon from 'react-icons/md';

import styles from '../styles/components/contentBoxStyles'
function ButtonAtom({
  disabled,
  border,
  color,
  children,
  className,
  isIcon,
  muiClasses,

  //  props for button has only icon
  buttonIcon,
  buttonIconName, // for button have only icon

  // props for button status
  buttonStatus,
  buttonStatusActive,
  margin,
  minWidth,
  width,
  height,
  maxWidth,
  isFooterButton,
  IconComponent,

  ...rest
}) {
  const useStyles = makeStyles(styles);

  // props pass to style
  const properties = {
    margin:
      margin
      || (isFooterButton ? '1rem 1rem 1rem 1rem' : '0rem 2.5rem 0rem 2.5rem'),
    minWidth: minWidth || '12rem',
    maxWidth: maxWidth || '12rem',
    width: width || '100%',
    height: height && height
  };

  const style = useStyles(properties);

  const buttonClass = classNames({
    [style.button]: true,
    [style[color]]: color,
    [style.border]: border,
    [style.disabled]: disabled,
    [style.isIcon]: isIcon,
    [className]: className
  });

  const buttonOnlyIconClass = classNames({
    [style.buttonIcon]: true,
    [style[color]]: color
  });

  const buttonStatusClass = classNames({
    [style.buttonStatus]: true,
    [style.disable]: !buttonStatusActive,
    [style.green]: buttonStatusActive,
    [style[color]]: color
  });

  // eslint-disable-next-line import/namespace
  const IconOnly = buttonIconName ? Icon[buttonIconName] : IconComponent;

  if (buttonIcon) {
    return (
      <Button classes={{ ...muiClasses, root: buttonOnlyIconClass }} {...rest}>
        <IconOnly size="1.5rem" color="#fff" />
      </Button>
    );
  }
  if (buttonStatus) {
    return (
      <Button classes={{ ...muiClasses, root: buttonStatusClass }} {...rest}>
        {children}
      </Button>
    );
  }
  return (
    <Button
      classes={{ ...muiClasses, root: buttonClass }}
      disabled={disabled}
      {...rest}
    >
      {children || 'Button'}
    </Button>
  );
}

/**
 * return Component status
 * @param  {Boolean} {status -- status of current button
 * @param  {String} titleActive  -- title when button active
 * @param  {String} titleInactive -- title when button inactive
 * @param  {Function} onClickActive -- func when click active button
 * @param  {Function} onClickInactive -- function when click inactive button }
 */
export const ButtonStatus = ({
  status,
  titleActive = '??ang ??p d???ng',
  titleInactive = 'V?? hi????u ho??a',
  onClickActive = {},
  onClickInactive = {}
}) => (status === true ? (
  <>
    <ButtonAtom buttonStatusActive buttonStatus onClick={() => onClickActive}>
      {titleActive}
    </ButtonAtom>
  </>
) : (
  <>
    <ButtonAtom color="gray" buttonStatus onClick={() => onClickInactive}>
      {titleInactive}
    </ButtonAtom>
  </>
));

/* status in order BUSSINESS */
const arrDetailStatusOrder = [
  {
    title: '???? h???y',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: 'Ch??? ph?? duy???t',
    status: 'wait_for_confirmation',
    color: 'bluelight'
  },
  {
    title: '???? ph?? duy???t',
    status: 'confirmed',
    color: 'blue'
  },
  {
    title: '???? thanh to??n',
    status: 'paid',
    color: 'purple'
  },
  {
    title: '???? ????ng g??i',
    status: 'packed',
    color: 'brown'
  },
  {
    title: 'Ch??? l???y h??ng',
    status: 'ready_to_pick',
    color: 'yellow'
  },
  {
    title: '??ang giao h??ng',
    status: 'transporting',
    color: 'gray'
  },
  {
    title: '???? giao h??ng',
    status: 'delivered',
    color: 'green'
  },
  {
    title: 'Ho??n t???t',
    status: 'completed',
    color: 'bluelight'
  },
  {
    title: '????nh gi??',
    status: 'reviewed',
    color: 'bluelight'
  },
  {
    title: 'L???i',
    status: 'false',
    color: 'red'
  },
  {
    title: '???? d???ng',
    status: 'stoped',
    color: 'red'
  }
];

/* status in order quote order industry */
const arrDetailStatusOrderQuote = [
  {
    title: '???? h???y',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: 'Ch??? ph?? duy???t',
    status: 'waiting_for_approval',
    color: 'bluelight'
  },
  {
    title: '???? ph?? duy???t',
    status: 'approved',
    color: 'blue'
  },
  {
    title: '???? t??? ch???i',
    status: 'refused',
    color: 'red'
  },
  {
    title: '???? g???i b??o gi??',
    status: 'quoted',
    color: 'green'
  }
];

/* status in order INDUSTRY */
const arrDetailStatusOrderIndustry = [
  {
    title: '???? h???y',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: '???? t??? ch???i',
    status: 'refused',
    color: 'red'
  },
  {
    title: 'Ho??n t???t',
    status: 'completed',
    color: 'bluelight'
  },
  {
    title: 'Ch??? ??i???u ph???i',
    status: 'waiting_for_coordination',
    color: 'green'
  },
  {
    title: 'Ch??? ph?? duy???t',
    status: 'waiting_for_approval',
    color: 'bluelight'
  }
];

/* status in order DRAFT */
const arrDetailStatusOrderDraft = [
  {
    title: '???? h???y',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: 'Ch??? t???o ????n',
    status: 'waiting_order_create',
    color: 'green'
  },
  {
    title: '???? t???o ????n h??ng',
    status: 'order_created',
    color: 'blue'
  }
];

const arrDetailStatusOrderIndustryCoordinator = [
  {
    title: '???? giao h??ng',
    status: 'delivered',
    color: 'green'
  },
  {
    title: '???? ??i???u ph???i',
    status: 'coordinated',
    color: 'blue'
  },
  {
    title: '???? h???y',
    status: 'cancelled',
    color: 'red'
  }
];

/* status in order PROMOTION */
const arrDetailStatusPromotion = [
  {
    title: '???? k???t th??c',
    status: 'finished',
    color: 'red'
  },
  {
    title: '??ang ??p d???ng',
    status: 'applying',
    color: 'green'
  },
  {
    title: 'S???p ??p d???ng',
    status: 'comingSoon',
    color: 'yellow'
  },
  {
    title: 'V?? hi????u ho??a',
    status: 'disabled',
    color: 'grey'
  },
  {
    title: '???? hu???',
    status: 'cancelled',
    color: 'red'
  }
];

export const ButtonStatusOrder = ({
  status,
  isOrderIndustry = false,
  isOrderQuote = false,
  isOrderDraft = false,
  isOrderIndustryCoordinator = false,
  isPromotion = false,
  onClickActive = {},
  onClickInactive = {}
}) => {
  const detail = isOrderIndustry
    ? arrDetailStatusOrderIndustry.filter(item => item.status === status)[0]
    : isOrderQuote
      ? arrDetailStatusOrderQuote.filter(item => item.status === status)[0]
      : isOrderDraft
        ? arrDetailStatusOrderDraft.filter(item => item.status === status)[0]
        : isOrderIndustryCoordinator
          ? arrDetailStatusOrderIndustryCoordinator.filter(
            item => item.status === status
          )[0]
          : isPromotion
            ? arrDetailStatusPromotion.filter(item => item.status === status)[0]
            : arrDetailStatusOrder.filter(item => item.status === status)[0];
  return (
    <>
      <ButtonAtom
        buttonStatus
        color={detail?.color}
        onClick={() => onClickActive}
      >
        {detail?.title}
      </ButtonAtom>
    </>
  );
};
ButtonAtom.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'warning',
    'blue',
    'bluelight',
    'red',
    'yellow',
    'purple',
    'green',
    'transparent',
    'white',
    'brown',
    'grey'
  ]),
  disabled: PropTypes.bool,
  border: PropTypes.bool,
  isIcon: PropTypes.bool,
  buttonIcon: PropTypes.bool,
  buttonIconName: PropTypes.string, // name of icon : react-icon/md
  buttonStatus: PropTypes.bool,
  buttonStatusActive: PropTypes.bool
};

export default ButtonAtom;
