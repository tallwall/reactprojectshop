import React from 'react' ; 
import './SearchBox.css';
import axios from 'axios';
import Loader from '../loader.gif';
import { Link } from 'react-router-dom';
import { Button } from './Button';



class SearchBox extends React.Component {
    
    constructor (props ) {
        super(props);
        this.state = { 
            query: '',
			results: {},
			loading: false,
			message: '',
        };
        this.cancel = '';
    }
     
    
    
    fetchSearchResults = ( query) => {
    

        const searchUrl = `http://www.omdbapi.com/?apikey=ff1da951&s=${query}`;
        if (this.cancel) {
            // Cancel the previous request
            this.cancel.cancel();
        }
        // Createnew CancelToken
        this.cancel = axios.CancelToken.source();
        axios
            .get(searchUrl, {
                cancelToken: this.cancel.token,
            })
            .then((res) => {
               // console.log(res)
                const resultNotFoundMsg = ! res.data.length
                    ? 'no more search results. Please try a new search.'
                    : '';
                this.setState({
                    results: res.data,
                    message: resultNotFoundMsg,
                    loading: false,
                });
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch results...',
                    });
                }
            });
    }

handleOnInputChannge = (event) => {
    const query = event.target.value;
    if ( !query ) {
		this.setState({ query, results: {}, message: '' } );
        console.log(query);
        console.log("seun");
	} else {
		this.setState({ query, loading: true, message: '' }, () => {
			this.fetchSearchResults(query);
		});
	}

}; 
//
showAlert() {
    alert("Your Choice has been Nominated");
  }


    renderSearchResults = () => {
        const {results} = this.state;
        
        if (Object.keys(results).length && results.totalResults) {
            return (
                <div className="results-container">
                    {results.Search.map((result) => {
                        return (
                            <button onClick ={this.showAlert} key={result.title}  className="result-items">
                                <h6 className="image-title">{result.Title} ({result.Year}) </h6>
                                <div className="image-wrapper">
                                    <img className="image" src={result.Poster} alt={result.user}/>
                                </div>
                            </button>
                        );
                    })}
                </div>
            );
        }
    };
    

    render() {
        const {query, loading, message} = this.state;

        return(
            <div className= "searchbox-container">
                <label className= " search-label" htmlFor= "search-input">
                <input
					type="text"
					value={query}
					id="search-input"
					placeholder="Search..."
					onChange={this.handleOnInputChannge}
				/>
				<i className="fa fa-search search-icon" aria-hidden="true"/>

                
                </label>
                
                {/*Error Message*/}
				{message && <p className="message">{ message }</p>}
                

                {/*	Loader*/}
                <img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>
                
                { this.renderSearchResults() }

                
            </div>
        )
    }
}

export default SearchBox;