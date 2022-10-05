import express,{Request, Response} from 'express';
import * as articelService from '../services/articel-service'

const router = express.Router();

// ========== LIST
router.get('/articel', (req: Request, res: Response) => {
    articelService.getArticel().then(
        (articel) => {
            res.send(articel);
        }
    );
});

// ========== FIND ARTICEL
router.get('/articel/:id', (req: Request, res: Response) => {
    // console.log(req.params.id);
    articelService.getArticelById(parseInt(req.params.id)).then(
        (articel) => {
            res.send(articel);
        }
    );

});

// ========== ADD/SAVE ARTICEL
router.post('/articel', (req: Request, res: Response) => {
    
    const datas = req.body;
    if (datas.title_articel == '' || datas.content_articel == '' || datas.status_articel == '' || datas.id_topic == '') {
        res.status(200).json({
            message: "Isi semua kolom"
        });
    return false;
    }

    // CEK JIKA JUDUL ADA YANG SAMA
    articelService.checkDuplicate(req.body.title_articel).then(
        (result) => {
            // console.log(result.length);
            if (result.length != 0) {
                res.status(200).json({
                    message: "Judul yang anda masukkan sama dengan judul artikel yang lain"
                });
            } else {
                
                
    articelService.saveArticel(req.body).then(
        () => {
            res.status(200).json({
                message: "Articel berhasil disimpan"
            });
        }
    ).catch((error)=>{
            res.status(303).json({
                message: "Error occured" + error.message
            })
    });

            }
           
        }
    );

    
});


// ========== EDIT/UPDATE ARTICEL
router.put('/articel/:id', (req: Request, res: Response) => {

    
    // CEK JIKA JUDUL ADA YANG SAMA
    articelService.checkDuplicate(req.body.title_articel).then(
        (result) => {

            // PENGECEKAN jika artikel yang di edit miliknya sendiri judulnya sama gpp
            if (result.length != 0 && result[0].id_articel != parseInt(req.params.id)) {
                res.status(200).json({
                    message: "Judul yang anda masukkan sama dengan judul artikel yang lain"
                });
            } else {
                
    articelService.updateArticel(parseInt(req.params.id), req.body).then(
        () => {
            res.status(200).json({
                message: "Articel berhasil diubah!"
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


// ========== DELETE ARTICEL
router.delete('/articel/:id', (req: Request, res: Response) => {

    
    articelService.deleteArticel(parseInt(req.params.id)).then(
        (articel) => {
            console.log(articel);
            if (articel == false) {
               
                res.status(200).json({
                    message: "Article tidak temukan !"
                });
            } else {
                
                res.status(200).json({
                    message: "Article berhasil dihapus !"
                });
           }
        }).catch((error) => res.send(error.message))
    ;
});
export default router