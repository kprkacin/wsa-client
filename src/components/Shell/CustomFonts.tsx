import React from 'react';
import { Global } from '@mantine/core';
import bold from '../../assets/Dosis-Bold.ttf';
import heavy from '../../assets/Dosis-ExtraBold.ttf';
import light from '../../assets/Dosis-Light.ttf';
import extraLight from '../../assets/Dosis-ExtraLight.ttf';
import regular from '../../assets/Dosis-Regular.ttf';
import medium from '../../assets/Dosis-Medium.ttf';
import semi from '../../assets/Dosis-SemiBold.ttf';

const CustomFonts: React.FC = () => {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Dosis',
            src: `url('${extraLight}') format("ttf")`,
            fontWeight: 200,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Dosis',
            src: `url('${light}') format("ttf")`,
            fontWeight: 300,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Dosis',
            src: `url('${regular}') format("ttf")`,
            fontWeight: 400,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Dosis',
            src: `url('${medium}') format("ttf")`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Dosis',
            src: `url('${semi}') format("ttf")`,
            fontWeight: 600,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Dosis',
            src: `url('${bold}') format("ttf")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Dosis',
            src: `url('${heavy}') format("woff2")`,
            fontWeight: 800,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
};

export default CustomFonts;
