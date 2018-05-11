import { Component, cloneElement, Fragment } from "react"
import extend from "extend"
import util from "util.react"
import reactDefaultValue from "react-defaultvalue"
import Position from "position.react"
require('./index.css')
class Trigger extends Component {
    constructor (props) {
        super(props)
        const self = this
        this.state = {}
    }
    render() {
        const self = this
        let newProps = {}
        let isHTMLElement = typeof self.props.children.type === 'string'
        newProps.onClick = (e) => {
            if (typeof self.props.children.props !== 'undefined' && typeof self.props.children.props.onClick === 'function') {
                self.props.children.props.onClick(e)
            }
        }
        let node
        if (isHTMLElement) {
            node = cloneElement(self.props.children, newProps)
            self.refsRoot = node
        }
        else {
            node = (
                <span ref={(node) => { self.refsRoot = node }} {...newProps}>{self.props.children}</span>
            )
        }
        return (
            <Fragment>
                {node}
                <Position
                    target={function() {
                        return self.refsRoot
                    }}
                    baseOn={{
                        target: 'left bottom',
                        el: 'left top'
                    }}
                    >
                    <div style={{width: 100, height:100, border: '1px solid red'}}></div>
                </Position>
            </Fragment>
        )
    }
}
require('./props').default(Trigger)
Trigger = reactDefaultValue(Trigger)
export default Trigger
module.exports = Trigger
