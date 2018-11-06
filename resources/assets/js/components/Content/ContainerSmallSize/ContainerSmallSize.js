import React , {Component} from 'react';
import axios from 'axios';
import ContentSmallSize from '../ContentSmallSize/ContentSmallSize';
import './ContainerSmallSize.css';
import URLs from '../../../URLs';

class ContainerSmallSize extends Component {
    state = {
        contents: [],
        counter: 0
    }
    componentDidMount() {
        axios.post(URLs.base_URL+URLs.home,{ num: 0})
            .then((res) => {
                console.log('res ContainerSmallSize');
                console.log(res);
                this.setState({contents: res.data});
            })
            .catch((error)=> {
                console.log('error');
                console.log(error);
            });
    }

    moreContent = () => {
        let counter = this.state.counter;
        counter = counter + 1 ;
        this.setState({counter: counter});
        axios.post(URLs.base_URL+URLs.get_more_content, { num: counter})
            .then((res) => {
                console.log('res moreContent');
                console.log(res);
                this.setState({contents: res.data});
            })
            .catch((error)=> {
                console.log('error');
                console.log(error);
            });
    }

    render() {
        const contentsBrief = this.state.contents.map((obj) => {
            return <ContentSmallSize id={obj.id} abstract={obj.abstract} category={obj.category} days={obj.days} key={obj.id} image={obj.image} product={obj.product} title={obj.title} />
        });
        return (
         <div className="text-center" style={{ marginTop: "1%"}}>
             <h1>مقالات</h1>
          <div className="containerSmallSize">
              {contentsBrief}
          </div>
          <br/>
          <button onClick={this.moreContent} className="btn btn-primary"> بیشتر... </button>
          <br/>
          <br/>
         </div>
        )
    }
}

export default ContainerSmallSize;