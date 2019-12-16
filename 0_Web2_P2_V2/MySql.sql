DROP SCHEMA IF EXISTS Web_Project;
Create Database Web_Project;
Use Web_Project;

Create Table Event_Info
(
ID INT NOT NULL AUTO_INCREMENT,
Event_Time VARCHAR(250),
Event_Type VARCHAR(150),
Event_Target VARCHAR(150),
PRIMARY KEY(ID)
);

#select * from Event_Info;
#drop table Event_Info;