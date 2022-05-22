import { Router } from 'express';
import { authToken } from '../../middleware/auth.middleware';
import { checkBodyAddAddress, checkResultInputsCreateAddress } from '../../middleware/checkInputs.meddleware';
import { onCreateNewAddress, onUpdateInputsAddressByidAddress, onDeleteByidAddress } from './handlers';

const router: Router = Router();

router.post('/create-address', authToken, checkBodyAddAddress, checkResultInputsCreateAddress, onCreateNewAddress);
router.put('/update', authToken, onUpdateInputsAddressByidAddress);
router.delete('/delete/:id', authToken, onDeleteByidAddress);


export default router;