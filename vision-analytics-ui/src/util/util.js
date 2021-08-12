function scrollSmoothtoTop() {
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth'
      });
}


function scrollToTop() {
    window.scrollTo(0, 0);
}


export {
    scrollSmoothtoTop,
    scrollToTop
}
