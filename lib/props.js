import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        trigger: 'click',
        baseOn: {
            target: 'left bottom',
            el: 'left top'
        },
        onAlign: function onAlign(position, el, target, offsetParent) {
            return position
        }
    }
    app.propTypes = {
        trigger: p.string
    }
}
