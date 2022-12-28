import Box from '@material-ui/core/Box';
import className from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/contentBoxStyles';
import Button from './Button';

Container.propTypes = {};
function Container(properties) {
  const classes = styles();
  const { children } = properties;
  return <Box className={classes.container}>{children}</Box>;
}

Title.propTypes = {
  title: PropTypes.string,
  right: PropTypes.any,
  noPadding: PropTypes.bool
};

function Title(properties) {
  const classes = styles();
  const { title, right, noPadding } = properties;

  const classNameTitleContainer = className({
    [classes.titleContainer]: true,
    [classes.titleContainerNoPadding]: noPadding
  });
  return (
    <Box className={classNameTitleContainer}>
      <Box className={classes.title}>{title}</Box>
      {right ? <Box className={classes.titleRight}>{right}</Box> : null}
    </Box>
  );
}

Body.propTypes = {};
function Body(properties) {
  const classes = styles();
  const { children } = properties;
  return <Box className={classes.body}>{children}</Box>;
}

Footer.propTypes = {
  isGoBack: PropTypes.bool
};

const FooterComponent = ({ children, isGoBack }) => {
  const navigate = useNavigate();
  return (
    <>
      {children}
      {isGoBack && (
        <Button
          startIcon={<FaArrowCircleLeft color='#955b36' size={"1.6rem"} />}
          maxWidth="8rem"
          color="white"
          isFooterButton
          onClick={() => navigate(-1)}
          style={{ color: '#955b36', height: '3.2rem', fontSize: "1.6rem" }}
        >
          Back
        </Button>
      )}
    </>
  );
};

/**
 * @param  {Object} properties
 * @property {Boolean} isGoBack
 */
function Footer(properties) {
  const classes = styles();
  const { children, isGoBack } = properties;
  if (!children && !isGoBack) return null;
  return (
    <Box className={classes.footer}>
      {/* <FooterComponent children={children} /> */}
      <FooterComponent isGoBack={isGoBack}>{children}</FooterComponent>
    </Box>
  );
}
// none background
Footer2.propTypes = {
  isGoBack: PropTypes.bool
};
function Footer2(properties) {
  const classes = styles();
  const { children, isGoBack } = properties;
  if (!children && !isGoBack) return null;
  return (
    <Box className={classes.footer2}>
      {/* <FooterComponent children={children} /> */}
      <FooterComponent isGoBack={isGoBack}>{children}</FooterComponent>
    </Box>
  );
}

ChildrenBox.propTypes = {};
function ChildrenBox(properties) {
  const classes = styles();
  const { children } = properties;

  return <Box className={classes.childrenBox}>{children}</Box>;
}

export default {
  Container,
  Title,
  Body,
  Footer,
  Footer2,
  ChildrenBox
};
