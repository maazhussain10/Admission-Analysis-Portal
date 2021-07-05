--Select All Schools where more than 1 student is from
SELECT year,10th_institution,count(*) AS number FROM RMKEC GROUP BY year,10th_institution HAVING number>1 ORDER BY number DESC;

SELECT year,religion,count(religion) FROM RMKEC WHERE Branch in ("Information Technology","Civil Engineering") GROUP BY year,religion ;

select year,10th_institution, count(10th_institution) as count from RMKEC where Branch in ('Information Technology') group by year,10th_institution order by year