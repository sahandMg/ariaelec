import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import './ContentSmallSize.css';

class ContentSmallSize extends Component {
    render() {
        const link = "/articles/"+this.props.id+"/"+this.props.title;
        return (
          <article className="ContentSmallSize">
              <Link to={link}>
              <figure>
               <img  height="225px" width="100%" src={this.props.image} />
               <figcaption style={{right: 0}}>{this.props.category}</figcaption>
              </figure>
              <div>
               <h3>{this.props.title}</h3>
               <p>{this.props.abstract}</p>
               <span><time>{this.props.days} روز</time></span>
              </div>
              </Link>
          </article>
        )
    }
}

export default ContentSmallSize;