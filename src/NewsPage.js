import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from "./component/NewsCard";
import ReactPaginate from 'react-paginate';

 
function NewsPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [totalPages, setTotalPages] = useState(0);
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");


    const handlePageChange = event => {
        setCurrentPage(event.selected);
    }

    

    // articles.sort(function (a, b) {
    //     var dateA = new Date(a.date), dateB = new Date(b.date)
    //     return dateA - dateB
    // });
    
    const handleSubmit = event => {
        event.preventDefault();
        setCurrentPage(0);
        setQuery(searchInput);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async() => {
            try{
                const {data} = await axios.get(
                    "https://hn.algolia.com/api/v1/search?",
                    {
                        params: {page: currentPage, query},
                    }
                    );
                const { hits, nbPages } = data;
                setArticles(hits);
                setTotalPages(nbPages);
            } catch(err) {
                console.log(err);
            } finally{
                setIsLoading(false);
            }

        };
        fetchData();
    }, [currentPage, query]);

  return (
    <div className='container'>
        <h1>Search Hacker News</h1>
        <form className='search-form' onSubmit={handleSubmit}>
            <input 
                // className='search-bar' 
                placeholder='Search For News' 
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
            />
            {/* <button type='submit'> Search </button> */}
        </form>
        <ReactPaginate
            nextLabel= ">>"
            previousLabel="<<"
            breakLabel= "..."
            forcePage={currentPage}
            pageCount={totalPages}
            renderOnZeroPageCount={null}
            onPageChange={handlePageChange}
            className='pagination'
            activeClassName='active-page'
            previousClassName='previous-page'
            nextClassName='next-page'
        />
        <div className='news-container'>
            {isLoading ? (
                <p>Loading....</p> 
            ): (
                articles.map((article) => (
                    <NewsCard article={article} key={articles.objectID}/>
                ))
            )}
        </div>
    </div>
  );
};

export default NewsPage;