import express,{Request, Response} from 'express';
import * as newsService from '../services/news-service'

const router = express.Router();

// ========== LIST
router.get('/', (req: Request, res: Response) => {
    
    newsService.getNews().then(
        (news) => {
            res.send(news);
        }
    );
});

router.post('/search', (req: Request, res: Response) => {
    
    newsService.getSearch(req.body).then(
        (news) => {
            // console.log(news);
            res.send(news);
        }
    );
});

// ========== FIND TOPIC
router.get('/news/articel/:slug', (req: Request, res: Response) => {
    // console.log(req.params.id);
    newsService.getDetailArticel(req.params.slug).then(
        (detail_articel) => {
            res.send(detail_articel);
        }
    );

});



export default router