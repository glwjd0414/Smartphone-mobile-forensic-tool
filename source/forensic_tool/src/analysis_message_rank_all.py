import base64
import sys
import pymysql

from konlpy.tag import Twitter
from collections import Counter

conn=pymysql.connect(host='localhost',user='root',password='1234', db='dataextraction', charset='utf8')

def select():
	curs=conn.cursor()
	sql="select sms.type, sms.address, sms.date, sms.body, contact.name from sms left join contact on sms.address=contact.number;"
	curs.execute(sql)
	
	rows=curs.fetchall()
	data=""
	for row in rows:
		data+=row[3]
		
	analysis_keyword(data)
	
def analysis_keyword(text):
	twitter = Twitter()
	result = twitter.nouns(text)
	count=Counter(result)
	tag_count=[]

	for n, c in count.most_common(20):
		dics={'tag':n, 'count':c}
		tag_count.append(dics)
	for tag in tag_count:
		return_data=tag['tag']+"|"+str(tag['count'])
		print(base64.b64encode(return_data.encode('utf-8')))

select()

conn.close()

