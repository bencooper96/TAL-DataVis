from datetime import datetime

def init():
    global time_between_page_crawl
    global crawl_allowance
    global link_collection_crawl_allowance
    global pages_crawled
    global max_transcript_arr_size
    global table_name

    
    time_between_page_crawl = 10 #in seconds
    max_transcript_arr_size = 20
    crawl_allowance = 1000
    link_collection_crawl_allowance = 30
    pages_crawled = 0
    table_name = datetime.now().strftime("episode_transcripts_%m_%d_%Y_%H_%M_%S")
    