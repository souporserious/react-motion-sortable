import React, { Component, Children, PropTypes, cloneElement, createElement } from 'react';
import { Spring } from 'react-motion';
import reinsert from './reinsert';
import clamp from './clamp';

class Sortable extends Component {
  static defaultProps = {
    component: 'ul',
    springConfig: [300, 50],
    onChange: () => null
  }

  state = {
    delta: 0,
    mouse: 0,
    order: this.props.children
  }

  _isPressed = false
  _lastPressed = 0
  _itemsCount = this.props.children.length

  componentDidMount() {
    window.addEventListener('touchmove', this._dragMove.bind(this));
    window.addEventListener('touchend', this._dragEnd.bind(this));
    window.addEventListener('mousemove', this._dragMove.bind(this));
    window.addEventListener('mouseup', this._dragEnd.bind(this));
  }

  _dragStart(child, pressY, e) {
    const { pageY } = e.touches && e.touches[0] || e;

    this._isPressed = true;
    this._lastPressed = child;

    this.setState({
      delta: pageY - pressY,
      mouse: pressY
    });
  }

  _dragMove({pageY}) {
    const { delta, order } = this.state;
    if(this._isPressed) {
      const mouse = pageY - delta;
      const row = clamp(Math.round(mouse / 100), 0, this._itemsCount - 1);
      const newOrder = reinsert(order, order.indexOf(this._lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
    }
  }

  _dragEnd() {
    const { order } = this.state;
    this._isPressed = false;
    this.props.onChange(order);
    this.setState({delta: 0});
  }

  _getEndValues = (currValues) => {
    const { children, springConfig } = this.props;
    const { mouse, order } = this.state;
    const configs = {};

    Children.forEach(children, child => {
      if(!child) return;
      let shadow, y;

      if(this._lastPressed === child && this._isPressed) {
        shadow = {val: 16, config: springConfig};
        y = {val: mouse, config: []};
      } else {
        shadow = {val: 1, config: springConfig};
        y = {val: order.indexOf(child) * 100, config: springConfig};
      }

      configs[child.key] = {
        component: child,
        shadow, y
      }
    });
    return configs;
  }

  render() {
    const { order } = this.state;
    const childrenToRender = (children) => Object.keys(children).map((key, n) => {
      const child = children[key];
      const { component, shadow, y } = child;

      return cloneElement(component, {
        onMouseDown: this._dragStart.bind(this, component, y.val),
        onTouchStart: this._dragStart.bind(this, component, y.val),
        style: {
          boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow.val}px ${2 * shadow.val}px 0px`,
          transform: `translate3d(0, ${y.val}px, 0)`,
          zIndex: component === this._lastPressed ? 99 : n,
        }
      })
    })

    return (
      <Spring endValue={this._getEndValues}>
        {children =>
          createElement(
            this.props.component,
            {className: this.props.className},
            childrenToRender(children)
          )
        }
      </Spring>
    );
  }
}

export default Sortable;