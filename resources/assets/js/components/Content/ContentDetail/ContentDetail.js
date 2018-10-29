import React, { Component } from 'react';
import axios from 'axios';
import {convertFromRaw, EditorState} from 'draft-js';
import { createEditorStateWithText } from 'draft-js-plugins-editor';
import {stateToHTML} from 'draft-js-export-html';
import CardWrapper from '../../CardWrapper/CardWrapper';
import ContentSmallSize from "../ContentSmallSize/ContentSmallSize";
// import Comments from '../../Comments/Comments';
import './ContentDetail.css';

class ContentDetail extends Component {
    state = {
        article: '',
        brief: '',
        product: '',
        DraftEditor: null,
        temp: ''
    }
    componentDidMount() {
        axios.post('http://localhost:80/api/cm/content/get', { id: this.props.match.params.id})
            .then((res) => {
                console.log('get-content');
                console.log(res.data);
                console.log('brief');
                console.log(res.data[0]);
                console.log('text');
                console.log(res.data[1]);
                console.log('product');
                console.log(res.data[2]);
                this.setState({brief: res.data[0],DraftEditor: res.data[1],product: res.data[2]});
                // this.setState({temp: res.data[0].detail.text});
                // const test = JSON.parse(res.data[0].detail.text);
                // const editorState = EditorState.createWithContent(
                //     convertFromRaw(res.data[0].detail.text)
                // );
                // console.log(convertFromRaw(res.data[0].detail.text));
                // this.setState({data: res.data[0], DraftEditor: res.data[0].detail.text});
            })
            .catch((error)=> {
                console.log('get-content error');
                console.log(error);
            });
        // axios.post('http://localhost:80/ariaelec/public/api/get-content', { id: 1004})
        //     .then((res) => {
        //         console.log('get-content 1004');
        //         console.log(res);
        //         // this.setState({temp: res.data[0].detail.text});
        //         // const test = JSON.parse(res.data[0].detail.text);
        //         // const editorState = EditorState.createWithContent(
        //         //     convertFromRaw(res.data[0].detail.text)
        //         // );
        //         // console.log(convertFromRaw(res.data[0].detail.text));
        //         // this.setState({data: res.data[0], DraftEditor: res.data[0].detail.text});
        //     })
        //     .catch((error)=> {
        //         console.log('get-content error');
        //         console.log(error);
        //     });
    }

    render() {
        let showTest2;
        console.log("EditorRaw");
        console.log(this.state.DraftEditor);
        if(this.state.DraftEditor !== null) {
            console.log("convertFromRaw");
            console.log(convertFromRaw(JSON.parse(this.state.DraftEditor)));
            showTest2 = <div dangerouslySetInnerHTML={{__html: stateToHTML(convertFromRaw(JSON.parse(this.state.DraftEditor)))}}/>;
        }
        // const data = this.state.data;
        // console.log("render : ");
        // let blockArray = convertFromRaw(this.state.temp);
        // console.log(convertFromRaw(this.state.temp));
        // console.log(this.state.DraftEditor);
        // const editor = stateToHTML(this.state.DraftEditor);
        return (
          <div className="flex-row space-around content-detail">
              <div className="flex-item-2 flex-column">
                  {/*<ContentSmallSize/>*/}
                  {/*<ContentSmallSize/>*/}
                  {/*<ContentSmallSize/>*/}
              </div>
              <article className="flex-item-9">
                  <CardWrapper>
                      {/*<h1>{data.title}</h1>*/}
                      {showTest2}
                      <br/>
                      <hr/>
                      <br/>
                      {/*<Comments/>*/}
                  </CardWrapper>
              </article>
          </div>
        )
    }
};

export default ContentDetail;

