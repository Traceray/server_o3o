import React from 'react';
import {RouteHandler} from 'react-router';

class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        // if we changed routes...
        if ((
                nextProps.location.key !== this.props.location.key &&
                nextProps.location.state &&
                nextProps.location.state.modal
            )) {
            // save the old children (just like animation)
            this.previousChildren = this.props.children
        }
    }

    render() {
        return (
            <div >

                {this.props.children}

            </div>
        );
    }
}
export default App;