import React , { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Alert from 'react-s-alert';

class ImagesLink extends Component {

    state = {
        copied: false
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onCopy = () => {
        this.setState({copied: true});
        Alert.info('کپی شد', {
            position: 'bottom-left',
            effect: 'bouncyflip',
            timeout: 3000
        });
    };
    render() {
        return (
            <div className="flex-item-3 text-center">
               <img height="200" src={this.props.link} />
                <br/>
                <CopyToClipboard onCopy={this.onCopy} text={this.props.link}>
                    <button className="btn btn-primary" style={{margin: "5px"}}><i class="far fa-copy"></i></button>
                </CopyToClipboard>
            </div>
        )
    }
};

// ImagesLink.propTypes = {
//     link: PropTypes.string.isRequired
// }

export default ImagesLink ;
