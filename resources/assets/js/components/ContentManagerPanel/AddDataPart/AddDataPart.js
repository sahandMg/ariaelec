import React , {Component} from 'react';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import InlineError from '../../messages/InlineError';


class AddDataPart extends Component {
    state = {
        data: {
            partName: '',
            count: 0,
            category: '',
            dataSheet: null,
            imagePart: null
        },
        loading: false,
        errors: {}
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
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            const fd = new FormData();
            fd.append('partName',this.state.data.partName);
            fd.append('count',this.state.data.count);
            fd.append('dataSheet',this.state.data.dataSheet);
            fd.append('imagePart',this.state.data.imagePart);
            console.log('this.state.data : ');
            console.log(this.state.data);
            let headers = {
                'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI4OWUzNTI1NDA4MzI3ZGNmNTI1YjAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIyMDkxNTcxfQ.qXaRtkUsRd6zBxT9Fzwj1BpmGE-0OIQ1nZxfpN82y-M'
            };
            let axiosConfig = {
                headers: {
                    'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI4OWUzNTI1NDA4MzI3ZGNmNTI1YjAiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTIyMDkxNTcxfQ.qXaRtkUsRd6zBxT9Fzwj1BpmGE-0OIQ1nZxfpN82y-M'
                }
            };
            console.log('fd : ');
            console.log(fd);
            axios.post('http://localhost:4000/admin/addPart', this.state.data , axiosConfig )
                .then((req,res) => {
                  console.log(req);
                    if(req.data) {
                        console.log('redirect');
                    }
                    this.setState({loading: false});
                })
                .catch((error)=> {
                    this.setState({loading: false});
                    console.log('error');
                    console.log(error);
                });
        }

    }


    render() {
        const { data, errors, loading } = this.state;
        return (
          <div className="container">
            <br/>
            <br/>
            <form className="text-right">
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Part Name</label>
                    <input name="partName" value={data.partName} onChange={this.onChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Atmega8A"/>
                    {errors.partName && <InlineError text={errors.partName} />}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Count</label>
                    <input name="count" value={data.count} onChange={this.onChange} type="number" className="form-control" id="exampleFormControlInput2"/>
                    {errors.count && <InlineError text={errors.count} />}
                </div>
                <div className="form-group">
                    <label className="text-right" htmlFor="exampleFormControlFile1">DataSheet</label>
                    <input name="dataSheet"  onChange={this.onChangeFile} type="file" className="form-control-file" id="exampleFormControlFile1"/>
                    {errors.dataSheet && <InlineError text={errors.dataSheet} />}
                </div>
                <div className="form-group">
                    <label className="text-right" htmlFor="exampleFormControlFile2">Image Part</label>
                    <input name="imagePart" onChange={this.onChangeFile} type="file" className="form-control-file" id="exampleFormControlFile2"/>
                    {errors.imagePart && <InlineError text={errors.imagePart} />}
                </div>
                <div className="form-group">
                  <select name="category">
                    <option value="australia">همه</option>
                    <option value="canada">IC</option>
                    <option value="usa">مقاومت ها</option>
                  </select>
                </div>
                <button hidden={loading} onClick={this.sendData} type="submit" className="btn btn-primary">Send</button>
                <ClipLoader color={'#123abc'} loading={loading} />
            </form>
          </div>
        )
    }
};

export default AddDataPart;