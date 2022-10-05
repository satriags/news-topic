import {db} from '../connection'

export const getArticel = async () => {
    return await db.query("SELECT A.status_articel,A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE A.status_articel NOT IN ('deleted') ORDER BY T.id_topic DESC")
}
export async function getArticelById(id: number) {



    let check = await db.any("SELECT A.status_articel,A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE A.status_articel NOT IN ('deleted')  AND A.id_articel = $1", [id])
    if (check.length > 0) {
            
        return check;
    } else {
        return {
            message: "artikel tidak ditemukan"
        };
    }
}
export async function getArticelByTopicId(id: number) {
    return await db.any('SELECT * FROM articel WHERE id_topic = $1 AND deleted_at IS NULL', [id])
}

export const saveArticel = async (articel: any) => {
    
    
   let created_at = new Date();

    let slug_articel = titleToSlug(articel.title_articel);

    return await db.one('INSERT INTO articel (title_articel,content_articel,status_articel,id_topic,slug_articel, created_at) ' +
        'VALUES ($1, $2,$3,$4,$5,$6) RETURNING id_articel',
        [articel.title_articel, articel.content_articel,articel.status_articel, articel.id_topic,slug_articel , created_at])
}

export const updateArticel = async (id: number, articel: any) => {
    let updated_at = new Date();
    let slug_articel = titleToSlug(articel.title_articel);


    return await db.one('UPDATE articel SET title_articel = $1, content_articel = $2, status_articel = $3, id_topic = $4, slug_articel = $5, updated_at = $6 ' +
        'WHERE id_articel = $7 RETURNING id_articel',
        [articel.title_articel, articel.content_articel,articel.status_articel, articel.id_topic,slug_articel , updated_at,id])
}
export const deleteArticel = async (id: number) => {
    
   let deleted_at = new Date();
    
   let check = await db.any("SELECT A.status_articel,A.id_articel,T.name_topic,A.title_articel,A.slug_articel,A.content_articel,T.id_topic,A.created_at FROM articel A JOIN topic T ON T.id_topic=A.id_topic WHERE  A.id_articel = $1", [id])
   console.log(check)
    if (check.length > 0) {
           
        await db.any("UPDATE articel SET status_articel='deleted',deleted_at = $1 WHERE id_articel = $2", [deleted_at, id])
        return true;
   } else {
       return false;
   }
   
    
    // return await db.any('DELETE FROM articel WHERE id_articel = $1', [id])
}



export const checkDuplicate = (title : any) => {
    return db.query("SELECT * FROM articel WHERE title_articel = $1 AND status_articel NOT IN ('deleted')", [title])
}

export const titleToSlug =  (title : any) => {
    let slug;
    // convert to lower case
    slug = title.toLowerCase();

    // remove special characters
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

    // replace spaces with dash symbols
    slug = slug.replace(/ /gi, "-");
    
    // remove consecutive dash symbols 
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');

    // remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
};
