import { Component, cloneElement, Fragment } from "react"
import extend from "extend"
import util from "util.react"
import reactDefaultValue from "react-defaultvalue"
import Position from "position.react"
import spreadProps from "react-spread-props"
require('./index.css')
class Trigger extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            show: false
        }
    }
    // show hide 名字不能随意改，因为 self.props.popup(self) 会调用
    show = () => {
        this.emitChange(true)
    }
    $emit = (...arg) => {
        const self = this
        let type = arg.shift()
        switch (type) {
            case 'HIDE':
                self.emitChange(false)
                break;
            default:

        }
    }
    handleClick = (e) => {
        const self = this
        if (!util.contains(self.$refs.position.$refs.root, e.target)) {
            self.$emit('HIDE')
        }
    }
    bindClickEvent = () => {
        document.addEventListener('click', this.handleClick)
    }
    removeClickEvent = () => {
        document.removeEventListener('click', this.handleClick)
    }
    componentDidMount () {
        const self = this
    }
    getValue = () => {
        const self = this
        if (typeof self.props.show === 'undefined') {
            return self.state.show
        }
        else {
            return self.props.show
        }
    }
    emitChange = (value) => {
        const self = this
        if (self.props.trigger === 'click') {
            if (value) {
                self.bindClickEvent()
            }
            else {
                self.removeClickEvent()
            }
        }
        if (typeof self.props.onChange === 'function') {
            self.props.onChange(value)
        }
        else {
            self.setState({
                show: value
            })
        }
    }
    handleMouseEnter = (e) => {
        const self = this
        if (self.props.trigger !== 'hover') { return }
        clearTimeout(self.targetMouseLeaveHideTimer)
    }
    handleMouseLeave = (e) => {
        const self = this
        if (self.props.trigger !== 'hover') { return }
        if (typeof self.props.children.props !== 'undefined' && typeof self.props.children.props.onMouseEnter === 'function') {
            self.props.children.props.onMouseEnter(e)
        }
        self.targetMouseLeaveHideTimer = setTimeout(function  () {
            self.emitChange(false)
        }, 200)
    }
    render() {
        const ref = util.ref
        const self = this
        let extendProps = {}
        let isHTMLElement = typeof self.props.children.type === 'string'
        switch(self.props.trigger) {
            case 'click':
                extendProps.onClick = (e) => {
                    if (typeof self.props.children.props !== 'undefined' && typeof self.props.children.props.onClick === 'function') {
                        self.props.children.props.onClick(e)
                    }
                    self.emitChange(!self.getValue())
                }
            break
            case 'hover':
                extendProps.onMouseEnter = (e) => {
                    if (typeof self.props.children.props !== 'undefined' && typeof self.props.children.props.onMouseEnter === 'function') {
                        self.props.children.props.onMouseEnter(e)
                    }
                    self.emitChange(true)
                    self.handleMouseEnter(e)
                }
                extendProps.onMouseLeave = self.handleMouseLeave
            break
        }
        let domProps = spreadProps(
            self.props,
            extendProps,
            {
                ignore: ['trigger', 'baseOn', 'onAlign']
            }
        )
        domProps.ref = function(node){
            self.$refs = self.$refs || {}
            self.$refs.root = node
        }
        let node
        if (isHTMLElement) {
            delete domProps.children
            node = cloneElement(self.props.children, domProps)
            self.$refs = self.$refs || {}
            self.$refs.root = node
        }
        else {
            node = (
                <span {...domProps}>{self.props.children}</span>
            )
        }
        return (
            <Fragment>
                {node}
                {
                    self.getValue()?
                    (
                        <Position
                            onMouseEnter={self.handleMouseEnter}
                            onMouseLeave={self.handleMouseLeave}
                            ref={(node) => {
                                self.$refs = self.$refs || {}
                                self.$refs.position = node
                            }}
                            target={function() {
                                return self.$refs.root
                            }}
                            baseOn={self.props.baseOn}
                            onAlign={self.props.onAlign}
                            >
                            {
                                typeof self.props.popup === 'function'?
                                self.props.popup(self):
                                self.props.popup
                            }
                        </Position>
                    ):null
                }
            </Fragment>
        )
    }
}
require('./props').default(Trigger)
export default Trigger
module.exports = Trigger
