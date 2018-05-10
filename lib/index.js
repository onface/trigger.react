import { Component } from "react"
import extend from "extend"
import util from "util.react"
import reactDefaultValue from "react-defaultvalue"
require('./index.css')
class Trigger extends Component {
    constructor (props) {
        super(props)
        const self = this
        this.state = {}
    }
    render() {
        const self = this
        var rootClassName = [
            self.props.prefixClassName,
            util.themes(self.props),
        ].join(' ')

        return (
            <span
                ref={(node) => { self.refsRoot = node}}
                style={self.props.style}
                className={rootClassName}
            >
            {self.props.children}
            </span>
        )
    }
}
require('./props').default(Trigger)
Trigger = reactDefaultValue(Trigger)
export default Trigger
module.exports = Trigger
