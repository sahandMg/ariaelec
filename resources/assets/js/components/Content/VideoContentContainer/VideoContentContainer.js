import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import URLs from '../../../URLs';
import VideoContent from '../VideoContent/VideoContent';

class VideoContentContainer extends Component {
    state = {
      videos: [], counter: 1
    }

    componentDidMount() {
        axios.get(URLs.base_URL+URLs.get_videos)
            .then((res) => {
                console.log('res get videos');
                console.log(res);
                this.setState({videos: res.data});
            })
            .catch((error)=> {
                console.log('error get videos');
                console.log(error);
            });
    }

    moreVideos = () => {
        axios.post(URLs.base_URL+URLs.get_more_videos, num: this.state.counter)
            .then((res) => {
                console.log('res get more videos');
                console.log(res);
                let videos = [...this.state.videos, ...res.data];
                this.setState({videos: videos});
            })
            .catch((error)=> {
                console.log('error get more videos');
                console.log(error);
            });
        this.setState({counter: this.state.counter+1});
    }

    render() {
        const videos = this.state.videos.map((obj,i) => {
            if(i<4) {
                return <VideoContent key={obj.id} url={obj.frame} title={obj.title}/>
            }
        });
        return (
            <div>
                <h2 className="text-center" style={{marginTop: "1%", marginBottom: '1%'}}>آخرین ویدیوها</h2>
                <div className="flex space-around flex-wrap">
                    {videos}
                </div>
                <Link to="/articles" className="btn btn-primary col-md-2 col-sm-6" style={{margin: "auto", display: "block"}}>مشاهده همه ویدیوها</Link>
                <br/>
            </div>
        )
    }
}

export default VideoContentContainer;