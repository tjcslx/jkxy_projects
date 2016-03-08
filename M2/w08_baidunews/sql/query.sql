/*查询前五张图片用于显示滚动图*/
select n2.n_id, n2.np_id, n2.np_src from news_picsub n2, news_main n1 where n1.n_id = n2.n_id and n1.n_status = '1' and n2.np_status = '1' ORDER BY n2.n_id, n2.np_id DESC LIMIT 5

/*查询全部版块的前十条新闻*/
select n1.n_heading, LEFT(n1.n_content, 10), n1.insert_time, do.dno_name from news_main n1, d_news_origin do where n1.n_origin = do.dno_id and n1.n_status = '1' ORDER by n1.n_id desc LIMIT 10

/*查询选择版块的前十条新闻*/
select n1.n_heading, LEFT(n1.n_content, 10), n1.insert_time, do.dno_name from news_catsub n2, news_main n1, d_news_origin do where n1.n_id = n2.n_id and n1.n_origin = do.dno_id and n2.dnc_id = 'cat_id' AND n1.n_status = '1' ORDER by n1.n_id desc LIMIT 10

/*标记哪些新闻有图片，哪些没有图片*/
select n1.n_heading, n1.n_content, do.dno_name, n1.insert_time from news_picsub n3, news_catsub n2, news_main n1, d_news_origin do where n1.n_id = n2.n_id and n1.n_id = n2.n_id(+) AND n1.n_origin = do.dno_id and n2.dnc_id = 'cat_id' AND n1.n_status = '1' ORDER by n1.n_id desc LIMIT 10