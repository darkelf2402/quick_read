import React from 'react'
import { useState,useEffect } from 'react';
import {useLazyGetSummaryQuery} from '../services/article.js';

import {logo,copy,tick,linkIcon,loader} from '../assets';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary , {error , isFetching}] = useLazyGetSummaryQuery();

  const [copied , setCopied] = useState("")

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }

  } , [])


  const handleSubmit = async (e) => {

    e.preventDefault();
    const {data} = await getSummary({articleUrl: article.url});

    if(data?.summary){

      const newArticle = {...article, summary: data.summary}

      const updatedArticles = [newArticle, ...allArticles]

      

      setAllArticles(updatedArticles);

      setArticle(newArticle);

      console.log(newArticle);

      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <section className='mt-16 w-full max-w-xl'>
       <div className='flex flex-col w-full gap-2'>
        <form className='relative flex justify center items center'
        onSubmit={handleSubmit}>
        
          <img 
          src={linkIcon} 
          className='absolute left-0 my-2 ml-3 w-5' 
          alt="Link Icon" />


          <input 
            type="url" 
            placeholder='Enter URL' 
            value={article.url}
            onChange={(e) => setArticle({...article,
             url: e.target.value})} 
            className='url_input peer' 
            required/>
          <button type='submit' className='submit_btn 
            peer-focus:border-gray-700
            peer-focus:text-gray-700
          '>
            Go
          </button>
        </form>

        {/* Browse URL History */}

        <div className='flex flex-col gap-1 overflow-y-auto max-h-70'>
              {allArticles.map((article,index) => ( 
                <div
                key={`link-${index}`}
                onClick={() => setArticle(article)}
                className='link_card'
                >
                  <div className='copy_btn' 
                  onClick={() => {handleCopy(article.url)}}>
                    <img src={copied === article.url ? tick:copy} alt="Copy_icon" className='w-[40%] h-[50%]'/>
                  </div>
                  <p
                  className='flex-1 font-satoshi text-blue-700 text-sm font-medium truncate'
                  >{article.url}</p>
                </div>
              ))}
        </div>
        
       </div>

       {/* Display Result */}
        <div 
        className='my-10 max-w-full justify-center flex items-center'>
          {isFetching ? (
            <img src={loader} 
            alt="Loader" 
            className='w-20 h-20 object-contain'/>
          ) : error?(
            <p 
            className='font-inter font-bold text-black text-center'>
              Damn ,my bad. Something went wrong.
              <br />
              <span className='font-satoshi font-normal'>
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary  && (
              <div className='flex flex-col gap-4'>
                <h2 className='font-satoshi font-bold text-gray-700 text-xl' >
                Article 
                <span 
                className='orange_gradient'> Summary</span></h2>
                <div className='summary_box'>
                  <p className='font-inter font-medium text-gray-800 text-sm'>
                  {article.summary}</p>
                </div>
              </div>
            )
          )}
        </div>
    </section>
  )
}

export default Demo