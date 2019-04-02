function drawBarrel(a, xoffset, yoffset, width, length, alpha, isghost, type, image, colour) {
    ctx.save();
    length = Math.abs(length);
    width = Math.abs(width);
    if (newGraph === false) {
        ctx.strokeStyle = "rgba(85, 85, 85, " + alpha + ")";
    } else {
        ctx.strokeStyle = ColorLuminance(colour, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = colour;
    ctx.globalAlpha = alpha;
    ctx.translate(tankpointx, tankpointy, 0);
    if (editmode === false) {
        ctx.rotate((angle(tankpointx, tankpointy, mouse.x, mouse.y) + a) * (Math.PI / 180));
    } else if ((isghost === true) && (shiftheld === true)) {
        //if ((a <= -172.5) || (a >= 172.5)) {
        //a = 180;
        //}
        a -= a % (document.getElementById("increment").value);
        ctx.rotate(a * (Math.PI / 180));
    } else {
        ctx.rotate(a * (Math.PI / 180));
    }

    if (image === "leftTriangle") {
        ctx.beginPath();
        ctx.moveTo(xoffset + length / 2, -(width / 2) - yoffset);
        ctx.lineTo(xoffset + length / 2, (width / 2) - yoffset);
        ctx.lineTo(xoffset + length, (width / 2) - yoffset);
        ctx.lineTo(xoffset + length / 2, -(width / 2) - yoffset);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (image === "rightTriangle") {
        ctx.beginPath();
        ctx.moveTo(xoffset + length / 2, -(width / 2) - yoffset);
        ctx.lineTo(xoffset + length / 2, (width / 2) - yoffset);
        ctx.lineTo(xoffset + length, -(width / 2) - yoffset);
        ctx.lineTo(xoffset + length / 2, -(width / 2) - yoffset);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (image === "trap") {
        ctx.beginPath();
        ctx.moveTo(xoffset + length / 2, -(width / 2) - yoffset);
        ctx.lineTo(xoffset + length / 2 + (length / 2), 0 - ((width * 1.5) + yoffset));
        ctx.lineTo(xoffset + length / 2 + (length / 2), ((width * 1.5) - yoffset));
        ctx.lineTo(xoffset + length / 2, (width / 2) - yoffset);
        ctx.lineTo(xoffset + length / 2, -(width / 2) - yoffset);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (image === "circle") {
        ctx.rotate(0 * (Math.PI / 180));
        ctx.beginPath();
        ctx.arc(xoffset + length, yoffset, length / 2 + 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (image === "single") {
        ctx.fillRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
        ctx.strokeRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
        ctx.beginPath();
        ctx.moveTo(15 + xoffset, -(width) - yoffset);
        ctx.lineTo(47.5 + xoffset, 0 - ((width / 2) + yoffset));
        ctx.lineTo(47.5 + xoffset, ((width / 2) - yoffset));
        ctx.lineTo(15 + xoffset, (width) - yoffset);
        ctx.lineTo(15 + xoffset, -(width) - yoffset);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else {
        if (type === 0) {
            ctx.fillRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
            ctx.strokeRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
        } else if (type === 1) {
            ctx.beginPath();
            ctx.moveTo(xoffset + length, -(width / 2) - yoffset);
            ctx.lineTo(xoffset + length + (length / 2), 0 - ((width * 1.5) + yoffset));
            ctx.lineTo(xoffset + length + (length / 2), ((width * 1.5) - yoffset));
            ctx.lineTo(xoffset + length, (width / 2) - yoffset);
            ctx.lineTo(xoffset + length, -(width / 2) - yoffset);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.fillRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
            ctx.strokeRect(xoffset, 0 - ((width / 2) + yoffset), length, width);
        } else if ((type === 2) || (type === 3)) {
            ctx.beginPath();
            ctx.moveTo(xoffset + 20, -(width / 4) - yoffset);
            ctx.lineTo(xoffset + 20 + (length / 2), 0 - ((width / 2) + yoffset) - (width / 4));
            ctx.lineTo(xoffset + 20 + (length / 2), ((width / 2) - yoffset) + (width / 4));
            ctx.lineTo(xoffset + 20, (width / 4) - yoffset);
            ctx.lineTo(xoffset + 20, -(width / 4) - yoffset);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (type === 4) {
            ctx.translate(xoffset + parseInt(validateField(document.getElementById("body").value, 32)), -((width / 2) + yoffset));
            if ((editmode === false) && (shapes.length > 0)) {
                ctx.rotate(((angle(tankpointx, tankpointy, mouse.x, mouse.y) + a) * -1) * (Math.PI / 180));
                ctx.rotate(angle(tankpointx + xoffset + parseFloat(validateField(document.getElementById("body").value, 32)), tankpointy - ((width / 2) + yoffset), shapes[nShape].x, shapes[nShape].y) * (Math.PI / 180));
            }
            ctx.fillRect(0, 0, length, width);
            ctx.strokeRect(0, 0, length, width);
            ctx.beginPath();
            ctx.arc(0, width / 2, width, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

    }
    ctx.restore();
}

function drawBullet(x, y, size, transparency, color) {
    //Draw a bullet using the given parameters.

    var bColor = "";

    if (color === "#ffffff") {
        bColor = document.getElementById("color").value;
    } else {
        bColor = color;
    }

    ctx.save();
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(bColor, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = bColor;
    ctx.globalAlpha = transparency;
    ctx.beginPath();
    ctx.arc(x, y, size + 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawTrap(x, y, size, angle, transparency, color) {
    var bColor = "";

    if (color === "#ffffff") {
        bColor = document.getElementById("color").value;
    } else {
        bColor = color;
    }


    ctx.save();
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(bColor, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = bColor;
    ctx.globalAlpha = transparency;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, size / 3);
    ctx.rotate(60 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(60 * (Math.PI / 180));
    ctx.lineTo(0, size / 3);
    ctx.rotate(60 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(60 * (Math.PI / 180));
    ctx.lineTo(0, size / 3);
    ctx.rotate(60 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(60 * (Math.PI / 180));
    ctx.lineTo(0, size / 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawDrone(x, y, size, angle, color) {
    var bColor = "";

    if (color === "#ffffff") {
        bColor = document.getElementById("color").value;
    } else {
        bColor = color;
    }


    ctx.save();
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(bColor, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = bColor;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.rotate(angle * (Math.PI / 180));
    ctx.moveTo(0, size);
    ctx.rotate(120 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(120 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(120 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawNecro(x, y, size, angle, color) {
    var bColor = "";

    if (color === "#ffffff") {
        bColor = document.getElementById("color").value;
    } else {
        bColor = color;
    }

    ctx.save();
    ctx.fillStyle = bColor;
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(bColor, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 10;
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, r) {
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + width, y, x + width, y + height, r);
    this.arcTo(x + width, y + height, x, y + height, r);
    this.arcTo(x, y + height, x, y, r);
    this.arcTo(x, y, x + width, y, r);
    this.closePath();
    return this;
};

function drawPentagon(x, y, size, angle, color) {
    ctx.save();
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(color, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));
    ctx.beginPath();
    ctx.moveTo(0, size);
    ctx.rotate(360 / 5 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(360 / 5 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(360 / 5 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(360 / 5 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.rotate(360 / 5 * (Math.PI / 180));
    ctx.lineTo(0, size);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawPoly(x, y, size, angle, color, sides) {
    ctx.save();
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(color, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));
    ctx.beginPath();
    for (i = 0; i < sides; i++) {
        ctx.rotate((360 / sides) * (Math.PI / 180));
        ctx.lineTo(0, size);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawConc(x, y, size, angle, color, sides, poly) {
    ctx.save();
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(color, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));
    ctx.beginPath();
    for (i = 0; i < sides; i++) {
        ctx.rotate(360 / (sides * 2) * (Math.PI / 180));
        ctx.lineTo(0, poly);
        ctx.rotate(360 / (sides * 2) * (Math.PI / 180));
        ctx.lineTo(0, size);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawRect(x, y, size, angle, color) {
    ctx.save();
    if (newGraph === false) {
        ctx.strokeStyle = "#555555";
    } else {
        ctx.strokeStyle = ColorLuminance(color, document.getElementById("luminance").value);
    }
    ctx.lineWidth = 5;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));
    ctx.beginPath();
    ctx.rect(-size / 2, -size, size, size * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
