import base64
import sys
import pymysql

conn=pymysql.connect(host='localhost',user='root',password='1234', db='dataextraction', charset='utf8')

def select():
	curs=conn.cursor()
	sql="drop table if exists sms_bank;"
	curs.execute(sql)
	sql="create table sms_bank(date datetime not null, bname text, price int, paymentplan text, sname text, primary key (date));"
	curs.execute(sql)
	sql="select body,date from sms where address in (15881600,16445330,15888900,15881688);"
	curs.execute(sql)
	
	rows=curs.fetchall()
	for row in rows:
		body=row[0].replace("<재난지원금 사용>\n","").replace("누적",":")
		body=" ".join(body.split("\n"))
		body_split=body.split(' ')
		_bname=body_split[1][:-2]
		_price=body_split[3][:-1].replace(",","")
		_paymentplan=body_split[4]
		_date=row[1].strftime("%Y-%m-%d %H:%M:%S")
		_sname=' '.join(body_split[7:])
		_sname=_sname.split(":")[0]
		curs2=conn.cursor()
		sql2="insert into sms_bank(bname, price, paymentplan, date, sname) values (%s, %s, %s, %s, %s);"
		curs2.execute(sql2, (_bname, _price, _paymentplan, _date, _sname))
		conn.commit()
	#print(base64.b64encode("Conplete".encode('utf-8')))

select()

conn.close()

