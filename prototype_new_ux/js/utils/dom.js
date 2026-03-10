/**
 * DOM Utility Functions
 * DOM 操作工具函数
 */

/**
 * Set text content of an element by ID
 * @param {string} id - Element ID
 * @param {string} value - Text value to set
 */
export function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    }
}

/**
 * Get value from input element
 * @param {string} id - Element ID
 * @param {string} defaultValue - Default value if element not found
 * @returns {string} Input value
 */
export function getValue(id, defaultValue = '') {
    const el = document.getElementById(id);
    return el ? el.value : defaultValue;
}

/**
 * Get checked radio button value
 * @param {string} name - Radio button name
 * @param {string} defaultValue - Default value if no radio checked
 * @returns {string} Checked radio value
 */
export function getRadioValue(name, defaultValue = '') {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : defaultValue;
}

/**
 * Show element
 * @param {string} selector - CSS selector
 */
export function show(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.style.display = 'block';
    }
}

/**
 * Hide element
 * @param {string} selector - CSS selector
 */
export function hide(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.style.display = 'none';
    }
}

/**
 * Toggle element visibility
 * @param {string} selector - CSS selector
 * @param {boolean} visible - Whether to show or hide
 */
export function toggle(selector, visible) {
    if (visible) {
        show(selector);
    } else {
        hide(selector);
    }
}

/**
 * Add class to element
 * @param {string} selector - CSS selector
 * @param {string} className - Class name to add
 */
export function addClass(selector, className) {
    const el = document.querySelector(selector);
    if (el) {
        el.classList.add(className);
    }
}

/**
 * Remove class from element
 * @param {string} selector - CSS selector
 * @param {string} className - Class name to remove
 */
export function removeClass(selector, className) {
    const el = document.querySelector(selector);
    if (el) {
        el.classList.remove(className);
    }
}

/**
 * Toggle class on element
 * @param {string} selector - CSS selector
 * @param {string} className - Class name to toggle
 */
export function toggleClass(selector, className) {
    const el = document.querySelector(selector);
    if (el) {
        el.classList.toggle(className);
    }
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
export function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Copied to clipboard (fallback)');
        } catch (err) {
            console.error('Failed to copy (fallback):', err);
        }
        document.body.removeChild(textarea);
    }
}
