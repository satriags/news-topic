import { db } from '../connection'

export const getNews = async () => {
    return await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC")
}



export const getSearch = async (filter: any) => {

    if (filter.keywords == '' && filter.filter_topic == '') {
        return await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC")
    } else {


        let filter1: String = "";
        let filter2: String = "";

        if (filter.keywords != '') {
            filter1 = " A.title_articel LIKE $1 AND ";
        }
        if (filter.filter_topic != '') {
            filter2 = " A.id_topic = $2 AND  ";
        }

        return await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE "
            + filter1
            + filter2
            + " A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC", ['%' + filter.keywords + '%', filter.filter_topic])

        /* return await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE "
        + (filter.keywords == '' ? "" : "A.title_articel LIKE $1 AND ")
        + (filter.filter_topic == '' ? "" : "A.id_topic = $2 AND ")
        + " A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC", ['%'+filter.keywords+'%', filter.filter_topic]) */

    }
}


