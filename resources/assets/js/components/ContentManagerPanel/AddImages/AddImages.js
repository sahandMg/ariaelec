import React , { Component } from 'react';
import axios from 'axios';
import InlineError from '../../messages/InlineError';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import ImagesLink from './ImagesLink/ImagesLink';
import { connect } from 'react-redux';
import URLs from '../../../URLs';

class AddImages extends Component {

    state = {
        data: {
            imageFile: null
        },
        images: [],
        loading: false,
        errors: {}
    }

    componentDidMount() {
        this.t1 = setTimeout(() => this.getImages(), 200)

        // let url = 'http://localhost:80/ariaelec/public/api/get-images?token='+this.props.token;
        // console.log(url);
        // axios.get(url)
        //     .then((response) => {
        //         console.log("Get images");
        //         console.log(response);
        //         return <h1>getImages</h1>
        //     })
        //     .catch(err => {
        //         console.log("err");
        //         console.log(err);
        //     });
    }

    componentWillUnmount() {
        clearTimeout(this.t1)
    }

    sendData = (event) => {
        event.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            let formData = new FormData();
            formData.append('token', this.props.token);
            console.log("image");
            // console.log(this.state.data.imageFile);
            formData.append('image', this.state.data.imageFile);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            // {token: this.props.token, image: this.state.imageFile }
            axios.post(URLs.base_URL+URLs.cm_add_image,{token: this.props.token, image: this.state.imageFile },config)
                .then((res) => {
                    Alert.success('عکس با موفقیعت بارگذاری شد', {
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
        }

    }

    validate = (data) => {
        const errors = {};
        if (!data.imageFile) errors.imageFile = "Can't be blank";
        return errors;
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onChangeFile = e => {
        console.log("image :");
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.files[0]}
        });
    }

    getImages = () => {
        let url = URLs.base_URL+URLs.cm_get_images+this.props.token;
        console.log(url);
        axios.get(url)
            .then((response) => {
            this.setState({images: response.data})
                // console.log("Get images");
                // console.log(response);
                // return <h1>getImages</h1>
            })
            .catch(err => {
                console.log("err");
                console.log(err);
            });
    }

    render() {
        const { data, errors, loading } = this.state;
        // console.log("imagesArray");
        // console.log(imagesArray);
        // console.log(imagesArray.length);
        const images =  this.state.images.map((item,i)=> {
            // console.log(i+" : "+item);
            return <ImagesLink link={"http://localhost:80/"+item} key={i}/>
        });
        return (
            <div className="container text-right">
                <form method="post" action={URLs.base_URL+URLs.cm_add_image}  encType="multipart/form-data">
                    <input hidden type="text" name="token" value={this.props.token} />
                    <div className="form-group">
                        <label>عکس </label>
                        <input name="imageFile" onChange={this.onChangeFile} type="file" className="form-control"/>
                        {errors.imageFile && <InlineError text={errors.imageFile} />}
                    </div>
                    <br/>
                    <button hidden={loading} type="submit" className="btn btn-primary">Add images</button>
                    <ClipLoader color={'#123abc'} loading={loading} />
                </form>
                <br/>
                <h2>همه ی عکس ها</h2>
                <div className="flex-row space-between flex-wrap">
                    {images}
                </div>
            </div>
        )
    }
};
const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps,null)(AddImages);

