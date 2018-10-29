import React , {Component} from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import Select from 'react-select';
import { createEditorStateWithText } from 'draft-js-plugins-editor';
import {convertFromRaw, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {stateToHTML} from 'draft-js-export-html';
import InlineError from '../../messages/InlineError';
import ContainerSmallSize from '../../Content/ContainerSmallSize/ContainerSmallSize';
import DraftPlugin from '../TextEditor/DraftPlugin/DraftPlugin';
import URLs from '../../../URLs';

import { connect } from 'react-redux';

const FLAVOURS = [
    { label: 'رباتیک', value: 'رباتیک' },
    { label: 'اینترنت اشیا', value: 'اینترنت اشیا' },
    { label: 'نیمه هادی', value: 'نیمه هادی' },
    { label: 'کنترل', value: 'کنترل' },
    { label: 'سلول خورشدی', value: 'سلول خورشدی' },
    { label: 'الکترونیک قدرت', value: 'الکترونیک قدرت' },
    { label: 'خازن', value: 'خازن' },
    { label: 'مقاومت', value: 'مقاومت' },
];

const WHY_WOULD_YOU = [
    { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

const text = 'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';

class AddContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                title: '',
                abstract: '',
                product: '',
                imageTitle:'',
                category: {},
                editorState: createEditorStateWithText(text),
                editorRaw: null,
                editorCurrentState: null
            },
            loading: false,
            errors: {},
            test: createEditorStateWithText('asd')
        }
    }

    validate = (data) => {
        const errors = {};
        if (!data.partName) errors.partName = "Can't be blank";
        if (!data.count) errors.count = "Can't be blank";
        if (!data.dataSheet) errors.dataSheet = "Can't be blank";
        if (!data.imagePart) errors.imagePart = "Can't be blank";

        return errors;
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    onChangeFile = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.files[0] }
        });

    sendData = (event) => {
        event.preventDefault();
        // const errors = this.validate(this.state.data);
        // this.setState({ errors });
        // if (Object.keys(errors).length === 0) {
        //     this.setState({loading: true});
            // const fd = new FormData();
            // fd.append('partName',this.state.data.partName);
            // fd.append('count',this.state.data.count);
            // fd.append('dataSheet',this.state.data.dataSheet);
            // fd.append('imagePart',this.state.data.imagePart);
            // console.log('this.state.data : ');
            // console.log(this.state.data);
        // *****************************
          this.setState({loading: true});
          console.log(this.props.token);
          console.log(this.props.user_id);
          let data = this.state.data;
          // console.log("editRAw");console.log(this.state.data.category);
          axios.post(URLs.base_URL+URLs.cm_add_content,
               {
                  token: this.props.token, title: data.title, abstract: data.abstract ,
                  category: data.category.value, text: this.state.editorRaw, product: data.product,
                  image: data.imageTitle
               })
            .then((res) => {
                Alert.success('با موفقیعت ثبت شد', {
                    position: 'top-right',
                    effect: 'scale',
                    beep: false,
                    timeout: 3000,
                    offset: 100
                });
                console.log('res');
                console.log(res);
                this.setState({loading: false});
            })
            .catch((error)=> {
                this.setState({loading: false});
                console.log('error');
                console.log(error);
            });
          // *****************************
        // }

    }

    handleChange = (selectedOption) => {
        this.setState({ data: { ...this.state.data, category: selectedOption } });
    }

    onEditorStateChange = (editorState) => {
        console.log("handleEditorStateChang :");
        console.log(editorState);
       this.setState({editorState: editorState});
    }

    update = (editorState) => {
        this.setState({test: editorState});
        // the raw state, stringified
        // this.setState({editorCurrentState: editorState.getCurrentContent()});
        // this.setState({editorRaw: JSON.stringify( convertToRaw(editorState.getCurrentContent()))});
        this.setState({editorRaw:  JSON.stringify(convertToRaw(editorState.getCurrentContent()))});
        const rawDraftContentState = JSON.stringify( convertToRaw(editorState.getCurrentContent()) );
        console.log("editorState");
        console.log(editorState);
        console.log("editorState.getCurrentContent()");
        console.log(editorState.getCurrentContent());
        console.log("editorRaw");
        console.log(this.state.editorRaw);
        // console.log(this.state.editorRaw);

        // console.log(this.props.user_id);
        // console.log("UserID :");
        // console.log(this.props.user_id.id);
        // console.log("editorRaw :");
        // console.log(this.state.editorRaw);
        // let html = stateToHTML(editorState.getCurrentContent());
        // console.log("html :");
        // console.log(html);
        // console.log("editorCurrentState :");
        // console.log(this.state.editorCurrentState);
        // this.setState({editorState: editorState});
    }

    render() {
        const { data, errors, loading } = this.state;
        let showTest =<div dangerouslySetInnerHTML={{__html: stateToHTML(this.state.test.getCurrentContent())}} />  ;
        let showTest2;
        // if(this.state.editorRaw != null) {
        //     // showTest2 = <div dangerouslySetInnerHTML={{__html: stateToHTML(convertFromRaw(this.state.editorRaw))}}/>;
        // }
        // const markup =draftToHtml stateToHTML(this.state.editorCurrentState); <div dangerouslySetInnerHTML={{__html: }} /> ;
        return (
            <div className="container">
                <br/>
                <br/>
                <form className="text-right">
                    <div className="form-group">
                        <label>عنوان</label>
                        <input name="title" value={data.title} onChange={this.onChange} type="text" className="form-control" placeholder="نام مقاله"/>
                        {errors.title && <InlineError text={errors.title} />}
                    </div>
                    <div className="form-group">
                        <label>خلاصه</label>
                        <input name="abstract" value={data.abstract} onChange={this.onChange} type="text" className="form-control" placeholder="خلاصه حداکثر یک خط"/>
                        {errors.abstract && <InlineError text={errors.abstract} />}
                    </div>
                    <div className="form-group">
                        <label>نام محصول مرتبط</label>
                        <input name="product" value={data.product} onChange={this.onChange} type="text" className="form-control" placeholder="نام محصول مرتبط"/>
                        {/*{errors.product && <InlineError text={errors.product} />}*/}
                    </div>
                    <div className="form-group">
                        <label>عکس کوچک</label>
                        <input name="imageTitle" value={data.imageTitle} onChange={this.onChange} type="text" className="form-control" placeholder="لینک عکس"/>
                        {errors.imageTitle && <InlineError text={errors.imageTitle} />}
                    </div>
                    <Select
                        closeOnSelect
                        disabled={false}
                        multi
                        onChange={this.handleChange}
                        options={FLAVOURS}
                        placeholder="تگ های مربوط را انتخاب کن"
                        removeSelected
                        rtl
                        simpleValue
                        value={data.category}
                    />
                    <br/>
                    <DraftPlugin update={this.update} />
                    <br/>
                    <button hidden={loading} onClick={this.sendData} type="submit" className="btn btn-primary">Send</button>
                    <ClipLoader color={'#123abc'} loading={loading} />
                </form>
                <br/>
                <ContainerSmallSize/>
                <br/>
                <br/>
                <br/>{showTest}<br/><br/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user_id: state.auth.userData
    }
}

export default connect(mapStateToProps,null)(AddContent);
