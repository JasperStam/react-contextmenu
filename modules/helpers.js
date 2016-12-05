'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.callIfExists = callIfExists;
exports.hasOwnProp = hasOwnProp;
exports.uniqueId = uniqueId;
function callIfExists(func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return typeof func === 'function' && func.apply(undefined, args);
}

function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function uniqueId() {
    return Math.random().toString(36).substring(7);
}

var cssClasses = exports.cssClasses = {
    menu: 'react-contextmenu',
    menuVisible: 'react-contextmenu--visible',
    menuWrapper: 'react-contextmenu-wrapper',
    menuItem: 'react-contextmenu-item',
    menuLink: 'react-contextmenu-link',
    menuLinkActive: 'react-contextmenu-link--active',
    menuLinkDisabled: 'react-contextmenu-link--disabled',
    subMenu: 'react-contextmenu-submenu'
};

var store = exports.store = {};