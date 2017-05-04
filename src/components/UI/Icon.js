import React from 'react';
import {
  Svg,
  G,
} from 'react-native-svg';
//
import svgs from './../../static/img/icons.js';

const Icon = ({ fill, height, name, stroke, style, viewBox, width }) => {
  return (
    <Svg
        height={height}
        width={width}
        viewBox={viewBox}
        style={style}
    >
      <G fill={fill} stroke={stroke}>
        {svgs[name]}
      </G>
    </Svg>
  );
};


Icon.propTypes = {
  fill: React.PropTypes.string,
  height: React.PropTypes.number,
  name: React.PropTypes.string,
  stroke: React.PropTypes.string,
  style: React.PropTypes.object,
  viewBox: React.PropTypes.string,
  width: React.PropTypes.number,
};

Icon.defaultProps = {
  height: 32,
  viewBox: '0 0 32 32',
  width: 32,
};

export default Icon;
