import React , { Component } from 'react';
import axios from 'axios';
import InlineError from '../../messages/InlineError';
import { ClipLoader } from 'react-spinners';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import URLs from '../../../URLs';

class UploadBOMExcel extends Component {

    state = {
        data: {
            imageFile: null
        },
        images: [],
        loading: false,
        errors: {}
    }

    componentDidMount() {

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

export default connect(mapStateToProps,null)(UploadBOMExcel);

