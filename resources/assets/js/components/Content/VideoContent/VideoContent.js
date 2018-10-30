import React , {Component} from 'react';
import { Link } from 'react-router-dom';

class VideoContent extends Component {
    render() {
        return (
           <div style={{marginBottom: "1%"}}>
            <iframe width="280" height="167" src={this.props.url} frameborder="0"
                    allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen"
                    mozallowfullscreen="mozallowfullscreen"
                    msallowfullscreen="msallowfullscreen"
                    oallowfullscreen="oallowfullscreen"
                    webkitallowfullscreen="webkitallowfullscreen">text</iframe>
           </div>
        )
    }
}

export default VideoContent;