import express,{Request, Response} from 'express';
import * as newsService from '../services/news-service'

const router = express.Router();

// ========== LIST
router.get('/news/search', (req: Request, res: Response) => {
    
    newsService.getNews().then(
        (news) => {
            res.send(news);
        }
    );
});

export default router