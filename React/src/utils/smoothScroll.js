import TWEEN from '@tweenjs/tween.js'

function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
}
requestAnimationFrame(animate)

function smoothScroll(el, position, duration = 500) {
    let coords = getCoords(el)
    new TWEEN.Tween(coords)
        .to({ x: position.x, y: position.y }, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function() {
            el.scrollTo(coords.x, coords.y)
        })
        .start()
}

function getCoords(el) {
    if (el === window) {
        return {
            x: window.scrollX,
            y: window.scrollY
        }
    } else {
        return {
            x: el.scrollLeft,
            y: el.scrollTop
        }
    }
}

export { smoothScroll }