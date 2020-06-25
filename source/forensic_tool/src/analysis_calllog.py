import base64
import sys
import pymysql

from konlpy.tag import Kkma

conn=pymysql.connect(host='localhost',user='root',password='1234', db='dataextraction', charset='utf8')

def select():
	curs=conn.cursor()
	#sql="select * from calllog"
	#sql="select * from contact"
	sql="select * from sms"
	curs.execute(sql)
	
	rows=curs.fetchall()
	print(rows[0])
	#for row in rows:
		#analysis_keyword(row[0])
	
def analysis_keyword(text):
	kkma = Kkma()
	result = kkma.nouns(text)
	result = str(result)
	print(base64.b64encode(result.encode('utf-8')))

select()

conn.close()