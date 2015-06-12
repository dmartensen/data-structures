
           
            function ProductRotatorFactory(slidesArray, numCols) {

                var currentSlide = 0,
                    clickable = true;

                //  private, called from prevClick
                function slideRight(currentSlide, slidesArray, numCols) {

                    var curr, k = 0, len = slidesArray.length;

                    for(curr = currentSlide; k < (numCols * 2); k++, curr = ++curr % len) {
                        setSlideRight(slidesArray[curr], k);
                        animateSlideRight(slidesArray[curr], k);
                    }

                    // remainders stick to right side
                    while(k < len) {
                        setSlideRight(slidesArray[curr], numCols * 2);
                        curr = ++curr % len;
                        k++;
                    }
                }

                //  next, or called by clicking a circle
                function slideLeft(currentSlide, slidesArray, numCols) {

                    var curr, k = 0, len = slidesArray.length;

                    for(curr = currentSlide; k < (numCols * 2); k++, curr = ++curr % len) {
                        setSlideLeft(slidesArray[curr], k);
                        animateSlideLeft(slidesArray[curr], k);
                    }

                    // remainders stick to right side
                    while(k < len) {
                        setSlideLeft(slidesArray[curr], numCols * 2);
                        curr = ++curr % len;
                        k++;
                    }
                }

                function setSlideLeft(slide, k) {
                     slide.animClass = 'slide-left-'+k;
                     slide.animTrans = '';
                }

                function animateSlideLeft(slide, k) {
                    $timeout(function() {
                        slide.animTrans = 'slide-transition-'+k;
                    }, 75);
                }

                function setSlideRight(slide, k) {
                     slide.animClass = 'slide-right-'+k;
                     slide.animTrans = '';
                }

                function animateSlideRight(slide, k) {
                    $timeout(function() {
                        slide.animTrans = 'slide-transition-r-'+k;
                    }, 75);
                }


                // normalizes list size to multiple of number of columns so rotations 
                // are consistent  by adding dummy node into list that's a blank slide
                (function initListSize(slidesArray, numCols) {
                    // add DUMMY project, change to check for % 3 === 0.
                    while(slidesArray.length % numCols !== 0) {
                        slidesArray.push({});
                    }

                }(slidesArray, numCols));

                (function initPositions(slidesArray, numCols) {
                    for(var i = 0; i < slidesArray.length; i++) {
                        if(i < (numCols * 2)) {
                            slidesArray[i].animClass = 'slide-left-' + i;
                        } else {
                            slidesArray[i].animClass = 'slide-left-6';
                        }
                    }
                }(slidesArray, numCols));


                return {
                    
                    prevClick: function() {

                        if(clickable === true) {
                            clickable = false;

                            currentSlide -= numCols;

                            //  wrap around
                            if(currentSlide < 0) {
                                currentSlide = slidesArray.length + currentSlide;
                            }

                            slideRight(currentSlide, slidesArray, numCols);

                            setTimeout(function() {
                                clickable = true;
                            }, 600);
                        }
                    },

                    nextClick: function() {

                        if(clickable === true) {
                            clickable = false;

                            slideLeft(currentSlide, slidesArray, numCols);
                            
                            currentSlide += numCols;
                            
                            if(currentSlide >= slidesArray.length) {
                                currentSlide = 0;
                            }

                            setTimeout(function() {
                                clickable = true;
                            }, 600);
                        }
                    },

                    getCurrentIndex: function() {
                        return currentSlide;
                    }
                };
            };
