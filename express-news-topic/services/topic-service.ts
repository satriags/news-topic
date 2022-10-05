import {db} from '../connection'

export const getTopic = async () => {
    let check = await db.query('SELECT * FROM topic WHERE deleted_at IS NULL ORDER BY id_topic DESC')

    if (check.length > 0) {
        return check;
    } else {
        return {
            message: "belum ada topik yang di tambahkan"
        };
        
    }
}
export async function getTopicById(id: number) {
    let check = await db.any('SELECT * FROM topic WHERE id_topic = $1', [id])
    if (check.length > 0) {
            
        return check;
    } else {
        return {
            message: "topik tidak ditemukan"
        };
    }
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
    

    let check = await db.any('SELECT * FROM topic WHERE id_topic = $1', [id])
   console.log(check)
    if (check.length > 0) {
           
        return await db.any('UPDATE topic SET deleted_at = $1 WHERE id_topic = $2', [deleted_at,id])
        return true;
   } else {
       return false;
   }
    
    

    // return await db.any('DELETE FROM topic WHERE id_topic = $1', [id])
}

export const checkDuplicate = (title : any) => {
    return db.query("SELECT * FROM topic WHERE name_topic = $1 AND deleted_at IS NULL", [title])
}
