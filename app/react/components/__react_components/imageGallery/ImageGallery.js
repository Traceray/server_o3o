'use strict';

import React ,{Component,PropTypes} from "react";

import Swipeable from 'react-swipeable';

const styles = require("./ImageGallery.scss");

class ImageGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.startIndex,
            thumbnailsTranslateX: 0,
            containerWidth: 0
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.containerWidth !== this.state.containerWidth ||
            prevProps.showThumbnails !== this.props.showThumbnails) {

            // adjust thumbnail container when window width is adjusted
            // when the container resizes, thumbnailsTranslateX
            // should always be negative (moving right),
            // if container fits all thumbnails its set to 0

            this._setThumbnailsTranslateX(
                -this._getScrollX(this.state.currentIndex > 0 ? 1 : 0) *
                this.state.currentIndex);

        }

        if (prevState.currentIndex !== this.state.currentIndex) {

            // call back function if provided
            if (this.props.onSlide) {
                this.props.onSlide(this.state.currentIndex);
            }

            // calculates thumbnail container position
            if (this.state.currentIndex === 0) {
                this._setThumbnailsTranslateX(0);
            } else {
                let indexDifference = Math.abs(
                    prevState.currentIndex - this.state.currentIndex);
                let scrollX = this._getScrollX(indexDifference);
                if (scrollX > 0) {
                    if (prevState.currentIndex < this.state.currentIndex) {
                        this._setThumbnailsTranslateX(
                            this.state.thumbnailsTranslateX - scrollX);
                    } else if (prevState.currentIndex > this.state.currentIndex) {
                        this._setThumbnailsTranslateX(
                            this.state.thumbnailsTranslateX + scrollX);
                    }
                }
            }
        }

    }


    componentDidMount() {
        this._handleResize();
        if (this.props.autoPlay) {
            this.play();
        }
        if (window.addEventListener) {
            window.addEventListener('resize', this._handleResize.bind(this));
        } else if (window.attachEvent) {
            window.attachEvent('onresize', this._handleResize.bind(this));
        }
    }


    componentWillUnmount() {
        if (window.removeEventListener) {
            window.removeEventListener('resize', this._handleResize.bind(this));
        } else if (window.detachEvent) {
            window.detachEvent('onresize', this._handleResize.bind(this));
        }

        if (this._intervalId) {
            window.clearInterval(this._intervalId);
            this._intervalId = null;
        }
    }


    slideToIndex(index, event) {
        let slideCount = this.props.items.length - 1;

        if (index < 0) {
            this.setState({currentIndex: slideCount});
        } else if (index > slideCount) {
            this.setState({currentIndex: 0});
        } else {
            this.setState({currentIndex: index});
        }
        if (event) {
            if (this._intervalId) {
                // user event, reset interval
                this.pause();
                this.play();
            }
            event.preventDefault();
        }
    }


    play() {
        if (this._intervalId) {
            return;
        }

        this._intervalId = setInterval(function () {
            if (!this.state.hovering) {
                this.slideToIndex(this.state.currentIndex + 1);
            }
        }.bind(this), this.props.slideInterval);

    }


    pause() {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
            this._intervalId = null;
        }
    }


    _setThumbnailsTranslateX(x) {
        this.setState({thumbnailsTranslateX: x});
    }


    _handleResize() {
        this.setState({containerWidth: this.refs.imageGallery.offsetWidth});
    }

    _getScrollX(indexDifference) {
        if (this.refs.thumbnails) {
            let thumbNode = this.refs.thumbnails;
            if (thumbNode.scrollWidth <= this.state.containerWidth) {
                return 0;
            }
            let totalThumbnails = thumbNode.children.length;

            // total scroll-x required to see the last thumbnail
            let totalScrollX = thumbNode.scrollWidth - this.state.containerWidth;

            // scroll-x required per index change
            let perIndexScrollX = totalScrollX / (totalThumbnails - 1);

            return indexDifference * perIndexScrollX;
        }
    }


    _handleMouseOver() {
        this.setState({hovering: true});
    }


    _handleMouseLeave() {
        this.setState({hovering: false});
    }

    _getAlignmentClassName(index) {
        let currentIndex = this.state.currentIndex;
        let alignment = '';
        switch (index) {
            case (currentIndex - 1):
                alignment = styles.left;
                break;
            case (currentIndex):
                alignment = styles.center;
                break;
            case (currentIndex + 1):
                alignment = styles.right;
                break;
        }

        if (this.props.items.length >= 3) {
            if (index === 0 && currentIndex === this.props.items.length - 1) {
                // set first slide as right slide if were sliding right from last slide
                alignment = styles.right;
            } else if (index === this.props.items.length - 1 && currentIndex === 0) {
                // set last slide as left slide if were sliding left from first slide
                alignment = styles.left;
            }
        }

        return alignment;
    }


    render() {


        let currentIndex = this.state.currentIndex;
        let thumbnailStyle = {
            MozTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
            WebkitTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
            OTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
            msTransform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)',
            transform: 'translate3d(' + this.state.thumbnailsTranslateX + 'px, 0, 0)'
        };

        let slides = [];
        let thumbnails = [];
        let bullets = [];


        this.props.items.map((item, index) => {
            let alignment = this._getAlignmentClassName(index);
            let originalClass = item.originalClass ? ' ' + item.originalClass : '';
            let thumbnailClass = item.thumbnailClass ? ' ' + item.thumbnailClass : '';

            let slide = (
                <div
                    key={index}
                    className={styles.imageGallerySlide +" "+ alignment +" "+ originalClass}>
                    <img src={item.original}/>
                    {item.description}
                </div>
            );

            if (this.props.lazyLoad) {
                if (alignment) {
                    slides.push(slide);
                }
            } else {
                slides.push(slide);
            }

            if (this.props.showThumbnails) {
                thumbnails.push(
                    <a
                        key={index}
                        className={styles.imageGalleryThumbnail +" "+
              (currentIndex === index ? styles.active : '') +" "+
              thumbnailClass
            }

                        onTouchStart={this.slideToIndex.bind(this, index)}
                        onClick={this.slideToIndex.bind(this, index)}>

                        <img src={item.thumbnail}/>
                    </a>
                );
            }

            if (this.props.showBullets) {
                bullets.push(
                    <li
                        key={index}
                        className={
              styles.imageGalleryBullet  + ' '+(
                currentIndex === index ? styles.active : '')}

                        onTouchStart={this.slideToIndex.bind(this, index)}
                        onClick={this.slideToIndex.bind(this, index)}>
                    </li>
                );
            }
        });

        let swipePrev = this.slideToIndex.bind(this, currentIndex - 1);
        let swipeNext = this.slideToIndex.bind(this, currentIndex + 1);

        return (
            <section ref='imageGallery' className={styles.imageGallery}>
                <div
                    onMouseOver={this._handleMouseOver.bind(this)}
                    onMouseLeave={this._handleMouseLeave.bind(this)}
                    className={styles.imageGalleryContent}>
                    {
                        this.props.items.length >= 2 ?
                            [
                                this.props.showNav &&
                                [
                                    <a
                                        key='leftNav'
                                        className={styles.imageGalleryLeftNav}
                                        onTouchStart={swipePrev}
                                        onClick={swipePrev}/>,
                                    <a
                                        key='rightNav'
                                        className={styles.imageGalleryRighNav}
                                        onTouchStart={swipeNext}
                                        onClick={swipeNext}/>
                                ],

                                <Swipeable
                                    key='swipeable'
                                    onSwipedLeft={swipeNext}
                                    onSwipedRight={swipePrev}>
                                    <div className={styles.imageGallerySlides}>
                                        {slides}
                                    </div>
                                </Swipeable>
                            ]
                            :
                            <div className={styles.imageGallerySlides}>
                                {slides}
                            </div>
                    }
                    {
                        this.props.showBullets &&
                        <div className={styles.imageGalleryBullets}>
                            <ul className={styles.imageGalleryBulletsContainer}>
                                {bullets}
                            </ul>
                        </div>
                    }
                </div>

                {
                    this.props.showThumbnails &&
                    <div className={styles.imageGalleryThumbnails}>
                        <div
                            ref='thumbnails'
                            className={styles.imageGalleryThumbnailsContainer}
                            style={thumbnailStyle}>
                            {thumbnails}
                        </div>
                    </div>
                }
            </section>
        );

    }


}

ImageGallery.propTypes = {
    items: React.PropTypes.array.isRequired,
    showThumbnails: React.PropTypes.bool,
    showBullets: React.PropTypes.bool,
    showNav: React.PropTypes.bool,
    autoPlay: React.PropTypes.bool,
    lazyLoad: React.PropTypes.bool,
    slideInterval: React.PropTypes.number,
    onSlide: React.PropTypes.func,
    startIndex: React.PropTypes.number
};

ImageGallery.defaultProps = {
    lazyLoad: true,
    showThumbnails: true,
    showBullets: false,
    showNav: true,
    autoPlay: false,
    slideInterval: 4000,
    startIndex: 0
};

export default ImageGallery;
