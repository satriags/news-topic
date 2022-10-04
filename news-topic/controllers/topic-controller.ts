import express,{Request, Response} from 'express';
import * as topicService from '../services/topic-service'
import * as articelService from '../services/articel-service'

const router = express.Router();

// ========== LIST
router.get('/topic', (req: Request, res: Response) => {
    
    topicService.getTopic().then(
        (topic) => {
            res.send(topic);
        }
    );
});

// ========== FIND TOPIC
router.get('/topic/:id', (req: Request, res: Response) => {
    // console.log(req.params.id);
    topicService.getTopicById(parseInt(req.params.id)).then(
        (topic) => {
            res.send(topic);
        }
    );

});

// ========== ADD/SAVE TOPIC
router.post('/topic', (req: Request, res: Response) => {
    
    const datas = req.body;
    if (datas.name_topic == '') {
        res.status(200).json({
            message: "Isi semua kolom"
        });
    return false;
    }
    
    topicService.checkDuplicate(req.body.name_topic).then(
        (result) => {
            console.log(result.length);
            if (result.length != 0 ) {
                res.status(200).json({
                    message: "Topik yang anda masukkan sama dengan topik yang lain"
                });
            } else {
                
    topicService.saveTopic(req.body).then(
        () => {
            res.status(200).json({
                message: "Topic berhasil disimpan"
            });
        }
    ).catch((error)=>{
            res.status(303).json({
                message: "Error occured" + error.message
            })
    });
                
                
            }
        });

});


// ========== EDIT/UPDATE TOPIC
router.put('/topic/:id', (req: Request, res: Response) => {


    topicService.checkDuplicate(req.body.name_topic).then(
        (result) => {
            if (result.length != 0 && result[0].id_topic != parseInt(req.params.id))  {
                res.status(200).json({
                    message: "Topik yang anda masukkan sama dengan topik yang lain"
                });
            } else { 

    topicService.updateTopic(parseInt(req.params.id), req.body).then(
        () => {
            res.status(200).json({
                message: "Topic berhasil diubah!"
            });
        }
    ).catch((error)=>{
        res.status(303).json({
            message: "Error occured" + error.message
        })
    });
                
}
});
});


// ========== DELETE TOPIC
router.delete('/topic/:id', (req: Request, res: Response) => {

    articelService.getArticelByTopicId(parseInt(req.params.id)).then((articel) => { 

        if (articel.length != 0) {
            res.status(200).json({
                message: "Topik tidak dapat di hapus, karena ada artikel yang memakai topik tersebut dan berstatus published atau draft"
            });
        } else { 

            topicService.deleteTopic(parseInt(req.params.id)).then(
                (topic) => {
                    res.status(200).json({
                        message: "Topic berhasil dihapus!"
                    });
                }).catch((error) => res.send(error.message));

        }

    });
    
});




export default router