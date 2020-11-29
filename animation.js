class Animation {
    static linear(moveable, deltaX, deltaY, deltaRotation, timeMs) {
        let promise = new Promise(((resolve, reject) => {
            const frameDuration = 200;
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
                } else {
                    // console.log("animation finished", moveable)
                    resolve("Animation finished", moveable);
                }
            }
            setTimeout(renderNext, frameDuration);
        }))
        return promise;

    }

    static TODO_ADD_EASE_SUPPORT(moveable, deltaX, deltaY, deltaRotation, timeMs) {
        // easeInQuad: t => t*t,
        // easeOutQuad: t => t*(2-t),
    }

}