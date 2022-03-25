# coding:utf-8

import time
import utils
import pandas as pd
import settings
import re

if __name__ == '__main__':
    settings.init()

    more_links = True
    print("""
==============================
🕷 starting crawler....
==============================
    """)
    
    # Loop through pages until there are no more new links 
    i = 0
    print("""
=======================================
|                                     |
| crawling archive pages for links 🔗 |
|                                     |
| maximum crawl for archive pages: {} |
|                                     |
======================================= 
    """.format(settings.link_collection_crawl_allowance))

    while ((more_links==True) & (settings.pages_crawled < settings.link_collection_crawl_allowance)):
        settings.pages_crawled +=1
        print('Page #{}'.format(i))
        if i > 0:
            article_links, more_links = utils.get_article_links_from_subsequent_page(page_number=i, article_links=article_links)

        else:
            article_links = utils.get_article_links_from_first_archive_page()
        
        time.sleep(settings.time_between_page_crawl)
        i+=1

        # Loop ending Information Alerts
        if settings.pages_crawled > settings.link_collection_crawl_allowance: 
            print('🚨 🚨 Exceeded Link Collection Crawl Allowance! 🚨 🚨')
        if more_links == False:
            print('🕷 finished collecting transcript links')

    # Loop over article links to get the transcript text back in a dict that includes the episode number
    # Then append the dict to the transcript array
    transcript_arr = []
    link_i = 0

    # Remove episodes for links that don't fit the standard format
    article_links = list(filter(lambda link: re.match('\/\d*\/', link), article_links))
    print("""
=======================================
|                                     |
|                                     |
|       Getting transcripts 📖        |
|                                     |
|                                     |
======================================= 
    """)
    for link in article_links:
        link_i += 1
        if settings.pages_crawled>=settings.crawl_allowance: # Safety Valve: If it goes over the crawl allowance, break the loop and move on to pushing to DB
            print('🚨 🚨 Exceeded Crawl Allowance! 🚨 🚨')
            break
        print('{}/{}'.format(link_i,len(article_links)))
        transcript_arr.append(utils.get_transcript_for_this_article(page_link=link))
        settings.pages_crawled +=1
        
        # If transcript array is getting too big, dump it into the DB to keep mem usage low
        if len(transcript_arr) >= settings.max_transcript_arr_size:
            df = pd.DataFrame.from_dict(transcript_arr,orient='columns') 
            utils.upload_to_db(df)
            print('dumped {} rows into DB 🚛 🚛'.format(len(transcript_arr)))
            transcript_arr = [] # Reset transcript array to empty 
        

    # To finish it off, transform the transcript array of dicts into a dataframe
    
    df = pd.DataFrame.from_dict(transcript_arr,orient='columns')
    
    print('Uploading to DB 🚛 🚛')
    # Commit to SQL DB
    utils.upload_to_db(df)
    print("""
=======================================
|                                     |
|                                     |
|              done! 🙌'              |
|                                     |
|                                     |
======================================= 

""")