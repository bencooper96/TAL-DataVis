# Transcript Page Utils
# coding:utf-8

from bs4 import BeautifulSoup
import requests
import time
import re
import pandas as pd

import settings
import db_connection

base_url="https://www.thisamericanlife.org"
url = base_url + "/archive"

def get_article_links_from_first_archive_page():
    # Get containers on page (Recently Aired & Archive)
    f = requests.get(url)
    soup = BeautifulSoup(f.content,'lxml')
    containers = soup.find_all('div', {'class':"nodes with-label clearfix"})
    
    # Drill down to articles within containers & concat links into list
    article_links = []
    for container in containers:
        container_articles = container.find_all('article')
        links = list(map(lambda x: x.find('a')['href'], container_articles))
        article_links = article_links + links
    
    return article_links

def get_article_links_from_subsequent_page(page_number, article_links):
    f = requests.get(url+'?page={}'.format(page_number))
    soup = BeautifulSoup(f.content,'lxml')
    articles_on_this_page = soup.find('div',{'class':'nodes clearfix'}).find_all('article')
    article_links_on_this_page = list(map(lambda x: x.find('a')['href'],articles_on_this_page))
    # Loop over articles to remove any duplicates 
    links_to_add =[]
    for article_link in article_links_on_this_page:
        if article_link not in article_links:
            links_to_add = links_to_add + [article_link]

    if len(links_to_add) == 0:
        return article_links, False
    else: 
        return article_links + links_to_add, True

def get_transcript_for_this_article(page_link):
    time.sleep(settings.time_between_page_crawl)
    # Find Transcript link 
    episode_num_slug = re.search('\/\d*\/',page_link)
    if(episode_num_slug != None):    
        episode_num = re.sub('\/','', episode_num_slug.group())
        f = requests.get(base_url+episode_num_slug.group()+'transcript/')
        soup = BeautifulSoup(f.content,'lxml')
        acts = soup.find_all('div',{'class':'act'})
        act_transcripts = {}
        i = 0
        for act in acts:
            """
            Creating a dict that looks like:
            {act1_title: "Foo", act_1text: "Lorem Ipsum..."}, {...},...
            """

            act_title = act.find('h3').text
            if ('prologue' not in act_title.lower()) & (i == 0):
                i = 1
            
            paragraphs = act.find('div', {'class':'act-inner'}).find_all('p')
            act_transcripts['act{}_title'.format(i)] = act_title
            act_transcripts['act{}_text'.format(i)] = list(map(lambda p: p.text, paragraphs))
            i += 1


        this_ep_dict = {"episode":episode_num}
        this_ep_dict.update(act_transcripts)

        return this_ep_dict


def upload_to_db(df):
    conn = db_connection.init()

    try:
        #this will fail if there is a new column
        df.to_sql(settings.table_name, conn, if_exists='append') # Commit to SQL DB 
    except:
        # If there are new columns, duplicate the DB into a DataFrame then overwrite the existing DB
        print('too many columns in new df. Attempting to pull DB & reupload...')
        data = pd.read_sql('SELECT * FROM {}'.format(settings.table_name), conn)
        df2 = pd.concat([data, df])
        df2.to_sql(name=settings.table_name, con=conn, if_exists='replace', index=False)