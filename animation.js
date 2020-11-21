class Animation {
    static linear(moveable, deltaX, deltaY, deltaRotation, timeMs) {
        const frameDuration = 50;
        const frames = Math.ceil(timeMs / frameDuration);
        const stepX = deltaX / frames;
        const stepY = deltaY / frames;
        const stepRotation = deltaRotation / frames;
        let frame = 0;
        const renderNext = function () {
            frame++;
            moveable.move(stepX, stepY, stepRotation);
            if (frame < frames) {
                setTimeout(renderNext, frameDuration);
            }
        }
        setTimeout(renderNext, frameDuration);
    }

    static TODO_ADD_EASE_SUPPORT(moveable, deltaX, deltaY, deltaRotation, timeMs) {
        // easeInQuad: t => t*t,
        // easeOutQuad: t => t*(2-t),
    }

}