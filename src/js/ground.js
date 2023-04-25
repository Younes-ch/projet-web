import { incrementCustomProperty, setCustomProperty, getCustomProperty } from "./updateCustomProperty.js";

const SPEED = 0.05;

const groundElems = document.querySelectorAll('[data-ground]');

export function setupGround() {
    setCustomProperty(groundElems[0], '--left', 0);
    setCustomProperty(groundElems[1], '--left', 300);
}

export function updateGround(delta) {
    groundElems.forEach(groundElem => {
        incrementCustomProperty(groundElem, '--left', delta * SPEED * -1);

        if (getCustomProperty(groundElem, '--left') <= -300) {
            incrementCustomProperty(groundElem, '--left', 600);
        }
    });
}