import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import dataCode from '../../../../dataCode';
import './Search.css';
import URLs from "../../../../URLs";


let searchSug = [];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : searchSug.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};


const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

const theme = { input: 'form-control input-border', suggestionsContainer: 'auto-suggest-inputOpen',
    suggestionHighlighted: 'auto-suggest-highlighted', suggestionsList: 'auto-suggest-suggestionsList ',
    suggestion: 'auto-suggest-suggestion'};

class Search extends Component {
    state  = {
        searchKey: '',
        redirect: false,
        category: 'all',
        value: '',
        suggestions: []
    }

    searchHandler = (event) => {
        event.preventDefault();
        const url = '/search/'+this.state.category+'/'+this.state.searchKey;
        if(this.props.history.location.pathname.includes('search')) {
            this.props.history.push(url);
            window.location.reload();
        } else {
            this.props.history.push(url);
        }
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }


    onChangeTest = (event, { newValue }) => {
        if(newValue.length > 3) {
            console.log(newValue);
            let url = URLs.base_URL+URLs.search_part+newValue;
            console.log(url);
            axios.get(url)
                .then(response => {
                    console.log(response.data[1]);
                    if(response.data[0] === dataCode.partSearch) {
                        searchSug = [];
                        response.data[1].map((item) => {
                            searchSug.push({name: item.manufacturer_part_number});
                            return null;
                        });
                        console.log(searchSug);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        this.setState({
            searchKey: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => { this.setState({ suggestions: getSuggestions(value) }); };

    onSuggestionsClearRequested = () => { this.setState({suggestions: []}); };

    render() {
        const { searchKey, suggestions } = this.state;

        const inputProps = {
            placeholder: 'جست وجو ...',
            value: searchKey,
            onChange: this.onChangeTest
        };

        return (
            <div className="col-12 d-flex justify-content-center p-1 bg-dark">
                <form onSubmit={this.searchHandler} className="form-inline" id="responsiveSearch">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn btn-default search-responsive-size" onClick={this.searchHandler}>
                                <span className="fa fa-search"></span>
                            </button>
                        </div>
                        <Autosuggest theme={theme}
                                     suggestions={suggestions}
                                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                     getSuggestionValue={getSuggestionValue}
                                     renderSuggestion={renderSuggestion}
                                     inputProps={inputProps}
                        />
                        <div className="input-group-append p-0 responsive-search-select">
                            <select className="form-control m-0 pr-4 search-responsive-size" dir="rtl" value={this.state.category} onChange={this.onChange} name="category">
                                <option value="آیتم اول" dir="rtl">آیتم اول</option>
                                <option value="محصوولات فروشی" dir="rtl">محصوولات فروشی</option>
                                <option value="محصولات دسته دوم" dir="rtl">محصولات دسته دوم</option>
                                <option value="دارای درجه بندی" dir="rtl">دارای درجه بندی</option>
                                <option value="قابلیت ارسال رایگان" dir="rtl">قابلیت ارسال رایگان</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Search);
