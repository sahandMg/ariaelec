import React, { Component } from 'react';
import AuxWrapper from './components/AuxWrapper/AuxWrapper';
import SlideImage1 from './assets/Images/Slide1.jpg';
import SlideImage2 from './assets/Images/Slide2.jpg';
import SlideImage3 from './assets/Images/bg_3.png';
import './App.css';
import axios from 'axios';
import ContentSmallSize from './components/Content/ContentSmallSize/ContentSmallSize';
import VideoContent from './components/Content/VideoContent/VideoContent';
import { Link } from 'react-router-dom';
import URLs from './URLs';

class App extends Component {
    state = {
        contents: [], videos: []
    }
    componentDidMount() {
        axios.post('http://localhost:80/api/home')
            .then((res) => {
                // console.log('res ContainerSmallSize');
                // console.log(res);
                this.setState({contents: res.data});
            })
            .catch((error)=> {
                console.log('error');
                console.log(error);
            });
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

  render() {
      const contentsBrief = this.state.contents.map((obj,i) => {
         if(i<4) {
             return <ContentSmallSize id={obj.id} abstract={obj.abstract} category={obj.category} days={obj.days}
                                      key={obj.id} image={obj.image} product={obj.product} title={obj.title}/>
         }
      });
      const videos = this.state.videos.map((obj,i) => {
          if(i<4) {
              return <VideoContent key={obj.id} url={obj.frame} title={obj.title}/>
          }
      });
    return (
     <AuxWrapper>
        {/*  Slide Show  */}
       <div style={{backgroundColor: "white"}}>
        <div className="carousel-container col-lg-10 col-md-10 col-sm-10 col-12 ml-auto mr-auto mt-lg-2 slide-div">
          <div className="carousel slide" data-ride="carousel" id="carousel-demo">
            <ul className="carousel-indicators">
              <li data-target="#carousel-demo" data-slide-to="0" className="active"></li>
              <li data-target="#carousel-demo" data-slide-to="1"></li>
              <li data-target="#carousel-demo" data-slide-to="2"></li>
            </ul>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={SlideImage1} className="img-fluid" alt="slide first"/>
                  <div className="carousel-text ml-auto w-100 h-100 text-right text-white m-0">
                    <span className="m-4">جست و جو بین 20 هزار قطعه</span>
                    <button className="text-center btn btn-primary pt-lg-3 pb-lg-3 pr-lg-5 pl-lg-5
                    pt-md-2 pb-lg-2 pr-md-4 pl-md-4 pt-sm-1 pb-sm-1 pr-sm-2 pl-sm-2 pt-0 pb-0 pr-1 pl-1">مشاهده آموزش
                    </button>
                  </div>
              </div>
              <div className="carousel-item">
                <img src={SlideImage2} className="img-fluid" alt="slide second"/>
                  <div className="carousel-text w-100 h-100 text-right text-white m-0">
                    <span className="m-4">دسته بندی سفارش ها بر اساس پروژه ها</span>
                    <button className="text-center btn btn-primary pt-lg-3 pb-lg-3 pr-lg-5 pl-lg-5
                    pt-md-2 pb-lg-2 pr-md-4 pl-md-4 pt-sm-1 pb-sm-1 pr-sm-2 pl-sm-2 pt-0 pb-0 pr-1 pl-1">مشاهده آموزش
                    </button>
                  </div>
              </div>
              <div className="carousel-item">
                <img src={SlideImage3} className="img-fluid" alt="slide third" />
                  <div className="carousel-text ml-auto w-100 h-100 text-right text-white m-0">
                    <span className="m-4">ارسال محصولات با کیفیت به تمام نقاط کشور</span>
                    <button className="text-center btn btn-primary pt-lg-3 pb-lg-3 pr-lg-5 pl-lg-5
                    pt-md-2 pb-lg-2 pr-md-4 pl-md-4 pt-sm-1 pb-sm-1 pr-sm-2 pl-sm-2 pt-0 pb-0 pr-1 pl-1">کلیک کن
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
       </div>
         {/* Articles */}
        <section>
          <h2 className="text-center" style={{marginTop: "1%", marginBottom: '1%'}}>آخرین مقالات</h2>
          <div className="flex space-around flex-wrap">
              {contentsBrief}
          </div>
          <Link to="/articles" className="btn btn-primary col-md-2 col-sm-6" style={{margin: "auto", display: "block"}}>مشاهده همه مقالات</Link>
          <br/>
        </section>
         {/* Videos */}
         <section style={{backgroundColor: "white"}}>
             <h2 className="text-center" style={{marginTop: "1%", marginBottom: '1%'}}>آخرین ویدیوها</h2>
             <div className="flex space-around flex-wrap">
                 {videos}
             </div>
             <Link to="/videos" className="btn btn-primary col-md-2 col-sm-6" style={{margin: "auto", display: "block"}}>مشاهده همه ویدیوها</Link>
             <br/>
         </section>
       {/*Show Features*/}
       <section>
       <div className="feature-container text-center mt-3 mb-3 mt-lg-5 mb-lg-5 mt-md-4 mb-md-4 mt-sm-3 mb-sm-3 mt-2 mb-2 container-fluid">
      <div className="row">
        <div className="feature-card col-lg-4 col-md-4 col-sm-6 col-12 p-lg-0 p-md-0 p-sm-2 pb-3">
          <div className="feature-icon"><span className="fa fa-truck"></span></div>
          <div className="feature-text mr-auto ml-auto mt-lg-3 mt-md-2 mt-sm-1 mt-0">
             ارسال ایگان سفارش های بالا تر از 100هزارتومان
          </div>
        </div>
        <div className="feature-card col-lg-4 col-md-4 col-sm-6 col-12 p-lg-0 p-md-0 p-sm-2 pb-3">
          <div className="feature-icon"><span className="fa fa-search"></span></div>
          <div className="feature-text mr-auto ml-auto mt-lg-3 mt-md-2 mt-sm-1 mt-0">
            جستجوی پیشرفته              
          </div>
        </div>
        <div className="feature-card col-lg-4 col-md-4 col-sm-6 col-12 p-lg-0 p-md-0 p-sm-2 pb-3">
          <div className="feature-icon"><span className="fa fa-archive"></span></div>
          <div className="feature-text mr-auto ml-auto mt-lg-3 mt-md-2 mt-sm-1 mt-0">
            بیش از 20 هزار قطعه
          </div>
        </div>
        <div className="feature-card col-lg-4 col-md-4 col-sm-6 col-12 p-lg-0 p-md-0 p-sm-2 pb-3">
          <div className="feature-icon"><span className="fa fa-flag"></span></div>
          <div className="feature-text mr-auto ml-auto mt-lg-3 mt-md-2 mt-sm-1 mt-0">
            ارسال به تمام نقاط کشور
          </div>
        </div>
      </div>
    </div>
       </section>
     </AuxWrapper>
  );
  }
}

export default App;
