import { db } from '../connection'

export const getNews = async () => {

    let check = await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at,A.status_articel FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE A.status_articel NOT IN ('deleted','draft') ORDER BY T.id_topic DESC")

    if (check.length > 0) {
        return check;
    } else {
        return {
            message: "belum ada artikel yang di published"
        };
        
    }
}

export async function getDetailArticel(slug: String) {
    // console.log(slug)

    let check = await db.any("SELECT A.status_articel,A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE A.status_articel IN ('published') AND A.slug_articel = $1", [slug]);
    if (check.length != 1) {
        return {
            message: "artikel tidak ditemukan"
        };
        
    } else {
        return check;
    }
}



export const getSearch = async (filter: any) => {

    if (filter.keywords == '' && filter.filter_topic == '') {
        let check = await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at,A.status_articel FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE A.status_articel NOT IN ('deleted','draft') ORDER BY T.id_topic DESC")

        if (check.length > 0) {
         
            
            return check;
        } else {
            return {
                message: "artikel tidak ditemukan"
            };
        }
    } else {


        let filter1: String = "";
        let filter2: String = "";

        if (filter.keywords != '') {
            
            filter1 = "(A.title_articel ILIKE $1 OR T.name_topic = $3) AND";
        }
        if (filter.filter_topic != '') {
            filter2 = " A.id_topic = $2 AND  ";
        }

        let check = await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at,A.status_articel FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE "
            + filter1
            + filter2
            + " A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC", ['%' + filter.keywords + '%', filter.filter_topic, filter.keywords])
            if (check.length > 0) {
                
                return check;
            } else {
                return {
                    message: "artikel tidak ditemukan"
                };
            }
        
        
        /* return await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at,A.status_articel FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE "
        + (filter.keywords == '' ? "" : "A.title_articel LIKE $1 AND ")
        + (filter.filter_topic == '' ? "" : "A.id_topic = $2 AND ")
        + " A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC", ['%'+filter.keywords+'%', filter.filter_topic]) */

    }
}


