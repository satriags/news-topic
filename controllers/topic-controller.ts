import express,{Request, Response} from 'express';
import * as topicService from '../services/topic-service'

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
});


// ========== EDIT/UPDATE TOPIC
router.put('/topic/:id', (req: Request, res: Response) => {

    topicService.updateTopic(parseInt(req.params.id), req.body).then(
        () => {
            res.status(200).json({
                message: "Topic was successfully updated!"
            });
        }
    ).catch((error)=>{
        res.status(303).json({
            message: "Error occured" + error.message
        })
    });
});


// ========== DELETE TOPIC
router.delete('/topic/:id', (req: Request, res: Response) => {
    topicService.deleteTopic(parseInt(req.params.id)).then(
        (topic) => {
            res.status(200).json({
                message: "Topic was successfully deleted!"
            });
        }).catch((error) => res.send(error.message))
    ;
});
export default router