import React, {useState} from 'react';
import './SearchForm.css'

const SearchForm = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form id='search-form' onSubmit={handleSubmit}>
            <label>Search for a movie:</label>
            <div id="search-line">
                <input type="text" 
                value={searchQuery} 
                onChange={handleChange} 
                required
                />
                <button type="submit">Search</button>
            </div>
        </form>
    );
}



 export default SearchForm;