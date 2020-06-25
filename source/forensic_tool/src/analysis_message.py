import base64
import sys
import pymysql

from konlpy.tag import Twitter

conn=pymysql.connect(host='localhost',user='root',password='1234', db='dataextraction', charset='utf8')

def select():
	curs=conn.cursor()
	sql="select sms.type, sms.address, sms.date, sms.body, contact.name from sms left join contact on sms.address=contact.number;"
	curs.execute(sql)
	
	rows=curs.fetchall()
	for row in rows:
		return_data=" "
		if row[0]==1:
			return_data+="get|"
		else:
			return_data+="send|"
		if row[4] is None:
			return_data+=row[1]+" ( - )|"
		else:
			return_data+=row[1]+" ("+row[4]+")|"
		return_data+=row[2].strftime("%Y-%m-%d %H:%M:%S")+"|"
		return_data+=row[3]+"|"
		analysis_keyword(return_data, row[3])
	
def analysis_keyword(return_data, text):
	twitter = Twitter()
	result = twitter.nouns(text)
	result=" ".join(str(x) for x in result)
	result=return_data+result
	print(base64.b64encode(result.encode('utf-8')))

select()

conn.close()

