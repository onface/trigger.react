var React = require('react')
var Trigger = require('trigger.react')
class Basic extends React.Component {
    render () {
        return (
            <div className="basicDemo" >
                <Trigger>default</Trigger>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
