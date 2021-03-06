import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { GallereactProvider } from './GallereactContext';
import Slider from './Slider';
import Arrows from './Arrows';
import Dots from './Dots';
import Preview from './Preview';

import { S_Container, S_Gallery } from './style.js';

const Gallereact = props => {
  const {
    cover = true,
    loop = true,
    callback,
    containerStyle,
    autoPlay,
    duration = 2000,
    inputIndex,
    images = [],
    swipe = false,
    displayPreview = false,
  } = props;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const play = autoPlay && setTimeout(goToNextSlide, duration);
    return () => clearTimeout(play);
  }, [index, autoPlay]);

  useEffect(() => {
    goToSlide(inputIndex);
  }, [inputIndex]);

  const goToPreviousSlide = () => {
    let i = index;
    if (index > 0) i = index - 1;
    else if (!swipe && loop) i = images.length - 1;
    goToSlide(i);
  };

  const goToNextSlide = () => {
    let i = index;
    if (index < images.length - 1) i = index + 1;
    else if (!swipe && loop) i = 0;
    goToSlide(i);
  };

  const goToSlide = i => {
    if (i >= 0 && i < images.length) {
      setIndex(i);
      callback && callback(i);
    }
  };

  if (!images.length) return null;

  return (
    <GallereactProvider value={{ ...props, index, goToPreviousSlide, goToNextSlide, goToSlide }}>
      <S_Container>
        <S_Gallery cover={cover} style={containerStyle}>
          <Slider />
          <Arrows />
        </S_Gallery>
        {displayPreview ? <Preview /> : <Dots />}
      </S_Container>
    </GallereactProvider>
  );
};

Gallereact.propTypes = {
  cover: PropTypes.bool.isRequired,
  loop: PropTypes.bool.isRequired,
  duration: PropTypes.bool.isRequired,
  swipe: PropTypes.bool.isRequired,
  autoPlay: PropTypes.bool.isRequired,
  displayPreview: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  inputIndex: PropTypes.number.isRequired,
  containerStyle: PropTypes.object,
  images: PropTypes.array,
};

export default Gallereact;
