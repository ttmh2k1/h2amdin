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
  titleActive = 'Đang áp dụng',
  titleInactive = 'Vô hiệu hóa',
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
    title: 'Đã hủy',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: 'Chờ phê duyệt',
    status: 'wait_for_confirmation',
    color: 'bluelight'
  },
  {
    title: 'Đã phê duyệt',
    status: 'confirmed',
    color: 'blue'
  },
  {
    title: 'Đã thanh toán',
    status: 'paid',
    color: 'purple'
  },
  {
    title: 'Đã đóng gói',
    status: 'packed',
    color: 'brown'
  },
  {
    title: 'Chờ lấy hàng',
    status: 'ready_to_pick',
    color: 'yellow'
  },
  {
    title: 'Đang giao hàng',
    status: 'transporting',
    color: 'gray'
  },
  {
    title: 'Đã giao hàng',
    status: 'delivered',
    color: 'green'
  },
  {
    title: 'Hoàn tất',
    status: 'completed',
    color: 'bluelight'
  },
  {
    title: 'Đánh giá',
    status: 'reviewed',
    color: 'bluelight'
  },
  {
    title: 'Lỗi',
    status: 'false',
    color: 'red'
  },
  {
    title: 'Đã dừng',
    status: 'stoped',
    color: 'red'
  }
];

/* status in order quote order industry */
const arrDetailStatusOrderQuote = [
  {
    title: 'Đã hủy',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: 'Chờ phê duyệt',
    status: 'waiting_for_approval',
    color: 'bluelight'
  },
  {
    title: 'Đã phê duyệt',
    status: 'approved',
    color: 'blue'
  },
  {
    title: 'Đã từ chối',
    status: 'refused',
    color: 'red'
  },
  {
    title: 'Đã gửi báo giá',
    status: 'quoted',
    color: 'green'
  }
];

/* status in order INDUSTRY */
const arrDetailStatusOrderIndustry = [
  {
    title: 'Đã hủy',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: 'Đã từ chối',
    status: 'refused',
    color: 'red'
  },
  {
    title: 'Hoàn tất',
    status: 'completed',
    color: 'bluelight'
  },
  {
    title: 'Chờ điều phối',
    status: 'waiting_for_coordination',
    color: 'green'
  },
  {
    title: 'Chờ phê duyệt',
    status: 'waiting_for_approval',
    color: 'bluelight'
  }
];

/* status in order DRAFT */
const arrDetailStatusOrderDraft = [
  {
    title: 'Đã hủy',
    status: 'cancelled',
    color: 'red'
  },
  {
    title: 'Chờ tạo đơn',
    status: 'waiting_order_create',
    color: 'green'
  },
  {
    title: 'Đã tạo đơn hàng',
    status: 'order_created',
    color: 'blue'
  }
];

const arrDetailStatusOrderIndustryCoordinator = [
  {
    title: 'Đã giao hàng',
    status: 'delivered',
    color: 'green'
  },
  {
    title: 'Đã điều phối',
    status: 'coordinated',
    color: 'blue'
  },
  {
    title: 'Đã hủy',
    status: 'cancelled',
    color: 'red'
  }
];

/* status in order PROMOTION */
const arrDetailStatusPromotion = [
  {
    title: 'Đã kết thúc',
    status: 'finished',
    color: 'red'
  },
  {
    title: 'Đang áp dụng',
    status: 'applying',
    color: 'green'
  },
  {
    title: 'Sắp áp dụng',
    status: 'comingSoon',
    color: 'yellow'
  },
  {
    title: 'Vô hiệu hóa',
    status: 'disabled',
    color: 'grey'
  },
  {
    title: 'Đã huỷ',
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
