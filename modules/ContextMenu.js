'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _globalEventListener = require('./globalEventListener');

var _globalEventListener2 = _interopRequireDefault(_globalEventListener);

var _actions = require('./actions');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = function (_Component) {
    _inherits(ContextMenu, _Component);

    function ContextMenu(props) {
        _classCallCheck(this, ContextMenu);

        var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

        _this.handleShow = function (e) {
            if (e.detail.id !== _this.props.id) return;

            var _e$detail$position = e.detail.position,
                x = _e$detail$position.x,
                y = _e$detail$position.y;


            _this.setState({ isVisible: true, x: x, y: y });
            document.addEventListener('mousedown', _this.handleOutsideClick);
            document.addEventListener('ontouchstart', _this.handleOutsideClick);
            document.addEventListener('scroll', _this.handleHide);
            document.addEventListener('contextmenu', _this.handleHide);
            window.addEventListener('resize', _this.handleHide);
            (0, _helpers.callIfExists)(_this.props.onShow, e);
        };

        _this.handleHide = function (e) {
            document.removeEventListener('mousedown', _this.handleOutsideClick);
            document.removeEventListener('ontouchstart', _this.handleOutsideClick);
            document.removeEventListener('scroll', _this.handleHide);
            document.removeEventListener('contextmenu', _this.handleHide);
            window.removeEventListener('resize', _this.handleHide);

            _this.setState({ isVisible: false });
            (0, _helpers.callIfExists)(_this.props.onHide, e);
        };

        _this.handleOutsideClick = function (e) {
            if (!_this.menu.contains(e.target)) (0, _actions.hideMenu)();
        };

        _this.getMenuPosition = function (x, y) {
            var _document$documentEle = document.documentElement,
                scrollX = _document$documentEle.scrollTop,
                scrollY = _document$documentEle.scrollLeft;
            var _window = window,
                innerWidth = _window.innerWidth,
                innerHeight = _window.innerHeight;

            var rect = _this.menu.getBoundingClientRect();
            var menuStyles = {
                top: y + scrollY,
                left: x + scrollX
            };

            if (y + rect.height > innerHeight) {
                menuStyles.top -= rect.height;
            }

            if (x + rect.width > innerWidth) {
                menuStyles.left -= rect.width;
            }

            if (menuStyles.top < 0) {
                menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
            }

            if (menuStyles.left < 0) {
                menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
            }

            return menuStyles;
        };

        _this.menuRef = function (c) {
            _this.menu = c;
        };

        _this.state = {
            x: 0,
            y: 0,
            isVisible: false
        };
        return _this;
    }

    _createClass(ContextMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.listenId = _globalEventListener2.default.register(this.handleShow, this.handleHide);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (this.state.isVisible) {
                (function () {
                    var wrapper = window.requestAnimationFrame || setTimeout;

                    wrapper(function () {
                        var _state = _this2.state,
                            x = _state.x,
                            y = _state.y;

                        var _getMenuPosition = _this2.getMenuPosition(x, y),
                            top = _getMenuPosition.top,
                            left = _getMenuPosition.left;

                        wrapper(function () {
                            _this2.menu.style.top = top + 'px';
                            _this2.menu.style.left = left + 'px';
                            _this2.menu.classList.add(_helpers.cssClasses.menuVisible);
                        });
                    });
                })();
            } else {
                this.menu.classList.remove(_helpers.cssClasses.menuVisible);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.listenId) {
                _globalEventListener2.default.unregister(this.listenId);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;
            var _state2 = this.state,
                top = _state2.top,
                left = _state2.left;

            var style = { position: 'fixed', top: top, left: left };

            return _react2.default.createElement(
                'nav',
                { ref: this.menuRef, style: style, className: _helpers.cssClasses.menu,
                    onContextMenu: this.handleHide },
                children
            );
        }
    }]);

    return ContextMenu;
}(_react.Component);

ContextMenu.propTypes = {
    id: _react.PropTypes.string.isRequired,
    onHide: _react.PropTypes.func,
    onShow: _react.PropTypes.func
};
exports.default = ContextMenu;