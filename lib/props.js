import p from 'prop-types'
export default function (app) {
    app.defaultProps = {
        trigger: 'click'
    }
    app.propTypes = {
        trigger: p.string
    }
}
