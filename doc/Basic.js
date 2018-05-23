var React = require('react')
var Trigger = require('trigger.react')
class Basic extends React.Component {
    render () {
        return (
            <div className="basicDemo" >
                <Trigger
                    trigger="click"
                    popup={(self) => (
                        <div style={{width: 100, height:100, background: 'skyblue'}}>
                            <div style={{width:200, padding:30, border:'1px solid red'}}>
                                <button>button</button>
                                <br />
                                <button onClick={() => {
                                    self.$emit('HIDE')
                                }} >hide</button>
                            </div>
                        </div>
                    )}
                >
                    <button style={{cursor: 'pointer'}} >
                        click
                    </button>
                </Trigger>
                <hr />
                <Trigger
                    trigger="hover"
                    popup={(self) => (
                        <div style={{width: 100, height:100, background: 'skyblue'}}>
                            <div style={{width:200, padding:30, border:'1px solid red'}}>
                                <button>button</button>
                                <br />
                                <button onClick={() => {
                                    self.$emit('HIDE')
                                }} >hide</button>
                            </div>
                        </div>
                    )}
                >
                    <button style={{cursor: 'pointer'}} >
                        hover
                    </button>
                </Trigger>
            </div>
        )
    }
}
/*ONFACE-DEL*/Basic = require("react-hot-loader").hot(module)(Basic)
module.exports = Basic
