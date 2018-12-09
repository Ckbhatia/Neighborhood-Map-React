import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class List extends Component{

    render() {
        let {locations, showInfo, query, inputChange} = this.props;

        return(
            <div className="List">
            <div className='side-drawer open'>
                <h4 tabIndex={0}>Nearby Places</h4>
                <div className="filter">
                    <i className="fas fa-search-location"></i>
                    <label htmlFor="filter-input" className="search-accs">Search Location</label>
                    <input tabIndex={0} type="text" id="filter-input" className="query" placeholder="Search Nearby Places" value={query} onChange={e => inputChange(e.target.value)}/>
                </div>
                <ol aria-label = 'List of Restaurants'>
                    {locations.map(loc =>(
                        <li 
                            className="listItem title" 
                            tabIndex={0}
                            role="button"
                            key={loc.venue.id}
                            onClick={() => {showInfo(loc)}}>
                            {loc.venue.name}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
        )
    }
};

List.propTypes = {
    locations: PropTypes.array.isRequired,
    inputChange: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
}