import {db} from '../connection'

export const getNews = async () => {
    return await db.query("SELECT A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic AND A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC")
}
