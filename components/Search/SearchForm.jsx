import React, {useState} from 'react';


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
        <form onSubmit={handleSubmit}>
            <label>Search for a movie:</label>

            <input type="text" 
            value={searchQuery} 
            onChange={handleChange} 
            required
            />
            <button type="submit">Search</button>
        </form>
    );
}



 export default SearchForm;