import {db} from '../connection'

export const getTopic = async () => {
    return await db.query('SELECT * FROM topic WHERE deleted_at IS NULL ORDER BY id_topic DESC')
}
export async function getTopicById(id: number) {
    return await db.any('SELECT * FROM topic WHERE id_topic = $1', [id])
}

export const saveTopic = async (topic: any) => {

   let created_at = new Date();

    return await db.one('INSERT INTO topic(name_topic, created_at) ' +
        'VALUES ($1, $2) RETURNING id_topic',
        [topic.name_topic, created_at])
}

export const updateTopic = async (id: number, topic: any) => {
    let created_at = new Date();
    
    return await db.one('UPDATE topic SET name_topic = $1, updated_at = $2 ' +
        'WHERE id_topic = $3 RETURNING id_topic',
        [topic.name_topic, created_at,  id])
}

export const deleteTopic = async (id: number) => {
   let deleted_at = new Date();
    

    return await db.any('UPDATE topic SET deleted_at = $1 WHERE id_topic = $2', [deleted_at,id])
    // return await db.any('DELETE FROM topic WHERE id_topic = $1', [id])
}

export const checkDuplicate = (title : any) => {
    return db.query("SELECT * FROM topic WHERE name_topic = $1 AND deleted_at IS NULL", [title])
}
