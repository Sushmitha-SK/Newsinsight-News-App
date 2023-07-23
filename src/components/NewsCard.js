import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../redux/actions/newsActions';
import newsimage from '../assets/news.jpg'
import { fetchCategory } from '../redux/slice/newsSlice';

const NewsCard = () => {
    const [currentCategory, setCurrentCategory] = useState('business');
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const newsData = useSelector((state) => state.news.newsData);
    const categoryData = useSelector((state) => state.news.category);

    const newsPerPage = 9;
    const totalPages = Math.ceil(newsData.length / newsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNewsData = newsData.slice(indexOfFirstNews, indexOfLastNews);

    useEffect(() => {
        dispatch(fetchCategory(currentCategory))
        dispatch(fetchNewsData(currentCategory));
    }, [dispatch, currentCategory]);

    useEffect(() => {
        setCurrentPage(1);
    }, [currentCategory]);


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <>
            <div className='container-fluid newsTypeTitle'>
                <h1 className="text-center mt-2 headlines">Newsinsight - Top {capitalizeFirstLetter(categoryData)}  Headlines</h1>

            </div>
            <div className="container">

                <div className="row"
                    style={{ marginTop: '15%' }}
                >
                    {currentNewsData.map((news) => (
                        <div className="col-md-4">
                            <div className="my-3" key={news.id}>
                                <div className="card card-container">
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        position: 'absolute',
                                        right: '0'
                                    }
                                    }>
                                        <span className="badge rounded-pill bg-danger"> {news.source.name} </span>
                                    </div>
                                    <img src={!news.urlToImage ? newsimage : news.urlToImage} className="card-img-top fixed-height-image" alt="..." />
                                    <div className="card-body d-flex flex-column" style={{ height: '200px' }}>
                                        <h5 className="card-title" style={{ fontSize: '16px', fontWeight: 600 }}>{news.title}  </h5>
                                        <p className="card-text news-description">{news.description}</p>
                                        <a rel="noreferrer" href={news.url} target="_blank" className="btn btn-sm readmorebtn" style={{ width: '100px' }}>Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="d-flex justify-content-center mt-3">

                {currentPage > 1 && (
                    <button className="btn btn-custom" onClick={handlePrevPage}><i className="fas fa-angle-left" />&nbsp;Prev</button>
                )}
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`btn ${currentPage === pageNumber ? 'btn-custom-active' : 'btn-custom'}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button className="btn btn-custom" onClick={handleNextPage}>Next&nbsp;<i className="fas fa-angle-right" /></button>
                )}
            </div>
        </>
    )
}

export default NewsCard