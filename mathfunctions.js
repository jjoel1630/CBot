exports.calculateCircumference = (radius) => {
    return 2 * Math.PI * radius;
}

exports.degToRag = (deg) => {
    return deg * (Math.PI / 180);
}

exports.radToDeg = (rad) => {
    return rad / (Math.PI / 180);
}

exports.apothem = (deg) => {
    50 * Math.tan(this.degToRag(deg));
}

exports.cubeRoot = (number) => {
    return Math.cbrt(number);
}

exports.squareRoot = (number) => {
    return Math.sqrt(number);
}

exports.power = (x, y) => {
    return Math.pow(x, y);
}