import React , {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import dataCode from '../../dataCode';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import buildUrl from 'build-url';
import * as actions from '../../store/actions/index';
import Alert from 'react-s-alert';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';
import './showSearchProductResult.css';
import URLs from "../../URLs";
import styles from './custom-styling.css';

let prices = {};let counter = 0;

class showSearchProductResult extends Component {

    state  = {
        searchKey: '', data: '', dataParts: [], dataCode: '', dataFilters: [],open: false, prices: {},
        tableHeaderS: '', filters: {}, loading: true, number: {},loadingAddCart: true,productName: '', category: ''
    }

    componentDidMount() {
        let url = URLs.base_URL+URLs.search_part_category+this.props.match.params.category+'&keyword='+this.props.match.params.keyword;
        let temp = window.location.href;
        temp = temp.replace(URLs.react_search_url+this.props.match.params.category+'/'+this.props.match.params.keyword,'');
        temp = temp.replace('/','');
        console.log('temp');console.log(temp);
        console.log('url');console.log(url);
        // if(temp !== '') { url = url + '&filters='+temp; }
        this.setState({searchKey: this.props.match.params.keyword});
        axios.get(url)
            .then(response => {
                console.log("componentDidMount");
                console.log(response);
                console.log(dataCode.partSearch);
                if(response.data[0] === dataCode.partSearch) {
                    console.log("IS EQUAL");
                    this.setState({dataCode: response.data[0],dataParts: response.data[2],dataFilters: response.data[3],tableHeaderS: response.data[5]});
                }
                this.setState({loading: false});
            })
            .catch(err => {
                console.log(err);
            });
    }

    sort = (property,kind) => {
        console.log("sort");
        console.log(property);
        console.log(kind);
    }

    filterComponent = () => {
         let temp = {} ;
         Object.keys(this.state.filters).map((property) => {
             let temp2;
             Object.keys(this.state.tableHeaderS).map((property2) => {
                if(this.state.tableHeaderS[property2] === property) { temp2 = property2; }
                return null;
             });
            let buffer3 = this.state.filters[property].split(",");
            temp[temp2] = buffer3;
             return null;
        });
         let url = buildUrl('/search/'+this.state.dataParts[0].slug+'/'+this.props.match.params.keyword+'/', {
             queryParams: {
                 'filters': JSON.stringify(temp)
             }
         });
         url = url.replace('?filters=','/');
        this.props.history.push(url);
        window.location.reload();
    }

    setNumber = (e,num) => {
        // console.log('num');console.log(num);console.log('e');console.log(e.target.value);
       let temp = this.state.number;temp[num] = e.target.value; this.setState({number: temp});
    }

    addToCart = (productName,category) => {
       if(this.props.token) {
           this.setState({loadingAddCart: true});
           // console.log("number one :");console.log(this.state.number[productName]);
           axios.post(URLs.base_URL+URLs.user_cart_create, {
               keyword: productName,
               num: this.state.number[productName],
               token: this.props.token
           })
               .then(response => {
                   console.log(response);
                   this.props.addToCart(productName, this.state.number[productName], category);
                   Alert.success('به سبد خرید اضافه شد', {
                       position: 'bottom-right',
                       effect: 'scale',
                       beep: false,
                       timeout: 4000,
                       offset: 100
                   });
                   this.setState({loadingAddCart: false});
               })
               .catch(err => {
                   console.log(err);
                   Alert.error('دوباره امتحن کنید', {
                       position: 'bottom-right',
                       effect: 'scale',
                       beep: false,
                       timeout: 4000,
                       offset: 100
                   });
                   this.setState({loadingAddCart: false});
               });

       } else {
           this.props.addToCart(productName, this.state.number[productName], category, null);
           Alert.success('به سبد خرید اضافه شد', {
               position: 'bottom-right',
               effect: 'scale',
               beep: false,
               timeout: 4000,
               offset: 100
           });
       }
       this.onCloseModal();
    }

    setInitialForPriceInput = () => {
        let temp = this.state.number;
        if(Object.keys(temp).length == 0) {
            this.state.dataParts.map((item, i) => {
                 Object.keys(item).map((property, j) => {
                    if(property === "unit_price") {
                        temp[item['manufacturer_part_number']] = 1 ;
                        prices[item['manufacturer_part_number']] = 0;
                    }
                });
            });
            console.log("setInitialForPriceInput");console.log(temp);
            this.setState({number: temp});
            Object.keys(prices).map((property, j) => {
                console.log(j+" : "+ property);
                axios.post(URLs.base_URL+URLs.product_get_price, {keyword: property})
                    .then(response => {
                        console.log(j+" : ");counter++;
                        console.log(response);
                        if(connect === Object.keys(prices).length) {
                            console.log("get last response ");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

            });

         }
    }

    onOpenModal = (productName,category) => {
        if(this.props.token) {
            this.setState({open: true});
            this.setState({productName: productName, category: category});
        } else {
            this.addToCart(productName,category);
        }
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        let dataParts;
        let tableHeads ;
        let dataFilters ;
        let filterButton;
        if(this.state.dataCode === dataCode.partSearch) {
            // dataTables
             tableHeads = Object.keys(this.state.dataParts[0]).map((property) => {
                 let temp = null;
                 Object.keys(this.state.tableHeaderS).map((property2,i) => {
                    if(this.state.tableHeaderS[property2] === property) {
                        temp = <th style={{minWidth: '110px'  }} key={property+'1'}><p>{property}</p><button className="btn btnHoverGreen" style={{margin: '2px' }} onClick={() => {this.sort(property,'increase')}}><i className="fa fa-arrow-up" aria-hidden="true"></i></button><button className="btn btnHoverRed" onClick={() => {this.sort(property,'increase')}}><i className="fa fa-arrow-down" aria-hidden="true"></i></button></th> ;
                    }
                    return null;
                 });
                 if(temp === null) {
                     if( !((property === "slug") || (property === "name") || (property === "type") || (property === "original") || (property === "part_status") || (property === "persian_name"))) {
                         return (   <th key={property + '2'} style={{paddingBottom: '52px'}}><p>{property}</p></th> );
                     }
                 } else {  return temp; }
             });
             this.setInitialForPriceInput();
             dataParts = this.state.dataParts.map((item, i) => {
                let entry = Object.keys(item).map((property, j) => {
                    if(property === "unit_price") {
                        return ( <td key={property}><p hidden={this.state.loadingAddCart}>{this.state.prices[item['manufacturer_part_number']]}</p>
                                <input value={this.state.number[item['manufacturer_part_number']]} onChange={(e) => this.setNumber(e,item['manufacturer_part_number'])} type="number" className="form-control" placeholder="1"/>
                                <button hidden={this.state.loadingAddCart} onClick={()=> this.onOpenModal(item['manufacturer_part_number'],item[property])} className="btn btn-success" style={{margin: '5px'}}>خرید</button>
                                <ClipLoader color={'#123abc'} loading={this.state.loadingAddCart} />
                        </td> )
                    } else if(property === "hd_image") {
                        return ( <td key={property}><img alt={this.state.searchKey} src={item[property]} /></td> )
                    } else if(property === "ld_image") {
                        return ( <td key={property}><a href={item[property]}><i className="fa fa-file-text" aria-hidden="true"></i></a></td> )
                    } else if( !((property === "slug") || (property === "name") || (property === "type") || (property === "original") || (property === "part_status") || (property === "persian_name"))) {
                        return ( <td key={property}>{item[property]}</td> )
                    }

                });
                return (
                    <tr key={i}>{entry}</tr>
                );
            });
             // data Filters
            let dataFiltersTemp = this.state.dataFilters;
            dataFilters = Object.keys(dataFiltersTemp).map((property,i) => {
                let options =[];
                dataFiltersTemp[property].map((item) => {options.push({label: item,value: item}); return null; } );
                    return (
                        <div className="col-md-2 col-sm-6 colScrollable" key={i}>
                            <p style={{textAlign: 'center',fontSize: '125%'}}>{property.split('_').join(' ')}</p>
                            <Select
                                closeOnSelect
                                disabled={false}
                                isMulti
                                onChange={(selectedOption) => {let temp = this.state.filters;temp[property] = selectedOption;this.setState({filters: temp});console.log(temp);}}
                                options={options}
                                placeholder=""
                                removeSelected
                                simpleValue
                                value={this.state.filters[property]}
                            />
                        </div>
                    );
            });

            if(Object.keys(dataFiltersTemp).length > 1) {  filterButton = <button onClick={this.filterComponent} hidden={this.state.loading} className="btn btn-primary buttonFilter">فیلتر</button> }
        }
        return(
            <div className="container table-responsive text-center searchResultContainer">
               <div>
                <ClipLoader loaderStyle={{size: '200'}} color={'#123abc'} loading={this.state.loading} />
               </div>
                <div className="row text-center rowScrollable">{dataFilters}</div>
                <br/>
                {filterButton}
                <br/><br/>
                <table className="table table-striped">
                    <thead>
                      <tr>{tableHeads}</tr>
                    </thead>
                      <tbody>{dataParts}</tbody>
                </table>
                <Modal open={this.state.open} onClose={this.onCloseModal} center
                       classNames={{overlay: styles.customOverlay, modal: styles.customModal,}}>
                  <div className="select-project">
                    <h3 className="text-center"> انتخاب پروژه</h3>
                    <br/>
                    <div className="col-lg-4 col-md-6 col-sm-10 horizontal-center">
                        <select className="form-control" id="sel1">
                            <option>-</option><option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <br/>
                    <button onClick={()=> this.addToCart(this.state.productName, this.state.category)} className="btn btn-success horizontal-center">اضافه به سبد خرید</button>
                    <br/>
                  </div>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (productName,number,category,projectName) => dispatch(actions.addToCart(productName,number,category,projectName)),
    };
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(showSearchProductResult));