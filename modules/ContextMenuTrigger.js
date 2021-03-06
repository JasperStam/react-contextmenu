'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _actions = require('./actions');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenuTrigger = function (_Component) {
    _inherits(ContextMenuTrigger, _Component);

    function ContextMenuTrigger() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ContextMenuTrigger);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ContextMenuTrigger.__proto__ || Object.getPrototypeOf(ContextMenuTrigger)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseDown = function (event) {
            if (_this.props.holdToDisplay >= 0 && event.button === 0) {
                event.persist();

                _this.mouseDownTimeoutId = setTimeout(function () {
                    return _this.handleContextClick(event);
                }, _this.props.holdToDisplay);
            }
        }, _this.handleMouseUp = function (event) {
            if (event.button === 0) {
                clearTimeout(_this.mouseDownTimeoutId);
            }
        }, _this.handleTouchstart = function (event) {
            if (_this.props.holdToDisplay >= 0) {
                event.persist();

                _this.touchstartTimeoutId = setTimeout(function () {
                    return _this.handleContextClick(event);
                }, _this.props.holdToDisplay);
            }
        }, _this.handleTouchEnd = function (event) {
            event.preventDefault();
            clearTimeout(_this.touchstartTimeoutId);
        }, _this.handleContextClick = function (event) {
            event.preventDefault();
            event.stopPropagation();

            var x = event.clientX || event.touches && event.touches[0].pageX;
            var y = event.clientY || event.touches && event.touches[0].pageY;

            (0, _actions.hideMenu)();

            (0, _actions.showMenu)({
                position: { x: x, y: y },
                target: _this.elem,
                id: _this.props.id,
                data: (0, _helpers.callIfExists)(_this.props.collect, _this.props)
            });
        }, _this.elemRef = function (c) {
            _this.elem = c;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ContextMenuTrigger, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                renderTag = _props.renderTag,
                attributes = _props.attributes,
                children = _props.children;

            var newAttrs = (0, _objectAssign2.default)({}, attributes, {
                className: (0, _classnames2.default)(_helpers.cssClasses.menuWrapper, attributes.className),
                onContextMenu: this.handleContextClick,
                onMouseDown: this.handleMouseDown,
                onMouseUp: this.handleMouseUp,
                onTouchStart: this.handleTouchstart,
                onTouchEnd: this.handleTouchEnd,
                onMouseOut: this.handleMouseUp,
                ref: this.elemRef
            });

            return _react2.default.createElement(renderTag, newAttrs, children);
        }
    }]);

    return ContextMenuTrigger;
}(_react.Component);

ContextMenuTrigger.propTypes = {
    id: _react.PropTypes.string.isRequired,
    attributes: _react.PropTypes.object,
    collect: _react.PropTypes.func,
    holdToDisplay: _react.PropTypes.number,
    renderTag: _react.PropTypes.node
};
ContextMenuTrigger.defaultProps = {
    attributes: {},
    holdToDisplay: 1000,
    renderTag: 'div'
};
exports.default = ContextMenuTrigger;